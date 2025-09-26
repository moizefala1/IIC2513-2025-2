[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/814LwVs6)

# Actividad: Automatización con GitHub Actions 🚀 

En esta actividad, vas a trabajar con **GitHub Actions** para automatizar tareas comunes en un flujo de desarrollo moderno. Implementarás un workflow que:

- Ejecuta un **linter** automáticamente sobre el código base para asegurar que sigue un estilo consistente.
- Obtiene un personaje aleatorio de la [API de Rick and Morty](https://rickandmortyapi.com/) cada vez que se ejecuta el workflow.
- Muestra la información de ese personaje (foto, nombre, ID, especie, estado y origen) en el `README.md`.

---

## 🧠 Objetivos de Aprendizaje

- Aprender a configurar workflows en GitHub Actions.
- Entender cómo automatizar chequeos de calidad de código.
- Trabajar con llamadas HTTP dentro de un pipeline.
- Modificar archivos directamente desde un pipeline.

---

## 📝 Instrucciones



1. En la carpeta `.github/workflows/` crea un archivo llamado `main.yml`.

2. Configura un workflow que se dispare en el siguiente evento:
   - `push`


3. El workflow debe ejecutar las siguientes tareas:

   ### ✅ 1. Linting
   - Si estás trabajando en JavaScript, usa `eslint`.
   - Asegúrate de que el linter falle el pipeline si encuentra errores.

   ### 📡 2. Obtener personaje aleatorio
   - El workflow debe hacer un **GET** a la API de Rick and Morty para obtener un personaje aleatorio.
   - El GET debe responder con código 200; si no, el workflow debe fallar.
   - Debe extraer los siguientes datos del personaje:
      - Foto (imagen)
      - Nombre
      - ID
      - Especie
      - Estado
      - Origen

   ### 🖊️ 3. Modificar README
   - El workflow debe modificar automáticamente el `README.md` para mostrar la información del personaje obtenido en una sección especial.
   - Cada vez que se ejecute el workflow, la información del personaje debe actualizarse con uno nuevo aleatorio.

   ### 🏷️ 4. Actualizar versión
   - Este `README.md` contiene el campo de versión que se muestra a continuación:
     ```
     Versión actual: .
     ```
   - Tu workflow debe actualizar automáticamente este número de versión siguiendo el esquema `v<major>.<minor>.<patch>`, por ejemplo: `v1.0.1`, `v1.1.0`, etc.
   - Para simplificar, puedes incrementar siempre el patch (`v1.0.0` → `v1.0.1`).

---

## ⚠️ Consideraciones importantes

- ⏱️ **Tiempo máximo de ejecución:** Tu workflow debe completarse en **menos de 3 minutos**. Si se excede ese tiempo, **la actividad no se considerará válida**.

   ```bash
   timeout 180s tu-comando-aqui
   ```

- 🖐️ **Ejecución manual:** Puedes agregar el siguiente bloque al inicio de tu archivo `main.yml` para permitir ejecutar el workflow de forma manual desde la interfaz de GitHub:
   ```yaml
   on:
      workflow_dispatch:
   ```



---

## 🧪 Revisión

Tu solución debe cumplir con los siguientes criterios:

- [ ] El workflow corre correctamente al hacer `push`.
- [ ] No se excede el tiempo máximo de ejecución.
- [ ] Se ejecuta un linter y el pipeline falla si hay errores.
- [ ] Se obtiene un personaje aleatorio de la API de Rick and Morty y se actualiza el `README.md` con su información (foto, nombre, ID, especie, estado y origen).
- [ ] El número de versión en este archivo se actualiza automáticamente en cada ejecución.

##  🛸 Personaje del día
Aquí debes colocar el personaje del día con la información solicitada.
FOTO: !(https://rickandmortyapi.com/api/character/avatar/332.jpeg)
INFO: Nombre: Stacy,ID: 332,Especie: Human,Estado: Alive,Origen: Earth (Replacement Dimension)
