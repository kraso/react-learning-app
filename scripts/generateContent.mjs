import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, "../React_Curso/docs");
const OUTPUT_FILE = path.resolve(__dirname, "../src/data/courseContent.json");

function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) {
        console.error(`Source directory not found: ${dir}`);
        return results;
    }
    const listDir = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of listDir) {
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getFiles(res));
        } else if (entry.name.endsWith(".md")) {
            results.push(res);
        }
    }
    return results;
}

function generateJson() {
    console.log(`Reading files from: ${SOURCE_DIR}`);
    const allFiles = getFiles(SOURCE_DIR);
    const content = {};

    allFiles.forEach(filePath => {
        const fileName = path.basename(filePath);
        const relativePath = path.relative(SOURCE_DIR, filePath);
        const parts = relativePath.split(path.sep);

        const levelName = parts.find(p => p.startsWith("Nivel_"));
        if (!levelName) return;

        if (!content[levelName]) {
            content[levelName] = {
                lecciones: [],
                ejercicios: [],
                pruebas: []
            };
        }

        let category = "";
        if (relativePath.includes("Lecciones")) category = "lecciones";
        else if (relativePath.includes("Ejercicios")) category = "ejercicios";
        else if (relativePath.includes("Pruebas")) category = "pruebas";

        if (category && content[levelName][category]) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            content[levelName][category].push({
                title: fileName.replace(".md", "").replace(/_/g, " "),
                content: fileContent,
                path: relativePath
            });
        }
    });

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully generated content.json at ${OUTPUT_FILE}`);
}

generateJson();
