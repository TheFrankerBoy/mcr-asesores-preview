import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("out");
const destination = resolve("dist");

if (!existsSync(source)) {
  throw new Error("No se ha encontrado la exportación estática en /out.");
}

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });

console.log("Exportación estática preparada en /out y /dist.");
