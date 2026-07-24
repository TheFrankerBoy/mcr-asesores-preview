"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mcr-control-horario-demo-v2";
const SESSION_KEY = "mcr-control-horario-session-v1";

const accounts = {
  "trabajadora@mcr.local": {
    password: "demo1234",
    id: "worker-1",
    name: "María Rodríguez",
    role: "worker"
  },
  "admin@mcr.local": {
    password: "demo1234",
    id: "admin-1",
    name: "Administración MCR",
    role: "admin"
  }
};

function newId() {
  return globalThis.crypto?.randomUUID?.()
    || `demo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function madridDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function seedState() {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const twoDaysAgo = new Date(now);
  twoDaysAgo.setDate(now.getDate() - 2);
  const yesterdayDate = madridDate(yesterday);
  const twoDaysDate = madridDate(twoDaysAgo);
  const today = madridDate(now);

  return {
    entries: [
      {
        id: newId(),
        userId: "worker-1",
        name: "María Rodríguez",
        date: yesterdayDate,
        clockIn: `${yesterdayDate}T09:02:00`,
        clockOut: `${yesterdayDate}T14:07:00`,
        note: ""
      },
      {
        id: newId(),
        userId: "worker-1",
        name: "María Rodríguez",
        date: twoDaysDate,
        clockIn: `${twoDaysDate}T08:58:00`,
        clockOut: `${twoDaysDate}T14:01:00`,
        note: "Salida revisada por administración."
      },
      {
        id: newId(),
        userId: "worker-2",
        name: "Ana López",
        date: today,
        clockIn: `${today}T09:00:00`,
        clockOut: null,
        note: ""
      }
    ],
    notes: []
  };
}

function formatDate(dateString, long = false) {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    weekday: long ? "long" : undefined,
    day: "2-digit",
    month: long ? "long" : "short",
    year: "numeric"
  }).format(new Date(`${dateString}T12:00:00`));
}

function formatTime(value) {
  if (!value) return "En curso";
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function minutesBetween(start, end = new Date().toISOString()) {
  return Math.max(0, Math.round((new Date(end) - new Date(start)) / 60000));
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours} h ${String(rest).padStart(2, "0")} min`;
}

function ClockMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3.3 2" />
    </svg>
  );
}

function EntryList({ entries, emptyText, showDate = false }) {
  if (!entries.length) {
    return <p className="tc-empty">{emptyText}</p>;
  }

  return (
    <div className="tc-entry-list">
      {entries.map((entry) => {
        const minutes = minutesBetween(entry.clockIn, entry.clockOut || undefined);
        return (
          <article className="tc-entry" key={entry.id}>
            <div>
              {showDate && <span className="tc-entry-date">{formatDate(entry.date, true)}</span>}
              <strong>{formatTime(entry.clockIn)} <i>—</i> {formatTime(entry.clockOut)}</strong>
              <small>{entry.note || (entry.clockOut ? "Jornada registrada" : "Fichaje abierto")}</small>
            </div>
            <span>{formatMinutes(minutes)}</span>
          </article>
        );
      })}
    </div>
  );
}

