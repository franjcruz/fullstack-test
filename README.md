# prueba-fullstack

## Setup con Docker

Use [docker-compose](https://docs.docker.com/compose/) para levantar el stack. Los datos son éfimeros y los contenedores desaparecerán cuando el stack se baje.

Para levantar,

    $ docker-compose up

Navega a http://localhost:3001 para verificar la app.

Para bajar,

    $ docker-compose down

Este stack está en modo de desarrollo, todos los cambios que realice en el código volverán a recargar automáticamente ambas aplicaciones.

## Backend

 ### Sesiones

Para mantener la sesión de los usuarios he optado por usar [Passport.js](http://www.passportjs.org) más [JWT](https://jwt.io/), con la librería [passport-jwt](http://www.passportjs.org/packages/passport-jwt/)

Podría haber implementado un [Redis](https://redis.io) para el mantenimiento de la sesión, es decir, cuando llega la petición, se comprueba que ese token esté almacenado en Redis. ¿que aportaría esto? pues así habilitaría la funcionalidad para hacer logout, ya que con la solución ejecutada no es posible ya que se trata de una Stateless Authentication. El logout simplemente se encargaría de borrar ese token (o en plural, según el diseño de la app, multidispositivo, etc...) del usuario en Redis. Con esto contestaría a la pregunta "Ves oportuno que en un sistema de usuarios en la API haya un endpoint para Logout?"

 ### CRUD

 Para realizar un CRUD sobre una entidad, para que la API sea RESTFUL deberíamos desarrollar estos endpoints:

| ACCIÖN           | MÉTODO | ENDPOINT          | BODY                                                              | CÓDIGO DE ESTADO | RESPUESTA                                                                                                                                             |
| ---------------- | ------ | ----------------- | ----------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Listar libros    | GET    | /api/v1/books     | -                                                                 | 200              | [{"id": "1", "title": "El Señor de los Anillos", "autor": "J. R. R. Tolkien"}, {"id": "2", "title": "El diario de Ana Frank", "autor": "Anna Frank"}} |
| Obtener libro    | GET    | /api/v1/books/:id | -                                                                 | 200 o 404        | {"id": "1", "title": "El Señor de los Anillos", "autor": "J. R. R. Tolkien"}                                                                          |
| Crear libro      | POST   | /api/v1/books     | {"title": "El Señor de los Anillos", "autor": "J. R. R. Tolkien"} | 201              | {"id": "1", "title": "El Señor de los Anillos", "autor": "J. R. R. Tolkien"}                                                                          |
| Actualizar libro | PUT    | /api/v1/books/:id | {"title": "El hobbit", "autor": "J. R. R. Tolkien"}               | 200 o 404        | {"id": "1", "title": "El hobbit", "autor": "J. R. R. Tolkien"}                                                                                        |
| Eliminar libro   | DELETE | /api/v1/books/:id | -                                                                 | 204 o 404        | ----                                                                                                                                                  |

 Los 404 que aparecen en la tabla anterior hace referencia a lo que debe devolver la API cuando el recurso no existe.

 
