# Prime Hotel Menu

En esta oportunidad y aprovechando el reto de Alkemy, desarrollamos una aplicación que hace uso de la API de spoonacular para hacer busqueda de diversos platos con la idea de que el usuario pueda agregar un total de 4 platos al menú y proceder con su compra.

## Herramientas utilizadas:

- HTML, JS, CSS
- ReactJS
- React Router
- Axios
- Bootstrap
- Spoonacular API

## Descripción

En este proyecto el usuario tiene que obligatoriamente ingresar con usuario y contraseña (challenge@alkemy.org | react) para ser redirigido a la sección 'Home' en la que puede utulizar el buscador, buscar platos, agregarlos al menú, eliminarlos del menú, vaciar completamente el menú o proceder. Al hacer click en el botón 'ver' de un plato, se mostrará una nueva ventana mostrando los detalles del plato (precio por plato, tiempo de preparación, health score, si es o no vegano o vegetariano). Al agregar un plato, la sección 'Menú' se actializará inmediatamente con los datos del plato (precio, tiempo de preparación promedio y health score promedio).

Si el usuario intenta agregar más de dos platos no veganos, la app no lo permitirá indicando un mensaje de error ("Es necesario agregar al menos dos platos veganos"), igualmente si el usuario intenta agregar más de dos platos veganos recibirá un mensaje similar indicando que necesita agregar al menos dos platos no veganos.

Si el usuario intenta proceder sin haber agregado cuatro platos al menú, recibirá un mensaje de error.

Si el usuario realiza una busqueda y no se encuentra ningun resultado, recibirá también un mensaje de error.

Si el usuario borra el token almacenado en localStorage estando en la sección Home, al intentar hacer una busqueda será inmediatamente redirigido a la sección de Login para que ingrese los datos nuevamente: si ingresa datos incorrectos, menos de dos caracteres o ningún caracter en alguno de los campos, recibirá un mensaje de error.

### Tener en cuenta

La Spoonacular API es una herramienta que para hacer búsquedas necesita palabras claves en inglés, ingresar una palabra en otro idioma puede generar que la busqueda no devuelva ningun resultado.

## Live Link

Puedes disfrutar de una version live en:

https://happy-wozniak-d95c72.netlify.app/

(no hace request a la API de alkemy)
