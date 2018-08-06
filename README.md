# Webpage
Proyecto Programación Comercial

## Empezando

Esta instrucciones les indicará como obtener una copia funcional del proyecto en su maquina local.

### Prerrequisitos
Programas necesarios para ejecución del proyecto.
```
MongoDB
NodeJS
```

### Instalación

En la carpeta del proyecto, crear una carpeta llamada **mongodb** junto a una subcarpeta llamada **data**. Luego abrir una línea de comandos en la carpeta del proyecto y ejecutar el comando
 ```
 npm install
 ```
 
 ### Ejecución
 Para ejecutar el programa primero hay que iniciar el servidor de MongoDB.
 
 Para eso, abrir una línea de comandos en la carpeta **mongodb** y ejecutar
 ```
 mongod --dbpath=data
 ```
 Luego abrir otra línea de comandos en la carpeta del proyecto y ejecutar
 ```
 npm run dev
 ```
 Si no hay errores se podrá acceder a la página a través de **localhost:3000**
 
 ## Modificaciones
 Para que cualquier modificación al proyecto sea efectiva, se debe correr el comando
 ```
 npm run webpack
 ```
 antes de ejecutar **npm run dev**
