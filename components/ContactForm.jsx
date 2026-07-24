"use client";

import { useState } from "react";
import { Icon } from "./Icons";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const phone = form.get("phone");
    const service = form.get("service");
    const message = form.get("message");
    const text = [
      "Hola, me gustaría solicitar información.",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Servicio: ${service}`,
      `Consulta: ${message}`
    ].join("\n");
    setStatus("Abriendo WhatsApp para enviar tu consulta…");
    window.open(`https://wa.me/34601639828?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Nombre
          <input name="name" type="text" placeholder="Tu nombre" required />
        </label>
        <label>
          Teléfono
          <input name="phone" type="tel" placeholder="Tu teléfono" required />
        </label>
      </div>
      <label>
        ¿En qué podemos ayudarte?
        <select name="service" defaultValue="Asesoramiento general">
          <option>Asesoramiento general</option>
          <option>Asesoría fiscal</option>
          <option>Asesoría laboral</option>
          <option>Asesoría contable</option>
          <option>Asesoramiento jurídico</option>
          <option>Gestoría administrativa</option>
          <option>Agricultura y ganadería</option>
          <option>Trámites de extranjería</option>
        </select>
      </label>
      <label>
        Tu consulta
        <textarea
          name="message"
          rows="5"
          placeholder="Cuéntanos brevemente tu caso"
          required
        />
      </label>
      <label className="privacy-check">
        <input type="checkbox" required />
        <span>Acepto que mis datos se usen para responder a esta consulta.</span>
      </label>
      <button className="button button-primary" type="submit">
        Solicitar información
        <Icon name="arrow" size={19} />
      </button>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  );
}
