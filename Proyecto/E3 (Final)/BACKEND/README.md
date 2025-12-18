# Dawdle API - Backend

API REST para la gestión de eventos y usuarios desarrollada con Node.js, Express y PostgreSQL.

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Variables de Entorno](#variables-de-entorno)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Comandos Disponibles](#comandos-disponibles)
- [Documentación API (Swagger)](#documentación-api-swagger)
- [Endpoints API](#endpoints-api)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **PostgreSQL** (versión 14 o superior) - [Descargar aquí](https://www.postgresql.org/download/)
- **Yarn** (gestor de paquetes) - [Instalar con](https://yarnpkg.com/getting-started/install): `npm install -g yarn`
- **Git** (opcional, para clonar el repositorio)

---

## ⚙️ Configuración del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/IIC2513/Los-404_backend_25-2.git
cd Los-404_backend_25-2
```

### 2. Instalar dependencias

```bash
yarn install
```

Esto instalará todas las dependencias necesarias listadas en `package.json`:
- Express 5.1.0 (Framework web)
- Sequelize 6.37.7 (ORM para PostgreSQL)
- bcrypt 6.0.0 (Hash de contraseñas)
- jsonwebtoken 9.0.2 (Autenticación JWT)
- express-validator 7.3.0 (Validación de inputs)
- swagger-ui-express (Documentación API)
- Y más...

---

## 🗄️ Configuración de la Base de Datos

### 1. Instalar PostgreSQL

Si no tienes PostgreSQL instalado:
- **Windows**: Descarga el instalador desde [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: Usa Homebrew: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Crear la base de datos

Abre la terminal de PostgreSQL (psql) o pgAdmin y ejecuta:

```sql
-- Crear usuario administrador
CREATE USER dawdle_admin WITH PASSWORD 'tu_password_seguro';

-- Crear base de datos
CREATE DATABASE dawdle_dev;

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE dawdle_dev TO dawdle_admin;

-- Conectar a la base de datos
\c dawdle_dev

-- Otorgar permisos al schema public
GRANT ALL ON SCHEMA public TO dawdle_admin;
```

### 3. Verificar la conexión

Puedes verificar que la base de datos está lista:

```bash
psql -U dawdle_admin -d dawdle_dev -h localhost
```

---

## 🔐 Variables de Entorno

### 1. Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env` con las siguientes variables:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de la base de datos
DB_USERNAME=dawdle_admin
DB_PASSWORD=tu_password_seguro
DB_NAME=dawdle_dev
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DIALECT=postgres

# Configuración JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion
JWT_EXPIRES_IN=7d
```

⚠️ **IMPORTANTE**: 
- Cambia `JWT_SECRET` por una clave aleatoria y segura
- Nunca subas el archivo `.env` a repositorios públicos
- En producción, usa variables de entorno del servidor

## 🚀 Instalación y Ejecución

### 1. Ejecutar migraciones

Las migraciones crean las tablas en la base de datos:

```bash
yarn sequelize-cli db:migrate
```

Esto creará las siguientes tablas:
- `Users` - Usuarios del sistema
- `Events` - Eventos del calendario
- `Notifications` - Notificaciones de eventos
- `Completeds` - Registro de eventos completados

### 2. Poblar base de datos con datos de prueba (Seeders)

```bash
yarn sequelize-cli db:seed:all
```

Esto creará:
- **3 usuarios** con contraseñas hasheadas (password: `password123`)
  - `admin` (usuario administrador)
  - `maria_lopez`
  - `carlos_gomez`
- **14 eventos** de ejemplo
- **9 notificaciones**
- **3 registros de completados**

### 3. Iniciar el servidor

#### Modo desarrollo (con auto-reload):
```bash
yarn dev
```

El servidor estará disponible en: **http://localhost:3000**

### 4. Verificar que funciona

Abre tu navegador en:
- **API Root**: http://localhost:3000
- **Documentación Swagger**: http://localhost:3000/api-docs

---

## 📝 Comandos Disponibles

```bash
# Base de datos
yarn reset:db         # Deshace migraciones, vuelve a ejecutarlas y carga seeds

# Linting
yarn lint             # Ejecuta ESLint para revisar el código
yarn lint:fix         # Ejecuta ESLint y corrige automáticamente

# Sequelize CLI (alternativas)
yarn sequelize-cli db:migrate              # Ejecutar migraciones
yarn sequelize-cli db:migrate:undo         # Deshacer última migración
yarn sequelize-cli db:migrate:undo:all     # Deshacer todas las migraciones
yarn sequelize-cli db:seed:all             # Ejecutar todos los seeders
yarn sequelize-cli db:seed:undo:all        # Deshacer todos los seeders
```

---

## 📚 Documentación API (Swagger)

La documentación interactiva de la API está disponible en:

**http://localhost:3000/api-docs**

### Cómo usar Swagger:

1. **Registrar o iniciar sesión**: Prueba los endpoints `/auth/register` o `/auth/login`
2. **Copiar el token JWT**: De la respuesta JSON
3. **Autorizar**: Haz clic en el botón "Authorize" 🔒 en la parte superior
4. **Pegar el token**: Solo el token, sin "Bearer"
5. **Probar endpoints**: Ahora puedes probar todos los endpoints protegidos

---

## 🏗️ Estructura del Proyecto

```
Los-404_backend_25-2/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── models/                # Modelos de Sequelize
│   │   ├── index.js
│   │   ├── user.js
│   │   ├── event.js
│   │   ├── notification.js
│   │   └── completed.js
│   ├── routes/                # Rutas de la API
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── events.js
│   ├── middlewares/           # Middlewares personalizados
│   │   └── auth.js            # Autenticación JWT
│   ├── migrations/            # Migraciones de base de datos
│   └── seeders/               # Datos de prueba
├── swagger.yaml               # Documentación OpenAPI 3.0
├── .env                       # Variables de entorno (NO subir a git)
├── .gitignore
├── package.json
├── yarn.lock
└── README.md
```

---

## 🔒 Seguridad

### Implementaciones de seguridad:

- ✅ **Bcrypt**: Contraseñas hasheadas con salt de 10 rondas
- ✅ **JWT**: Tokens con expiración configurable (default: 7 días)
- ✅ **Express Validator**: Validación de inputs en todos los endpoints
- ✅ **Middleware de autenticación**: Protección de rutas privadas
- ✅ **Control de permisos**: Verificación de propietario/admin


## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express 5** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Hash de contraseñas
- **Swagger/OpenAPI** - Documentación de API
- **ESLint** - Linter de código
- **Nodemon** - Auto-reload en desarrollo

---

## 👥 Equipo Los-404

Proyecto desarrollado para IIC2513 - Tecnologías y Aplicaciones Web

---


## 📞 Soporte

Para problemas o preguntas:
- Contactar al equipo Los-404  😎

---

**¡Gracias por usar Dawdle API!** 🎉
