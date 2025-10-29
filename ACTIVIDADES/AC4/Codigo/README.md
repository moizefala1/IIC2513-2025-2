[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/X6_kOLPr)
# 🛡️ Actividad: Autenticación con JWT y Cookies

En esta actividad, desarrollarás una aplicación React que implementa autenticación JWT usando la API de DummyJSON. Incluye manejo de cookies, refreshing de tokens, y una interfaz moderna y responsiva.

---

## 📁 Parte 1: `login.tsx`

### 🎯 Objetivo

Crear un formulario de login funcional que interactúe con la API pública y almacene el token JWT en una cookie cuando el usuario marque "Remember Me".  

### 📌 Instrucciones

- Utiliza `axios` para realizar una petición `POST` a la API pública [`https://dummyjson.com/auth/login`](https://dummyjson.com/auth/login).

- El formulario debe incluir los campos:
  - `username`
  - `password`
  - Opción **"Remember Me"** (checkbox).

- En la función `handleSubmit`:

  1. **Inicia el estado de carga** y limpia errores previos.

  2. **Envía las credenciales** (`username`, `password`) junto con el parámetro `expiresInMins` a la API.

  3. **Procesa la respuesta**:
     - Si la autenticación es exitosa:
       - Extrae el `accessToken` de la respuesta.
       - **Decodifica el token** con `jwt-decode` para obtener la fecha de expiración.
       - Si el usuario marcó **"Remember Me"**, guarda el token en cookies con su fecha de expiración.
       - Si no lo marcó, guarda el token como **cookie de sesión temporal** (sin indicar fecha de expiración).
       - **Redirige automáticamente** al usuario a la vista `/user`.

  4. **Manejo de errores:**
     - Si la autenticación falla, muestra un mensaje de error en el formulario.
     - Muestra el error en la consola.

  5. **Finaliza el estado de carga** al término del proceso, sea exitoso o no.
---

## 📁 Parte 2: `user.tsx`

### 🎯 Objetivo

Leer el token JWT desde las cookies, decodificarlo y mostrar la información del usuario autenticado. Además, incluir funciones para refrescar el token y cerrar sesión.

### 📌 Instrucciones

1. **Contador de expiración del token:**
   - Implementa un `useEffect` que decodifica el token con `jwtDecode(token)` y obtiene su tiempo de expiración.
   - Calcula el tiempo restante en segundos y lo actualiza cada segundo.
   - Muestra el tiempo restante en formato `hh:mm:ss`.
   - Cuando el token expira, limpia el intervalo y muestra el texto `"Expirado"`.

2. **Carga inicial de sesión:**
   - Al cargar la página, obtiene el token JWT almacenado en la cookie `"token"` mediante `js-cookie`.
   - Si existe, lo guarda en el estado y ejecuta la función para recuperar la información del usuario autenticado.

3. **Obtención de datos del usuario:**
   - Implementa la función `fetchUserData` que realiza una petición `GET` a [`https://dummyjson.com/auth/me`](https://dummyjson.com/auth/me).
   - Incluye el token en el encabezado `Authorization: Bearer <token>`.
   - Muestra los datos del usuario autenticado (ID, nombre, email, username, género, token).
   - Maneja los estados de carga y error, actualizando el estado `user` con la información obtenida.


4. **Refrescar token:**
   - Implementa la función `refreshToken` que realiza una solicitud `POST` a [`https://dummyjson.com/auth/refresh`](https://dummyjson.com/auth/refresh).
   - Envía el token actual y el número de minutos seleccionados para extender su validez.
   - Si la solicitud es exitosa:
     - Decodifica el nuevo token y obtiene su nueva fecha de expiración.
     - Almacena el nuevo token en las cookies con la fecha correspondiente.
     - Actualiza el estado local `token` y vuelve a llamar a `fetchUserData` para actualizar los datos del usuario.
   - Maneja los estados de carga y error.

5. **Cerrar sesión:**
   - Implementa la función `logout` que elimina las cookies `"token"` y `"refreshToken"`.
   - Limpia los estados locales del usuario.
   - Redirige al usuario a la página principal (`'/'`), finalizando completamente la sesión.

---

## 🧪 Usuarios de Prueba

Puedes usar cualquiera de estos usuarios de [DummyJSON](https://dummyjson.com/users):

| Username | Password | Nombre |
|----------|----------|---------|
| `emilys` | `emilyspass` | Emily Johnson |
| `michaelw` | `michaelwpass` | Michael Williams |
| `sophiab` | `sophiabpass` | Sophia Brown |
| `jamesd` | `jamesdpass` | James Davis |
| `emmaj` | `emmajapass` | Emma Miller |

---

# ✅ Requisitos de la actividad

Aquí puedes indicar qué funcionalidades implementaste. Recuerda que para obtener el puntaje máximo debes cumplir todos los requisitos.

- [ ] Al iniciar sesión con credenciales válidas, realizando `POST` a `https://dummyjson.com/auth/login`, se redirige a vista `/user`
- [ ] En caso de error en iniciar sesión, se muestra mensaje de error al ingresar credenciales inválidas
- [ ] Al ingresar correctamente se guarda el token (retornado por la API) en una cookie llamada `"token"` con fecha de expiración (tokenDecoded.exp * 1000).
- [ ] En la vista `/user` se muestran los datos del usuario: ID, nombre, email, username, género y token (luego de hacer `GET` a `https://dummyjson.com/auth/me` con el header `Authorization: Bearer <token>`)
- [ ] Se muestra temporizador que indica la expiración del token y se actualiza en caso de refrescar el token.
- [ ] Se refresca el token al actualizar el tiempo de expiración (tanto en la cookie como en la vista `/user`)
- [ ] Si se inicia sesión con "Remember Me" activado, entonces al cerrar y volver a abrir el navegador, el usuario seguirá logeado siempre que el token siga siendo válido.
- [ ] Si se inicia sesión con "Remember Me" desactivado, entonces al cerrar y volver a abrir el navegador, se abrirá directamente el login (sin dejar rastro de algun token.). Esto porque era una cookie de sesión temporal.
- [ ] Si el token expira, se debe mostrar en la vista user el mensaje de "Expirado" en el temporizador.
- [ ] Si el token expiró, no se debe poder refrescar el token, mostrando un mensaje de error al presionar "refrescar".
- [ ] La funcionalidad "Cerrar sesión" elimina el token de las cookies, limpia el estado y redirige a `'/'`


## 💡 Recomendaciones

- Usa `console.log()` y DevTools para revisar las cookies y validar que el flujo esté correcto.
- Puedes usar [https://jwt.io/](https://jwt.io/) para entender el contenido de los tokens.

## 👀 Observaciones adicionales

Las librerías jwt-decode y js-cookies fueron utilizadas a modo de ejemplo, no obstante, el uso que se les dió en esta actividad fue principalmente ilustrativo y educativo, pero lo realizado no es lo más seguro. En particular:

`jwt-decode`: se utilizará en esta actividad para leer el payload del JWT en el cliente y mostrar cuánto falta para que expire. Es decir, solo decodifica, no valida la firma ni garantiza autenticidad. Sirve para UX, no para seguridad. Por lo tanto, cabe destacar que la decodificación se suele hacer en el backend para validar la autenticidad de la firma del JWT.


`js-cookie:` se utilizará en esta actividad para leer/escribir/borrar cookies desde el frontend y así guardar sesión, refrescar y cerrar sesión. Esto es útil cuando las cookies son accesibles por JS, no obstante, si el token va en la cookie `HttpOnly`, el frontend no debe leerla y la librería js-cookie ya no aplica. En general, se recomienda enviar tokens en cookies HttpOnly + Secure + SameSite y usar withCredentials en el cliente.