export default function DemoTimeClock() {
  const [store, setStore] = useState(null);
  const [session, setSession] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [now, setNow] = useState(new Date());
  const [loginError, setLoginError] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      setStore(saved && Array.isArray(saved.entries) ? saved : seedState());
      const savedSession = sessionStorage.getItem(SESSION_KEY);
      if (savedSession && accounts[savedSession]) {
        setSession(accounts[savedSession]);
        setActiveView(accounts[savedSession].role === "admin" ? "admin" : "dashboard");
      }
    } catch {
      setStore(seedState());
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!store) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      setMessage("El navegador no permite guardar datos locales en este modo.");
    }
  }, [store]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 3200);
    return () => window.clearTimeout(timer);
  }, [message]);

  const workerEntries = useMemo(() => {
    if (!store) return [];
    return store.entries
      .filter((entry) => entry.userId === "worker-1")
      .sort((a, b) => new Date(b.clockIn) - new Date(a.clockIn));
  }, [store]);

  const today = madridDate(now);
  const todayEntries = workerEntries.filter((entry) => entry.date === today);
  const openEntry = workerEntries.find((entry) => !entry.clockOut);
  const workedToday = todayEntries.reduce(
    (sum, entry) => sum + minutesBetween(entry.clockIn, entry.clockOut || now.toISOString()),
    0
  );

  function signIn(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const account = accounts[email];

    if (!account || account.password !== password) {
      setLoginError("El correo o la contraseña no son correctos.");
      return;
    }
    startSession(email);
  }

  function startSession(email) {
    const account = accounts[email];
    setLoginError("");
    setSession(account);
    setActiveView(account.role === "admin" ? "admin" : "dashboard");
    sessionStorage.setItem(SESSION_KEY, email);
  }

  function signOut() {
    setSession(null);
    setActiveView("dashboard");
    sessionStorage.removeItem(SESSION_KEY);
  }

  function clock() {
    if (!store) return;
    if (openEntry) {
      if (!window.confirm("¿Registrar la salida con la hora actual?")) return;
      setStore({
        ...store,
        entries: store.entries.map((entry) => (
          entry.id === openEntry.id ? { ...entry, clockOut: new Date().toISOString() } : entry
        ))
      });
      setMessage("Salida registrada correctamente.");
      return;
    }

    if (!window.confirm("¿Registrar la entrada con la hora actual?")) return;
    setStore({
      ...store,
      entries: [
        ...store.entries,
        {
          id: newId(),
          userId: "worker-1",
          name: "María Rodríguez",
          date: madridDate(),
          clockIn: new Date().toISOString(),
          clockOut: null,
          note: ""
        }
      ]
    });
    setMessage("Entrada registrada correctamente.");
  }

  function sendNote(event) {
    event.preventDefault();
    const cleanNote = note.trim();
    if (!cleanNote) return;
    setStore({
      ...store,
      notes: [
        ...store.notes,
        {
          id: newId(),
          userId: "worker-1",
          name: "María Rodríguez",
          date: today,
          text: cleanNote
        }
      ]
    });
    setNote("");
    setMessage("Observación guardada para administración.");
  }

  function saveCorrection(event) {
    event.preventDefault();
    if (!editing) return;
    const form = new FormData(event.currentTarget);
    const start = String(form.get("start"));
    const end = String(form.get("end"));
    setStore({
      ...store,
      entries: store.entries.map((entry) => (
        entry.id === editing.id
          ? {
              ...entry,
              clockIn: `${entry.date}T${start}:00`,
              clockOut: end ? `${entry.date}T${end}:00` : null,
              note: "Registro corregido por administración."
            }
          : entry
      ))
    });
    setEditing(null);
    setMessage("El registro se ha actualizado.");
  }

  function resetDemo() {
    if (!window.confirm("¿Restablecer todos los datos de esta demostración?")) return;
    setStore(seedState());
    setMessage("Demostración restablecida.");
  }

  if (!store) {
    return (
      <section className="tc-shell tc-loading" aria-live="polite">
        <ClockMark />
        <p>Preparando el acceso…</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="tc-login-wrap">
        <div className="tc-login-copy">
          <p className="eyebrow">Área privada</p>
          <h1>Control horario,<br />claro y sencillo.</h1>
          <p>
            Acceso preparado para registrar la jornada y consultar los fichajes
            desde cualquier pantalla.
          </p>
          <div className="tc-demo-note">
            <span>Versión de demostración</span>
            <p>Los cambios se guardan únicamente en este navegador.</p>
          </div>
        </div>

        <div className="tc-login-card">
          <div className="tc-login-heading">
            <span className="tc-mark"><ClockMark /></span>
            <div>
              <p className="eyebrow">MCR Asesores</p>
              <h2>Iniciar sesión</h2>
            </div>
          </div>
          <form onSubmit={signIn} className="tc-form">
            <label>
              Correo electrónico
              <input name="email" type="email" autoComplete="username" placeholder="nombre@mcrasesores.es" required />
            </label>
            <label>
              Contraseña
              <input name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
            </label>
            {loginError && <p className="tc-error" role="alert">{loginError}</p>}
            <button type="submit" className="tc-primary">Entrar al área privada</button>
          </form>

          <div className="tc-demo-access">
            <p>Accesos para probar el prototipo</p>
            <button type="button" onClick={() => startSession("trabajadora@mcr.local")}>
              Entrar como trabajadora
              <span>trabajadora@mcr.local</span>
            </button>
            <button type="button" onClick={() => startSession("admin@mcr.local")}>
              Entrar como administración
              <span>admin@mcr.local</span>
            </button>
            <small>Contraseña para ambos accesos: <strong>demo1234</strong></small>
          </div>
        </div>
      </section>
    );
  }

  const allEntries = [...store.entries].sort(
    (a, b) => new Date(b.clockIn) - new Date(a.clockIn)
  );

  return (
    <section className="tc-app">
      <header className="tc-appbar">
        <div>
          <span className="tc-mark tc-mark-small"><ClockMark /></span>
          <div>
            <strong>Control horario</strong>
            <span>Área privada de MCR Asesores</span>
          </div>
        </div>
        <div className="tc-profile">
          <span className="tc-avatar">{session.name.charAt(0)}</span>
          <div>
            <strong>{session.name}</strong>
            <span>{session.role === "admin" ? "Administración" : "Cuenta personal"}</span>
          </div>
          <button type="button" onClick={signOut}>Cerrar sesión</button>
        </div>
      </header>

      <div className="tc-app-layout">
        <aside className="tc-sidebar">
          <nav aria-label="Navegación del control horario">
            {session.role === "worker" && (
              <>
                <button
                  className={activeView === "dashboard" ? "active" : ""}
                  onClick={() => setActiveView("dashboard")}
                  type="button"
                >
                  Resumen de hoy
                </button>
                <button
                  className={activeView === "history" ? "active" : ""}
                  onClick={() => setActiveView("history")}
                  type="button"
                >
                  Mi historial
                </button>
              </>
            )}
            {session.role === "admin" && (
              <button className="active" type="button">Panel de administración</button>
            )}
          </nav>
          <div className="tc-local-state">
            <span />
            Datos guardados en este navegador
          </div>
        </aside>

        <main className="tc-main">
          {session.role === "worker" && activeView === "dashboard" && (
            <>
              <div className="tc-page-heading">
                <div>
                  <p className="eyebrow">Jornada de hoy</p>
                  <h1>Buenos días, {session.name.split(" ")[0]}</h1>
                  <p>{formatDate(today, true)}</p>
                </div>
                <span className="tc-live-time">
                  {new Intl.DateTimeFormat("es-ES", {
                    timeZone: "Europe/Madrid",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  }).format(now)}
                  <small>Hora de Madrid</small>
                </span>
              </div>

              <div className="tc-dashboard-grid">
                <article className="tc-clock-card">
                  <span className={`tc-status ${openEntry ? "working" : ""}`}>
                    {openEntry ? "Jornada en curso" : "Fuera del trabajo"}
                  </span>
                  <h2>{openEntry ? "Entrada registrada" : "¿Comenzamos?"}</h2>
                  <p>
                    {openEntry
                      ? `Has fichado a las ${formatTime(openEntry.clockIn)}.`
                      : "Registra tu entrada cuando empiece tu jornada."}
                  </p>
                  <button
                    className={`tc-clock-button ${openEntry ? "clock-out" : ""}`}
                    type="button"
                    onClick={clock}
                  >
                    <ClockMark />
                    {openEntry ? "Fichar salida" : "Fichar entrada"}
                  </button>
                </article>

                <div className="tc-summary-cards">
                  <article>
                    <span>Tiempo registrado hoy</span>
                    <strong>{formatMinutes(workedToday)}</strong>
                  </article>
                  <article>
                    <span>Primer fichaje</span>
                    <strong>{todayEntries.length ? formatTime(todayEntries[todayEntries.length - 1].clockIn) : "—"}</strong>
                  </article>
                </div>
              </div>

              <div className="tc-content-grid">
                <article className="tc-panel">
                  <div className="tc-panel-heading">
                    <div>
                      <p className="eyebrow">Actividad</p>
                      <h2>Fichajes de hoy</h2>
                    </div>
                    <button type="button" onClick={() => setActiveView("history")}>Ver historial</button>
                  </div>
                  <EntryList
                    entries={todayEntries}
                    emptyText="Todavía no hay fichajes registrados hoy."
                  />
                </article>

                <article className="tc-panel tc-note-panel">
                  <p className="eyebrow">Observaciones</p>
                  <h2>Comunicar una incidencia</h2>
                  <p>Deja constancia si necesitas que administración revise un fichaje.</p>
                  <form onSubmit={sendNote}>
                    <textarea
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      placeholder="Escribe aquí la observación…"
                      rows="4"
                    />
                    <button className="tc-secondary" type="submit">Guardar observación</button>
                  </form>
                </article>
              </div>
            </>
          )}

          {session.role === "worker" && activeView === "history" && (
            <>
              <div className="tc-page-heading">
                <div>
                  <p className="eyebrow">Registro personal</p>
                  <h1>Mi historial</h1>
                  <p>Consulta las jornadas guardadas en este dispositivo.</p>
                </div>
                <button className="tc-secondary" type="button" onClick={() => setActiveView("dashboard")}>
                  Volver al resumen
                </button>
              </div>
              <article className="tc-panel tc-history-panel">
                <EntryList
                  entries={workerEntries}
                  showDate
                  emptyText="No hay fichajes en el historial."
                />
              </article>
            </>
          )}

          {session.role === "admin" && (
            <>
              <div className="tc-page-heading">
                <div>
                  <p className="eyebrow">Vista general</p>
                  <h1>Panel de administración</h1>
                  <p>Seguimiento de la jornada y revisión de incidencias.</p>
                </div>
                <button className="tc-secondary" type="button" onClick={resetDemo}>
                  Restablecer demostración
                </button>
              </div>

              <div className="tc-admin-stats">
                <article>
                  <span>Jornadas en curso</span>
                  <strong>{store.entries.filter((entry) => !entry.clockOut).length}</strong>
                  <small>Ahora mismo</small>
                </article>
                <article>
                  <span>Observaciones</span>
                  <strong>{store.notes.length}</strong>
                  <small>Pendientes de revisar</small>
                </article>
                <article>
                  <span>Registros</span>
                  <strong>{store.entries.length}</strong>
                  <small>En este prototipo</small>
                </article>
              </div>

              {store.notes.length > 0 && (
                <article className="tc-panel tc-admin-notes">
                  <div className="tc-panel-heading">
                    <div>
                      <p className="eyebrow">Avisos</p>
                      <h2>Observaciones recibidas</h2>
                    </div>
                  </div>
                  {store.notes.map((item) => (
                    <div key={item.id}>
                      <strong>{item.name}</strong>
                      <span>{formatDate(item.date)} · {item.text}</span>
                    </div>
                  ))}
                </article>
              )}

              <article className="tc-panel tc-admin-table-panel">
                <div className="tc-panel-heading">
                  <div>
                    <p className="eyebrow">Control horario</p>
                    <h2>Últimos registros</h2>
                  </div>
                </div>
                <div className="tc-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Persona</th>
                        <th>Fecha</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Estado</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {allEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td><strong>{entry.name}</strong></td>
                          <td>{formatDate(entry.date)}</td>
                          <td>{formatTime(entry.clockIn)}</td>
                          <td>{formatTime(entry.clockOut)}</td>
                          <td>
                            <span className={`tc-table-status ${entry.clockOut ? "" : "open"}`}>
                              {entry.clockOut ? "Completo" : "En curso"}
                            </span>
                          </td>
                          <td>
                            <button type="button" onClick={() => setEditing(entry)}>Corregir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </>
          )}
        </main>
      </div>

      {editing && (
        <div className="tc-modal-backdrop" role="presentation" onMouseDown={() => setEditing(null)}>
          <div className="tc-modal" role="dialog" aria-modal="true" aria-labelledby="correction-title" onMouseDown={(event) => event.stopPropagation()}>
            <p className="eyebrow">Modificar registro</p>
            <h2 id="correction-title">Corregir fichaje</h2>
            <p>{editing.name} · {formatDate(editing.date, true)}</p>
            <form onSubmit={saveCorrection} className="tc-form">
              <label>
                Hora de entrada
                <input name="start" type="time" defaultValue={formatTime(editing.clockIn)} required />
              </label>
              <label>
                Hora de salida
                <input name="end" type="time" defaultValue={editing.clockOut ? formatTime(editing.clockOut) : ""} />
              </label>
              <div className="tc-modal-actions">
                <button type="button" className="tc-secondary" onClick={() => setEditing(null)}>Cancelar</button>
                <button type="submit" className="tc-primary">Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message && <div className="tc-toast" role="status">{message}</div>}
    </section>
  );
}
