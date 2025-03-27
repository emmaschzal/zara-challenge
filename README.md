# Zara Challenge para Napptilus

Este proyecto es una aplicación full-stack desarrollada como parte de un reto técnico. Está construida con **Next.js** en el frontend y **Node.js (Express)** en el backend. El backend actúa como un intermediario entre el frontend y una API externa.

## Tech Stack

- **Frontend**: React (Next.js), CSS Modules, clsx
- **Backend**: Node.js, Express
- **Testing**: Jest + Supertest
- **Environment**: `.env.development`, `.env.production`, mock support

---

##  Arquitectura y Estructura del Proyecto

```txt
zara-challenge/

│
├── backend/           # Servidor Express que consume API externa
│   ├── routes/        # Rutas del backend (`shop.js`)
│   ├── api/           # Archivos mock JSON para entorno de desarrollo
│   ├── server.js      # Punto de entrada del servidor
│   ├── .env.*         # Variables de entorno para backend 
│   └── package.json   # ejecución del front
││
├── frontend/          # Aplicación Next.js (React)
│   ├── components/    # Componentes reutilizables 
│   ├─  public         # Archivos publicos como fuentes (Helvetica, de uso no comercial)
│   ├── hooks          # Hooks pesronalizados (useDebounce desde 0)
│   ├── shop           # Ruta de la tienda con la página principal y la página individual de productos
│   ├── shop           # Ruta del carrito
│   ├── styles         # Estilos generales
│   ├── testing        # Testing de front (no terminado)
│   ├── types          # clases para los componentes
│   └── package.json   # ejecución del front

├── README.md              

```
## Instalación

Clonar el repositorio en local y dirigirse a carpeta backend.
Instalar dependencias
```bash
npm install
```
Ir a carpeta frontend e instalar dependencias
```bash
npm install
```


## Ejecutar proyecto
El proyecto dispone version desarrollo y versión produccion, la versión de desarrollo usa la API real. Empezar backend en desarrollo:
```bash
npm run dev
```
Backend en producción
```bash
npm run start
```
Frontend en desarrollo
```bash
npm run dev
```
Frontend produccion.
Primero:
```bash
npm run build

```
Seguidamente:
```bash
npm run start

```
## Archivos de entorno
Importante añadir la API KEY en el archivo .env.prodution para que haga la llamada a la API externa. Quitar el .sample de los archivos de entorno.

Algunas cosas mencionadas en el pdf que no he conseguido realizar por falta de tiempo
- SASS
- Algunas transiciones, y crossfades 
- Mas testing

Dicho esto, acabo este proyecto con muchas ganas de seguir aprendiendo.
Aunque pueda o no conseguir el puesto, he aprendido varias cosas nuevas que no conocía antes. :)
