/**
 * Carga el contenido de un archivo Markdown desde el servidor.
 * @param {string} path - La ruta relativa al archivo (ej: docs/Nivel_1/Lecciones/Leccion_1.1.md)
 * @returns {Promise<string>} - El contenido en texto plano.
 */
export const fetchMarkdownContent = async (path) => {
try {
    // Si estás usando Vite/Webpack, asegúrate de que la carpeta 'docs'
    // esté accesible en la raíz del servidor.
    const response = await fetch(path);

    if (!response.ok) {
    throw new Error(`No se pudo encontrar el archivo en: ${path}`);
    }

    const text = await response.text();
    return text;
} catch (error) {
    console.error("Error en contentLoader:", error);
    return `# ❌ Error al cargar contenido\n\n${error.message}\n\n_Asegúrate de que la carpeta 'docs' sea accesible por el servidor._`;
}
};