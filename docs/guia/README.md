---
sidebar: auto
---

# Guía de inicio

**DAI-GRAFICAS** es una biblioteca de componentes de visualización de datos creados con [Vue.js](https://vuejs.org/) en
su versión 2.6.11 y con [d3.js](https://d3js.org/) en su versión 7.0.0. Actualmente cuenta con 3 tipos de componentes
que proveen los métodos para construir gráficas interactivas y los atributos necesarios para hacerles modificaciones.

## Cómo empezar

Para usar los componentes en un proyecto de vue, los pasos son los siguientes

### Instalación

Se puede instalar en la terminal con `npm` siempre y cuando se tenga el repositorio clonado en local mediante. Por medio
de una terminal ejecutar la siguiente línea de comando

```
npm install ruta_al_repositorio/dai-graficas
```

cuando se consigan accesos o se haga público el repositorio, podrá instalarse sin necesidad de tenerlo clonado y se hará
de la siguiente forma:

```
npm install git+https://usuario:clave@github.com/conacyt-dai/dai-vis.git#v{{$themeConfig.version}}
```

en dónde `usuario` y `clave` serán necesarios sólo si el repositorio se mantiene privado.

Cuando se publique en `npm`, la instalación hará por medio de la terminal con la siguiente línea de comando

```
npm install dai-viz
```

### Registrando el componente en Vue

Para poder utilizar un componente de esta biblioteca, es necesario importar y registrarlo en el archivo `src/main.js`
del proyecto a trabajar, por ejemplo en el siguiente script se está registrando e importando el componente de
`DaiBarrasApiladas` de esta biblioteca.

```Javascript
import Vue from 'vue'
import App from './App.vue'
import {DaiBarrasApiladas} from "dai-graficas";
import 'dai-graficas/dist/dai-graficas.css';

Vue.use(DaiBarrasApiladas)

new Vue({
    render: h => h(App),
}).$mount('#app')
```

### Uso básico

Una vez instalado y registrando el componente, ya se puede usar dentro del `<template>` de otros componentes o vistas
como se muestra a continuación.

```HTML

<DaiBarrasApiladas
        :barras_apiladas_id="'barras_basicas_1'"
        :datos="[
		{nombre_rectangulos:'Nombre de variable 1 ', cantidad_1:120,cantidad_2:40,cantidad_3:40 },
		{nombre_rectangulos:'Nombre de variable 2 ', cantidad_1:100,cantidad_2:30,cantidad_3:40 },
		{nombre_rectangulos:'Nombre de variable 3 ', cantidad_1:20,cantidad_2:130,cantidad_3:540 },
		{nombre_rectangulos:'Nombre de variable 4 ', cantidad_1:20,cantidad_2:130,cantidad_3:540 },
	]"
        :variables='[
		{"id":"cantidad_1","nombre_colores":"cantidad 1","color":"yellow"},
		{"id":"cantidad_2","nombre_colores":"cantidad 2","color":"magenta"},
		{"id":"cantidad_3","nombre_colores":"cantidad 3","color":"blue"},
	]'
        :nombre_barra="'nombre_rectangulos'"
        :nombre_color="'nombre_colores'"
/>
```


