import fs from 'fs';
import path from 'path';

const readmePath = path.join(process.cwd(), 'README.md');
let readme = fs.readFileSync(readmePath, 'utf8');

const randomId = Math.floor(Math.random() * 826) + 1;
const response = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
});

if (response.status !== 200) {
    exit(1);
}

const personajeJson = await response.json();
const personajeImagen = personajeJson.image;
const personajeNombre = personajeJson.name;
const personajeId = personajeJson.id;
const personajeEspecie = personajeJson.species;
const personajeEstado = personajeJson.status;
const personajeOrigen = personajeJson.origin.name;


const updates = {
    FOTO: `![${personajeNombre}](${personajeImagen})`,
    INFO: [
        `Nombre: ${personajeNombre}`, 
        `ID: ${personajeId}`, 
        `Especie: ${personajeEspecie}`, 
        `Estado: ${personajeEstado}`, 
        `Origen: ${personajeOrigen}`
    ]
};

readme = readme.replace(/FOTO:.*$/m, `FOTO: ${updates.FOTO}`);
readme = readme.replace(/INFO:.*$/m, `INFO: ${updates.INFO}`);

fs.writeFileSync(readmePath, readme, 'utf8');