[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/qwk0Ur9A)
# 📝 Tarea: To-Do List con IndexedDB + Caché
Esta aplicación es una pequeña To-Do list que almacena datos en IndexedDB y permite subir/quitar una imagen de fondo guardada en la caché del navegador.

## 👷‍♂️ Instalación y Ejecución
```bash
yarn
yarn dev
```

## 😁 Funcionalidades preexistentes
El código entregado actualmente permite:

- Crear, editar, tachar y eliminar tareas.
- Cargar tareas desde una API (para generar ejemplos rápidamente).


## 🎯 Objetivo
Completar y verificar que la aplicación permita:

- Guardar la información localmente usando **IndexedDB**.
- Subir y quitar una imagen de fondo, utilizando la **caché** del navegador.

## 📦 Código a Completar

### `src/db.js` — Funciones de IndexedDB
Todas estas funciones son utilizadas en `src/components/Container.jsx`

1. **`initDB()`** - Inicializar la base de datos IndexedDB
   - Debe abrir la base de datos con el nombre `TodoAppDB` y versión 2
   - Crear los object stores necesarios: `todos`, `settings`, `pending_todos` definidos en las variables globales.
   - Retornar una promesa que resuelva con la conexión a la base de datos

2. **`saveTodos(todos)`** - Guardar una lista de todos en IndexedDB
   - Limpiar todos existentes en el store de `todos`
   - Guardar los nuevos todos en el store
   - Normalizar los todos con `normalizeTodo()` antes de guardarlos

3. **`loadTodos()`** - Cargar todos los todos desde IndexedDB
   - Obtener todos los registros del store `todos`
   - Retornar una promesa que resuelva con el array de todos

4. **`savePendingTodo(todo)`** - Guardar un todo pendiente en IndexedDB
   - Agregar el todo al store `pending_todos`
   - Esto se usa cuando falla el guardado en la API remota

5. **`loadPendingTodos()`** - Cargar todos los pendientes desde IndexedDB
   - Obtener todos los registros del store `pending_todos`
   - Retornar una promesa que resuelva con el array de pendientes

6. **`clearPendingTodos()`** - Limpiar todos los pendientes de IndexedDB
   - Eliminar todos los registros del store `pending_todos`
   - Se usa después de sincronizar exitosamente con la API

### `src/components/Container.jsx` — Funciones de Caché

1. **`loadCachedImage()`** (dentro del `useEffect`) - Cargar la imagen de fondo desde el caché
   - Abrir el caché `background-cache`
   - Buscar la respuesta almacenada con la clave `cacheKey`
   - Si existe, convertir el blob a una URL de objeto y actualizar `bgUrl`

2. **`handleImageUpload(e)`** - Manejar la subida de una imagen de fondo
   - Extraer el archivo del evento del input
   - Guardar el archivo en el caché del navegador usando `caches.open('background-cache')` y `cache.put()`
   - Crear una URL de objeto con `URL.createObjectURL(file)`
   - Actualizar el estado `bgUrl` con la nueva URL

3. **`handleDeleteImage()`** - Eliminar la imagen de fondo del caché
   - Abrir el caché `background-cache`
   - Eliminar la entrada con la clave `cacheKey`
   - Limpiar el estado `bgUrl` estableciéndolo como string vacío



## ✅ Criterios de Evaluación

Se evaluará que:

- Al **refrescar la página**, las tareas (to-do's) sigan creadas.
- Al cerrar el navegador y volver a abrirlo, se carguen correctamente las tareas preexistentes.
- Se pueda **cargar una imagen de fondo**, que debe estar almacenada en la **caché**.
- Se pueda **eliminar la imagen de fondo**, eliminandose del **caché**.
- Al **refrescar la página**, la imagen subida anteriormente debe cargarse correctamente.
- Al cerrar el navegador y volver a abrirlo, la imagen que se subió anteriormente debe cargar correctamente.
- Responder correctamente al menos 4 preguntas del Readme (es decir, la que quieras queda como bonus)

Las funcionalidades deben ser realizadas con Indexed DB (Todo's) y con caché (imágenes). En caso contrario, no se asignará puntaje.

Recomendamos utilizar chrome como navegador para comprobar las funcionalidades.

## 🧠 Preguntas y respuestas

**1. ¿Cómo funciona IndexedDB?**  
Es una base de datos transaccional orientada a JS, implementada en los navegadores web, que permite almacenar y recuperar objetos de javascript que estén indexados por una clave/llave. 

---

**2. ¿Qué ventajas tiene el uso de IndexedDB?**  
Permite que al cerrar el navegador y volver a abrirlo, o al reiniciar la pagina, existan ciertos datos que persistan. En el caso de esta actividad, una serie de to-do's que se guardan en la base de datos. Podria ser por ejemplo ciertas preferencias del usuario, o estados de la aplicación que son utiles entre paginas, por ejemplo, si el usuario esta logeado.
---

**3. Explica 2 ventajas y 2 desventajas de bases de datos SQL**  
Ventajas:
- Estructura rigida, la cual permite que las transacciones sean más eficientes, ademas de mantener coherencia entre los datos almacenados.
- ACID (Atomicity, Consistency, Isolation, Durability). Asegura operaciones atómicas, osea que no existen dirty reads o writes. Consistencia entre todas las lecturas simultaneas de la base, entre otras cosas.

Desventajas:
- Poca flexibilidad en la estructura de la base, ya que el modificar el esquema requiere migraciones complejas y costosas. 

- Escalabilidad horizontal limitada,  ya que es complicado replicar una base de datos SQL en varias instancias, y el escalado vertical está asociado a mayores costos y limites.
---

**4. Explica 2 ventajas y 2 desventajas de bases de datos NoSQL**  
Ventajas:
- Estructura muchisimo mas flexible que la SQL, permitiendo alojar estructuras dinamicas y sin esquemas fijos, como los JSON.
- Escalabilidad horizontal mucho mas asequible que la SQL, permitiendose replicar en varios servidores de manera mas economica.

Desventajas:
- La falta de estandarización entre los distintos lenguajes hace que cada uno posea una manera distinta de realizar consultas, dificultando la portabilidad entre modelos.
- Teorema CAP, refiere a que toda base de datos NoSQL esta destinada a nunca poder cumplir al 100% con: Capacity, Availability y Partition Tolerance. Vale decir, si una base de datos NoSQL quiere poder soportar particiones (distintos servidores), entonces va a tener que decidir de que manera priorizar la disponibilidad o la capacidad, ya que no podrá asegurar ambas a la vez.

---

**5. ¿Para qué sirve cachear archivos en el navegador?**  
A diferencia de IndexedDB, el uso tipico de CacheAPI es para almacenar respuestas a solicitudes, permitiendo que ciertas funcionalidades de la aplicación sean utilizables offline, reduciendo además el tiempo de carga y las solicitudes al servidor. En esta actividad cacheamos una imagen, pero podriamos haber almacenado alguna respuesta de alguna API, algun script de JS, etc. 

## 💡 Declaración uso de IA y referencias

Si usaste inteligencia artificial o usaste referencias, profundiza aquí su uso y los links o referencias que utilizaste
