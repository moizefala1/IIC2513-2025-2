# Tarea 2 :construction:

* :pencil2: **Nombre:** Alvaro Panozo
* :pencil2: **Correo:** lvaro.panozo@estudiantes.uc.cl

## Código :symbols:

### :warning: Funcionalidades implementadas y no implementadas

Esta solución de la tarea presenta todas las funcionalidades propuestas en el enunciado (exceptuando el bonus).


## Ejecución
```
yarn install
yarn sequelize-cli db:migrate
yarn sequelize-cli db:seed:all
yarn run dev
```

## Postgres
```
psql
CREATE DATABASE tarea2_db; 
# considerar que el nombre tarea2_db es opcional
ALTER USER tarea2_admin WITH PASSWORD '1234'; 
# igualmente 1234 y tarea2_admin son credenciales que pueden cambiar a gusto 
GRANT ALL PRIVILEGES ON DATABASE tarea2_db TO tarea2_admin;
ALTER USER tarea2_admin CREATEDB;
exit 
```

# Indica los comandos de terminal necesarios para inicializar la base de datos acá


## Entorno
Una vez creada la base de datos e inicializado psql, se debe crear un archivo `.env`

```
DB_USER=...
DB_PASS=...
DB_NAME=...
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DIALECT=postgres
# deben colocar los datos creados en psql en el archivo .env con este formato
```

## Sequelize

### User
```
yarn sequelize-cli model:generate --name User --attributes name:string,image:string,password:string,balance:float

```

### Pokemon
```
yarn sequelize-cli model:generate --name Pokemon --attributes name:string,level:integer,types:array,price:float,image:string,onSale:boolean,userId:integer

# podemos usar types:array gracias a que estamos usando psql, luego en el modelo se especifica que el array es de strings
```

### Review
```
yarn sequelize-cli model:generate --name Review --attributes authorId:integer,reviewedId:integer,comment:text,rating:integer
```

## Seeds

### Generar seeds
```
yarn sequelize-cli seed:generate --name usuario-prueba
yarn sequelize-cli seed:generate --name pokemon-prueba
yarn sequelize-cli seed:generate --name reviews-prueba
```

### Cargar seeds
```
yarn sequelize-cli db:seed:all
```

## Bibliografia
```
GitHub Copilot - https://copilot.github.com/
Se utilizó copilot para lograr encontrar la solucíon en la linea 25 de routes/reviews.js con el comando Promise.all()
```
