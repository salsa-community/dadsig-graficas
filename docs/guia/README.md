---
sidebar: auto
---

# Guía de inicio

**DAI-VIZ** es una librería de componentes de visualización de datos creados con Vue (v2) y d3.js (v7). Actualmente cuenta con 3 tipos de gráficos que proveen los métodos para construir gráficas interactivas y los atributos necesarios para hacerles modificaciones. 

## Cómo empezar
Para usar los componentes en un proyecto de vue, los pasos son los siguientes

### Instalación
Instalar en la terminal con `npm`

`npm install git+https://devtemp-invitado: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@github.com/conacyt-dai/dai-vis.git#v{{$themeConfig.version}}`

### Registrando el componente en Vue

En el archivo `src/main.js`, importar y registrar el componente que se vaya a utilizar, por ejemplo `DaiBarrasApiladas`

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

Habiendo instalado y registrando el componente, ya se puede usar dentro del `<template>` de otros componentes o vistas :

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


