## API para el servicio de venta de artículos de segunda mano 'Nodepop'
---

## Requisitos de software

Se asume la previa instalación de:

 1. Node 10.19.0 o superior
 2. MongoDB 1.3.6 o superior

 Nota: en versiones anteriores de estos programas esta app podría no funcionar como se espera.

## Instalación de dependencias e inicialización de la base de datos
Tras clonar el repo con: <pre> git clone https://github.com/calmarti/practicaIntroToBackEnd.git</pre> deben instalarse las dependencias de la app desde la consola: 
```sh 
npm install
```
Para poder ejecutar la aplicación es necesario inicializar la base de datos. Para ello puede usarse cualquier fichero JSON de anuncios cuyo *schema* sea compatible con el modelo de anuncios de Nodepop:

## Schema

```js

    name: {type: String, required: true}, 
    sale: {type: Boolean, required: true},
    price: {type: Number, required: true, min: 1},  
    picture: {type: String},
    tags: {type: [String]}   

```
Este JSON debe importarse en el fichero de inicialización `initDB.js`:

```js
const initialData = require('./nombreFicheroDeInicializacion.json');
```

Nota: Los valores de *picture* deben todos comenzar por: `/images/`,  carpeta del subdirectorio `/public` donde deben guardarse los ficheros de imágenes

Si no se dispone de este fichero, puede inicializarse la base de datos con una muestra de 20 anuncios (*advertsSample.json*) que ya se encuentra en la raiz del directorio de este proyecto.

En cualquier caso, la inicialización se realiza ejecutando el script de inicialización: 

```sh 
npm run initdb
```
## Ejecución

Se asume que el servidor de MongoDB ha sido arrancado.

Para arrancar el servidor web de Node, conectarlo al servidor de MongoDB (a través de mongoose) e iniciar la aplicación de Express:

```sh
npm start
```
o bien, en modo desarrollo: 

```sh
npm run dev
```

---

## Como usar la API de  Nodepop

---
### Recurso principal

Una petición GET al recurso principal de la API devuelve la lista total de anuncios de Nodepop (sin filtros)

```sh
http://127.0.0.1:3000/apiv1/adverts
```

### Atributos

Están disponibles todos los atributos de un anuncio estándar de Nodepop:

**Name**: nombre del producto

**Price**: precio del producto

**Sale** = `true` si es un anuncio de venta / `false` si es un anuncio de compra

**Picture**: Cadena con la ruta de la foto del producto

**Tags**: array de tags o categorías a las que pertenece el producto

### Búsquedas con parámetros de tipo *query string*

**Búsquedas por par clave-valor**

Para buscar anuncios con pares atributo-valor específicos:

```sh
http://127.0.0.1:3000/apiv1/adverts/?atributo_1=valor_1&atributo_2=valor2
```

**Para obtener información parcial** de la lista total de anuncios se utiliza el comando *select*

Ejemplo: 

Una petición GET a 
```sh
http://127.0.0.1:3000/apiv1/adverts/?select=name&select=tags
```

devuelve la lista total de anuncios restringiendo la información únicamente a los campos `name` y `tags`

**Para paginar los resultados** de las búsquedas están disponibles los siguientes comandos:

- `skip=n`: ignora los primeros *n* anuncios 

- `limit=n`: muestra solo una 'página' de *n* anuncios 

Además, para ordenar los resultados por un atributo de interés y de forma ascendente: 

- `sort=atributo` 

Nota: para ordenar de forma descendente colocar `'-'` antes del atributo

Ejemplo de paginación ordenada: 

```sh
http://127.0.0.1:3000/apiv1/adverts/?skip=10&limit=10&sort=price
```
Devuelve una lista ordenada de diez anuncios contando a partir del undécimo anuncio de la lista (ignora los diez primeros anuncios)

Esta última petición permite, por ejemplo, paginar los resultados de 10 en 10 (sumar 10 al valor de skip para cada nueva página)   

**Para búsquedas por rango de precio** están disponibles tres casos:
- Para un rango cerrado separar el valor mínimo y el máximo con el caracter `'-' `: 
 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=min-max
 ```
- Para precios superiores a un mínimo: 
 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=min-
 ```
- Para precios inferiores a un máximo:

 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=-max
 ```

**Para busquedas por nombre del artículo**

- Introducir el nombre del artículo de interés como valor del atributo *name*

**Para búsquedas por inicial o letras iniciales del nombre del artículo**

- Introducir la(s) primera(s) letra(s) del artículo:

Ejemplo:
```sh
http://127.0.0.1:3000/apiv1/adverts/?name=ma
```
devuelve una lista de anuncios que contiene artículos tales como macbooks, maletines, mascarillas, etc.


Nota: las búsquedas por nombre son *case-insensitive*

---
### Operación de la API para crear un documento

Para crear un nuevo anuncio debe hacerse una petición POST a:

```sh
http://127.0.0.1:3000/apiv1/adverts/new
```

El body de la petición debe contener valores para los atributos:

 `name, price, sale, picture` y `tags`
 
  y sus *types* deben coincidir con los definidos en el *schema* (ver arriba)

Además, 

El atributo `price` debe ser mayor o igual a 1 

El atributo `sale` solo puede contener: `true` o `false`

---

### Operación de la API para obtener la lista de tags existentes

Una petición GET a: 

```sh
http://127.0.0.1:3000/apiv1/adverts/tags
```
devuelve un array con la lista de los tags (no repetidos) existentes 


