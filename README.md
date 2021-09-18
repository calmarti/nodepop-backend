## API para el servicio de venta de artículos de segunda mano 'Nodepop'
---


## Requisitos de software

Se asume la previa instalación de:

 1. Node (10.19.0 o superior).
 2. MongoDB (1.3.6 o superior)

 Las versiones anteriores de ambos paquetes no han sido probadas y no todas podrían ser adecuadas.

## Instalación de dependencias e inicialización de la base de datos
Tras clonar el repo con: <pre> git clone https://github.com/calmarti/practicaNode-Express-MongoDB.git</pre> deben instalarse las dependencias de Nodepop desde la consola: 
```sh 
npm install
```
Para poder ejecutar la aplicación es necesario contar además con una base de datos (no vacía) de MongoDB cuyo *schema* sea compatible con el del modelo de anuncios de Nodepop, a saber: 

```js

    name: {type: String, required: true}, 
    sale: {type: Boolean, required: true},
    price: {type: Number, required:true, min: 1},
    picture: {type: String},
    tags: {type: [String], required:true} 

```

Para fines de testear la app, la base de datos puede ser inicializada con un fichero de prueba de 20 anuncios (*initAdverts.json*) al ejecutar: 

```sh 
npm run initdb
```
## Ejecución
Para arrancar el servidor web de Node, el servidor de MongoDB y ejecutar la aplicación de Express:

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
### Recurso raiz 

Una petición GET al recurso raiz de la API devuelve la lista total de anuncios de Nodepop (sin filtros)

```sh
http://127.0.0.1:3000/apiv1/adverts
```

### Atributos

Están disponibles todos los atributos de un anuncio estándar de Nodepop:

Name: nombre del producto

Price: precio del producto

Sale = true si es un anuncio de venta

Sale = false si es un anuncio de compra

Picture: Cadena string con la ruta de la foto principal del producto

Tags: array de tags o categorías a las que perntenece el producto

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
http://127.0.0.1:3000/apiv1/adverts/?select=atributo_1&atributo_2
```

devuelve la lista total de anuncios restringiendo la información únicamente a los atributos 1 y 2.

**Para paginar los resultados** de las búsquedas están disponibles los siguientes comandos:

- `skip`: ignora los primeros *n* anuncios ('skip=n')

- `limit`: muestra solo una 'página' de *n* anuncios ('limit=n')

- `sort`: ordena el resultado de la búsqueda en forma ascendente

Ejemplo: 

```sh
http://127.0.0.1:3000/apiv1/adverts/?skip=2&limit=10&sort=price
```
Devuelve una lista ordenada (en forma ascendente) de 10 anuncios contando a partir del tercer anuncio de la lista (es decir, ignora los dos primeros anuncios)

**Para búsquedas por rango de precio** están disponibles tres casos:
- Para un rango de precio mínimo y máximo separar ambos valores con el caracter '-': 
 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=min-max
 ```
-Para precios superiores a un mínimo: 
 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=min-
 ```
-Para precios inferiores a un máximo:

 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=-max
 ```

**Para busquedas por nombre del artículo**

- Introducir el nombre del artículo de interés como valor en el atributo *name*

**Para búsquedas por inicial o letras iniciales del artículo**

- Introducir la(s) primera(s) letra(s) del artículo:

Ejemplo:
```sh
http://127.0.0.1:3000/apiv1/adverts/?name=?ma
```
devuelve una lista de anuncios que contiene artículos tales como macbooks, maletines, mascarillas, etc.

---
### Recurso para crear un documento

Para crear un nuevo anuncio debe hacerse una petición POST a:

```sh
http://127.0.0.1:3000/apiv1/adverts/new
```

El body de la petición puede contener cualquiera de los atributos disponibles: `name, price, sale, picture, tags`, siempre que sus valores correspondan con sus *types* (definidos en el *schema* de arriba)

El atributo `price` debe ser mayor o igual a 1 unidad monetaria

El atributo `sale` solo admite dos valores: `true` o `false`

---

### Recurso para obtener la lista de tags (etiquetas) existentes
Una petición GET a: 

```sh
http://127.0.0.1:3000/apiv1/adverts/tags
```
devuelve un array con la lista de los tags (no repetidos) existentes en la base de datos


