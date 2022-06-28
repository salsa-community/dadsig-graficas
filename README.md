# Dadsig-Graficas

Esta es una biblioteca de visualización de datos creada desde la Dirección de Análisis de Datos y Sistemas de 
Información Geográfica (Dadsig) perteneciente a [Conacyt](https://conacyt.mx/). Esta biblioteca es de código abierto y 
está desarrollada usando software libre. Así mismo sigue los lineamientos de la estrategia
[SALSA](https://salsa.crip.conacyt.mx/) creada en Conacyt.

> **_Limitación de responsabilidad_**
> 
> El presente es un proyecto en construcción, por tanto Conacyt no es responsable del uso y contenido del presente 
> recurso, toda vez que se trata de una versión en su modalidad prueba, y no de una versión pública, por lo que una vez 
> que sea lanzada la versión final, se invita a la persona usuaria a consultarla y validar sus requisitos.

## Dependencias e instalación

Las gráficas de esta biblioteca están desarrolladas como [componentes](https://es.vuejs.org/v2/guide/components.html) de
[Vue.js](https://es.vuejs.org/) usando [d3](https://d3js.org/), por lo tanto se recomienda a la persona usuaria tener 
conocimientos básicos de lo anterior así como de desarrollo en [javascript](https://www.javascript.com/).

Para instalar la biblioteca se puede hacer:

**Opción A**

Por medio de [npm](https://www.npmjs.com/) ejecutar la siguiente línea de comando en la terminal de la computadora,

```shell
npm install https://github.com/salsa-community/dadsig-graficas.git
```

**Opción B**

Clonar este repositorio en local. Si no se sabe como
[aquí](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) hay una guía de
como realizarlo.

Una vez clonado el repositorio, se puede instalar en la terminal con `npm` ejecutando la siguiente línea de comando,

```shell
npm install ruta_al_repositorio/dadsig-graficas
```


## Inicio rápido

### Registrando el componente en un proyecto de Vue

Para poder utilizar un componente de visualización de esta biblioteca, es necesario importar y registrarlo en el
archivo `src/main.js` del proyecto (de Vue) a trabajar, por ejemplo en el siguiente script se está registrando e 
importando el componente de `DadsigBarras` de esta biblioteca (que construye una gráfica de barras).

```javascript
import Vue from 'Vue'
import App from './App.Vue'
import {DadsigBarras} from "dadsig-graficas";
import 'dadsig-graficas/dist/dadsig-graficas.css';

Vue.use(DadsigBarras)

new Vue({
    render: h => h(App),
}).$mount('#app')
```

### Uso básico

Una vez instalado y registrado el componente, ya se puede usar dentro de un `<template>` de otros componentes o vistas
de Vue como se muestra a continuación.

```vue
<DadsigBarras
  :barras_id="'mi_proyecto_de_barras'"
  :datos="
    [
      {nombre_rectangulos:'Nombre de variable 1', cantidad_1:120, cantidad_2:40, cantidad_3:40 },
	  {nombre_rectangulos:'Nombre de variable 2', cantidad_1:100, cantidad_2:30, cantidad_3:40 },
	  {nombre_rectangulos:'Nombre de variable 3', cantidad_1:20, cantidad_2:130, cantidad_3:540 },
	  {nombre_rectangulos:'Nombre de variable 4', cantidad_1:20, cantidad_2:130, cantidad_3:540 },
	]"
  :variables='
    [
	  {"id":"cantidad_1","nombre_colores":"cantidad 1","color":"yellow"},
	  {"id":"cantidad_2","nombre_colores":"cantidad 2","color":"magenta"},
	  {"id":"cantidad_3","nombre_colores":"cantidad 3","color":"blue"},
	]'
  :nombre_barra="'nombre_rectangulos'"
  :nombre_color="'nombre_colores'"
/>
```

En el script anterior se especifican los parámetros del componente `DadsigBarras` como pueden ser el `id`, los
datos que se usarán para construir las barras, las variables para construir la gráfica, etc. Una lista completa de los 
parámetros usados en cada uno de los componentes de visualización se puede hallar en la [documentación en línea]().

## Licencia

Bajo la licencia [MIT](https://mit-license.org/).

## Contribuir

Para contribuir al proyecto, se pide que se haga por medio de los lineamientos de contribución de SALSA que se 
pueden consultar [aquí](https://salsa.crip.conacyt.mx/guidelines/contribute/).

*En los lineamientos de contribución se lista la rama _master_ como principal, sin embargo en este proyecto, dicha 
rama es _main_.

## Contacto

_Sección en construcción_
