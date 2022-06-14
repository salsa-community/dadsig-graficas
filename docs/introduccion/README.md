---
sidebar: auto
---

# Introducción

**DAI-GRAFICAS** es una biblioteca de componentes de [Vue.js](https://Vuejs.org/) para la visualización de datos. Es 
creada con la versión 2.6.11 [Vue.js](https://Vuejs.org/) y con la versión 7.0.0 de [D3.js](https://D3js.org/).

## Cómo empezar

### Requerimientos previos

Es recomendable que la persona usuaria de esta biblioteca tenga conocimientos previos de 
[Javascript](https://www.javascript.com/), así como de la creación de componentes en
[Vue.js](https://Vuejs.org/).

Es necesario tener instalado el manejador de paquetes 
[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) y el entorno de ejecución de javascript 
[Node.js](https://nodejs.org/en/).

### Instalación

#### Opción A

Ir al [repositorio de github](https://github.com/conacyt-dai/dai-graficas) y clonarlo. Si no se sabe como
[aquí](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) hay una guía de 
como realizarlo. 

Una vez clonado el repositorio, se puede instalar en la terminal con `npm` ejecutando la siguiente línea de comando,

```shell
npm install ruta_al_repositorio/dai-graficas
```

#### Opción B 

Cuando se consigan accesos o se haga público el repositorio, podrá instalarse sin necesidad de tenerlo clonado y se hará
también por medio de `npm` y ejecutando lo siguiente en la línea de comando,

```shell
npm install git+https://usuario:clave@github.com/conacyt-dai/dai-vis.git#v{{$themeConfig.version}}
```

en dónde `usuario` y `clave` serán necesarios sólo si el repositorio se mantiene privado.

#### Opción C

Cuando se publique en `npm`, la instalación hará por medio de la terminal con la siguiente línea de comando,

```shell
npm install dai-graficas
```

## Uso de componentes de visualización

En esta biblioteca un **componente de visualización** es un 
[componente de Vue](https://es.Vuejs.org/v2/guide/components.html) (valga la redundancia) que usa la biblioteca
[D3.js](https://d3js.org/) para construir visualizaciones de datos.

Las visualizaciones de esta biblioteca se importan como componentes de Vue a un proyecto existente.

Se listan a continuación las visualizaciones de datos que se pueden construir usando los componentes de esta biblioteca.

| Componente | Visualización |
|--|:-------------|
| `<DaiBarras/>` |Barras verticales simples|
| `<DaiBarras/>` |Barras verticales apiladas|
| `<DaiBarras/>` |Barras horizontales simples|
| `<DaiBarras/>` |Barras horizontales apiladas|
| `<DaiDonas/>` |Donas  |
| `<DaiDiagramaCajas/>` |Diagrama de cajas o Boxplot|
| `<DaiSeriesTiempo/>` |Líneas con eje temporal (Serie de tiempo)|

Se puede notar que distintos tipos de barras (sencillas, horizontales, verticales, etc.) se construyen usando el 
mismo componente de visualización. Esto es porque por medio de parámetros se puede customizar un mismo gráfico de barras.
Lo anterior y ejemplos de uso de todos los componentes de visualización se puede encontrar en el apartado 
[Visualizaciones](http://localhost:8080/dai-graficas/visualizaciones/) de esta documentación.

Los componentes disponibles en esta biblioteca se encuentran en la carpeta `src/components/`.

### Registrando el componente en un proyecto de Vue

Para poder utilizar un componente de visualización de esta biblioteca, es necesario importar y registrarlo en el 
archivo `src/main.js` del proyecto a trabajar, por ejemplo en el siguiente script se está registrando e importando el 
componente de `DaiBarrasApiladas` de esta biblioteca.

```javascript
import Vue from 'Vue'
import App from './App.Vue'
import {DaiBarrasApiladas} from "dai-graficas";
import 'dai-graficas/dist/dai-graficas.css';

Vue.use(DaiBarrasApiladas)

new Vue({
    render: h => h(App),
}).$mount('#app')
```

### Uso básico

Una vez instalado y registrado el componente, ya se puede usar dentro de un `<template>` de otros componentes o vistas
de Vue como se muestra a continuación.

```vue
<DaiBarrasApiladas 
  :barras_apiladas_id="'barras_basicas_1'"
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

En el script anterior se especifican los parámetros del componente `DaiBarrasApiladas` como pueden ser el `id`, los 
datos que se usarán para construir las barras, las variables para construir la gráfica, etc.

## Construyendo visualizaciones con Vue y D3

En esta sección se explica la lógica y estructura de los componentes de visualización de datos que constituyen 
esta biblioteca. 

### D3.js

[D3](https://d3js.org/) es una biblioteca de javascript para crear documentos basados en datos. Permite crear y ligar 
elementos de HTML a una base de datos, así como sus atributos y estilos. De esta forma se logran hacer representaciones
visuales de los datos. Además, D3 contiene una extensa cantidad de funciones que permiten operar y manipular los datos, 
desde encontrar promedios, máximos, mínimos, hasta agrupar bases de datos y transformarlas en estructuras más complejas.

El formato de Gráficos Vectoriales Escalables ó [SVG](https://www.w3.org/Graphics/SVG/), es probablemente SVG el entorno
más usado con D3 para hacer gráficos. Como su nombre lo índica este formato es vectorial y tiene una sintaxis muy 
similar a la de HTML, es decir, existe una etiqueta `<svg></svg>` a la que se le pueden ir agregando elementos como 
círculos, rectángulos, polígonos, lineas, y otro tipo de figuras más elaboradas como son los 
[`path's`](https://www.w3schools.com/graphics/svg_path.asp). 

Es importante tomar en cuenta que en SVG **no hay [z-index](https://developer.mozilla.org/es/docs/Web/CSS/z-index)**, 
por lo cual los elementos mostrarán uno sobre otro preservando el orden de escritura en el script.

En el siguiente ejemplo se dibuja dentro del entorno `svg` un círculo de radio de 10 pixeles especificándole una 
posición `cx` y `cy`. Posteriormente se dibuja un rectángulo de ancho (`width`) de 20 pixeles y de altura (`height`) de 
15 pixeles, donde también se determina un trazo (`stroke`) externo de color rojo (`red`) y de grosor de 2 pixeles. 
Por último se dibuja una línea con un trazo negro y se marca su inicio (que coicide con el círculo) y su final por 
medio de las propiedades `x1`, `y1`, `x2`, `y2`.

```html
<svg width="100" height="40">
    <circle r="10" cx="20" cy="30"/>
    <rect width="20" height="15" y="20" x="50" style="stroke: red; stroke-width:2px"/>
    <line x1="10" y1="30" x2="100" y2="0" stroke="#000" stroke-width="3"/>
</svg> 
```
<svg width="100" height="40">
    <circle r="10" cx="20" cy="30"/>
    <rect width="20" height="15" y="20" x="50" style="stroke: red; stroke-width: 2px"/>
    <line x1="10" y1="30" x2="100" y2="0" stroke="#000" stroke-width="3px"/>
</svg>


### Estructura de un componente de visualización

En la sección anterior ya se ejemplificó como se usa D3 para dibujar trazos en un entorno SVG. Esto se puede 
combinar con Vue para producir [componentes](https://es.Vuejs.org/v2/guide/components.html) que construyan 
distintos tipos de visualizaciones (Barras, Líneas, etc.).

#### El `template`

Un componente de visualización de Vue de esta biblioteca incluye una plantilla `<template></template>`, que es donde se 
construyen los elementos HTML y SVG obligatorios para la construcción de la visualización. Es decir, si la 
visualización incluye un encabezado, un tooltip, ejes horizontales y verticales, un entorno svg para la gráfica y un 
pie de gráfica, entonces el componente se construye de la siguiente manera,

```vue
<template>
	<div class="contenedor-grafica" :id="id">
		
        <slot name="encabezado"></slot>
		
        <div class="contenedor-tooltip-ejes-svg">
			<div class="tooltip"></div>
            <div class="eje-vertical"></div>
			<svg class="svg-grafico"></svg>
            <div class="eje-horizontal"></div>
		</div>
        
        <slot name="pie"></slot>
	
    </div>
</template>
```

Cabe mencionar que en el ejemplo anterior se agregaron encabezado y pie de gráfica por medio del uso de 
[`slots`](https://Vuejs.org/guide/components/slots.html) de Vue. De la misma manera la estructura real del template 
será mucho más elaborada, pues habrá que agregar elementos extras de acuerdo a la complejidad de la visualización 
que la persona usuaria tenga en mente. Por ejemplo, adentro del tooltip puede que sea necesario agregar un botón para 
cerrar el mismo, o bien elementos para rotar el eje horizontal o grupos `<g></g>` dentro del entorno `<svg>` para 
separar tipos de elementos.

#### Lógica

Una vez determinados los elementos HTML y SVG del componente de visualización es necesario establecer los parámetros 
obligatorios y opcionales del componente, así como las funciones de Javascript que determinarán su comportamiento. 
Esto como en todos los componentes de Vue se especifica dentro del `<script></script>`.

Para empezar se escribe el nombre del componente usando `name` para después especificar los parámetros 
del mismo por medio de `props`; aquí se escriben que tipo de dato es cada parámetro del componente, por ejemplo 
el parámetro `datos`, que se refiere a la base de datos que se utilizará para construir la visualización, se pide que 
sea un `Array` es decir un arreglo de javascript. En este apartado se puede especificar un valor _default_ para un 
parámetro, por ejemplo si se requiere que el tooltip de una visualización esté siempre cerrado se puede especificar 
un parámetro de tipo booleano cuyo default sea `false`.

Dentro de `watch` se mandan llamar a las funciones que se inicializarán si alguno de los parámetros en `props` cambia. 
En el código de ejemplo se muestran algunas funciones que actualizan una gráfica de barras.

En `mounted` se declara el entorno svg y se mandan llamar las funciones declaradas en `methods`. Estas últimas son 
funciones de javascript que construyen la visualización, por ejemplo `creandoBarras()` será una función que usa 
elementos de D3 para construir gráficas de barras.

```vue
<script>
import * as d3 from "d3";

export default {
    name: 'NombreComponente',
    props: {
        // Los parámetros que construyen el componente puede ser obligatorios u 
        // opcionales (se especificará como default su valor)
        id: String,
        datos: Array,
        variables: {
            type: Array,
            default: function () {
                return []
            }
        },
        titulo_eje_x: String,
        titulo_eje_y: String
    },
    watch: {
        // Se inicializan las siguientes funciones si props cambia, 
        // y así se actualizará la gráfica 
        datos(new_val, old_val) {
            this.configurandoDimensionesParaBarras();
            
            // Re-creamos barras
            this.creandoBarras();

            // Ajustes
            this.actualizandoBarras();
        },
    },
    data() {
        return {
            ...
        }
    },
    mounted() {
        // se nombra/declara el svg y los demás elementos que se 
        // llaman en los distintos métodos
        this.svg = d3.select("div#" + this.id + " svg.contenedor-tooltip-ejes-svg")

        this.configurandoDimensionesParaSVG();
        this.configurandoDimensionesParaBarras();
        this.creandoBarras();
        this.actualizandoBarras();

        this.tooltip = d3.select("div#" + this.barras_apiladas_id)
            .select("div.tooltip");
        window.addEventListener("resize", this.reescalandoPantalla);
    },
    methods: {
        configurandoDimensionesParaSVG() {
            // Se da el ancho y alto del SVG, así como la posición del grupo que 
            // contendrá a los elementos visuales
        },
        configurandoDimensionesParaBarras() {
            // Formatea datos para crear elementos visuales y 
            // se crean las escalas y de paso los ejes de la gráfica 
        },
        creandoBarras() {
            // Crea los elementos visuales
        },
        actualizandoBarras() {
            // Da estilos y atributos a elementos visuales
        },
        reescalandoPantalla() {
            this.configurandoDimensionesParaSVG()
            this.configurandoDimensionesParaBarras();
            this.actualizandoBarras()
        },
        mostrarTooltip() {
        },
        cerrarTooltip() {
        },
    }
}
</script>
```



