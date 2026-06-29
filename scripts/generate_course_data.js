const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const outputFile = path.join(__dirname, '../src/data/courseContent.json');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (filePath.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const courseData = [];

// Get all "Nivel" directories
const levels = fs.readdirSync(docsDir).filter(file => file.startsWith('Nivel_'));

levels.forEach(level => {
  const levelPath = path.join(docsDir, level);
  const levelData = {
    id: level.replace(/\s+/g, '_').toLowerCase(),
    title: level.replace('Nivel_', '').replace(/_/g, ' '),
    categories: {}
  };

  const categories = ['Lecciones', 'Ejercicios', 'Pruebas'];
  
  categories.forEach(cat => {
    const catPath = path.join(levelPath, cat);
    if (fs.existsSync(catPath)) {
      const files = getFiles(catPath);
      levelData.categories[cat.toLowerCase()] = files.map(file => {
        const fileName = path.basename(file, '.md');
        return {
          id: fileName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
          title: fileName.replace(/_/g, ' ').replace(/\.md/g, ''),
          path: file.replace(docsDir, '').replace(/\\/g, '/')
        };
      });
    } else {
      levelData.categories[cat.toLowerCase()] = [];
    }
  });

  courseData.push(levelData);
});

fs.writeFileSync(outputFile, JSON.stringify(courseData, null, 2));
console.log(`Course data generated successfully at: ${outputFile}`);
