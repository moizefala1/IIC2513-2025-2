# Tarea 1 :construction:

* :pencil2: **Nombre:** Álvaro Ignacio Panozo Maturana
* :pencil2: **Correo:** lvaro.panozo@estudiante.uc.cl

## Código :symbols:

### :computer: Cómo ejecutar este código [1 Punto]

# Considerar que debe tener nodejs instalado con version igual o superior a 20.0.0
```bash
    npm install
    npm run dev
```
# Luego, en localhost:5173 se abrirá la pagina web

### :teacher: Explicación del funcionamiento del código [1.5 Puntos]
# Este codigo es una aplicación web construido con React, que utiliza la PokeAPI para gestionar la compra/venta, edicion, eliminacion y listado de Pokemons. Además, de gestionar a los usuarios (se crea un usuario si es que no existe a la hora de iniciar sesión). Existe una navbar reactiva la cual permite la navegación por las diferentes secciones de la aplicación.

### :warning: Funcionalidades implementadas y no implementadas
# La aplicación web cumple con todo el enunciado (salvo el bonus, aunque los componentes estan creados e implementados solamente en la compra de Pokemons).Se entiende por esto, que cumple : La creacion de usuarios, el inicio de sesion de los mismos, la compra de Pokemons, la venta de Pokemons, la edicion de Pokemons, la eliminacion de Pokemons y la creacion de los mismos.

## Reflexión :thought_balloon: [3.5 Puntos]

### :scroll: ¿Para que utilizamos *async* y *await* en las funciones? [1 Punto]
# Una funcion *async* es una funcion que se ejecuta asincronamente, entregando una promesa que puede ser resuelta o rechazada.  *Await* es una palabra clave que se coloca antes de una expresion, solamente se puede utilizar dentro de una funcion *async*, y se utiliza para esperar a que la promesa sea resuelta antes de continuar con el código. Si la promesa es resuelta, el await devuelve el valor de la promesa, si no se resuelve, se lanza una excepcion que puede ser capturada en un bloque try/catch.

### :thinking: Investiga sobre bibliotecas como Tailwind CSS o Bootstrap. Indica para qué sirven y explica de qué manera te hubiese servido para la realización de esta tarea. (Recordar que está prohibido su uso para esta tarea) [1 Punto]
# Ambos son frameworks CSS que permiten crear estilos para nuestra aplicación web, con clases predefinidas y estilos personalizados, los cuales podemos utilizar directamente en nuestro HTML. Bootstrap tiene componentes ya listos para usar, ideal para crear una pagina estable, de manera sencilla y rapida. El unico factor que les juega en contra, es su escalabilidad, ya que el html pasa a ser muy largo y dificil de mantener.

### :adhesive_bandage: Explica la diferencia entre *props* y *state* dentro de un componente React. ¿En qué situaciones utilizarías cada uno? [1.5 Puntos]
# Los *props* son los datos que recibe el componente desde su padre (o quien lo crea), y son de solo lectura, es decir el componente no puede modificarlos. Los *state* son estados que existen dentro de un componente en especifico, gestionados por el mismo, que se crean con useState. Por ejemplo un prop es util cuando quieres comunicar un componente con otro, generalmente facilitando la reutilizacion de los mismos, mientras que los estaos son utiles para manejar datos del componente que cambian con el tiempo, como un formulario. 

### :computer: ¿Realizaste el bonus?
**Los componentes estan creados e implementados solamente en la compra de Pokemons.**