import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve(".openai", "hosting.json");
const destinationDirectory = resolve("dist", ".openai");
const destination = resolve(destinationDirectory, "hosting.json");

if (!existsSync(source)) {
  throw new Error("No se ha encontrado .openai/hosting.json.");
}

mkdirSync(destinationDirectory, { recursive: true });
copyFileSync(source, destination);

console.log("Configuración de Sites incluida en /dist.");
