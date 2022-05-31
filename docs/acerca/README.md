---
sidebar: auto
---

# Acerca de 

En esta sección se encuentra información sobre como se construyó la librería con la finalidad de proveer herramientas para colaboradorxs


## D3.js 

[d3](https://d3js.org/) es una librería de javascript para crear documentos basados por datos.

Permite crear y ligar elementos de HTML a una base de datos, así como sus atributos y estilos. De esta forma se logra hacer representaciones visuales de los datos.

Además, D3 contiene una extensa cantidad de funciones que nos permiten operar y manipular los datos, desde encontrar promedios, máximos y mínimos, hasta agrupar las bases  y transformarlas a estructuras más complejas.

Probablemente SVG es entorno que más se usa con d3 para hacer gráficos. Estos son vectoriales y tiene una sintaxis muy similar a la de HTML, es decir, hay una etiqueta `<svg></svg>` y adentro se le pueden ir agregando elementos como círculos, rectángulos, polígonos, lineas, y otro tipo de figuras más elaboradas como son los `path`s. Es importante tomar en cuenta que en SVG **no hay z-index**, por lo cual los elementos mostrarán uno sobre otro preservando el orden de "escritura".

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

## Pa' graficar con Vue.

Acá recopilo algunas experiencias que he tenido combinando d3 con Vue para crear los componentes

### Sobre el template 
Los componentes de vue incluyen una plantilla `<template><template/>`, lo ideal será dejar adentro de esta etiqueta los elementos de HTML y SVG que sí o sí deben ir. La estructura deve ser algo así como 
```html
<template>
	<div class="contenedor-grafica" :id="id">
		
        <slot name="encabezado"></slot>
		
        <div class="contenedor-tooltip-ejes-svg">
			<div class="tooltip"></div>
            <div class="eje-y"></div>
			<svg class="svg-grafico"></svg>
            <div class="eje-x"></div>
		</div>
        
        <slot name="pie"></slot>
	
    </div>
</template>
```


En la vida real, la estructura del template será un poquito más elaborada porque hay que agreagar elementos extras, por ejemplo adentro del tooltip el botón de cerrar, elementos  para rotar el eje-y o grupos `<g></g>` adentro del `<svg>` para separar tipos de elementos, pero en escencia esta es la estructura general.

### Sobre el script

Esta es la parte más laboriosa para hacer el componente, pero mantener la siguiente estructura nos va facilitar las cosas y mantener un flujo común.

```javascript
	import * as d3 from "d3";

	export default {
		name: 'NombreComponente',
		props: {
			// Todas las cosas que se pueden especificar desde afuera del componente
            // que se necesitan para tener una gráfica. Puede haber propiedades 
            // opcionales, para las cuales se especificará un default
            id: String,
            datos: Array,
            variables: {
                type: Array,
                default: function(){return []}
            },
            titulo_eje_x: String,
            titulo_eje_y: String
		},
		watch:{
            // Cuando el componente watché que alguna de las props esta cambiando, 
            // entonces va a disparar algunas funciones para actualizar la gráfica
			datos(new_val,old_val){
				this.configurandoDimensionesParaBarras();
                
                // Re-creamos barras

				this.creandoBarras();

				// Ajustes
				this.actualizandoBarras();
			},
		},
		
		data(){
			return{
				...
			}
		},
		mounted(){
			// nombramos - declaramos al svg y los demás elementos que se 
            // llamarán en los distintos métodos
			this.svg = d3.select("div#"+this.id+" svg.contenedor-tooltip-ejes-svg")

			this.configurandoDimensionesParaSVG();
			this.configurandoDimensionesParaBarras();
			this.creandoBarras();
			this.actualizandoBarras();

			this.tooltip = d3.select("div#"+this.barras_apiladas_id)
				.select("div.tooltip");
			window.addEventListener("resize", this.reescalandoPantalla);
		},
		methods:{
			configurandoDimensionesParaSVG(){
                // damos el ancho y alto del SVG, así como la posición del grupo que 
                // contendrá a los elementos visuales
                 
			},

			configurandoDimensionesParaBarras(){
                // Formatea datos para crar elementos visuales y creamos las escalas
                // y de paso los ejes 
			},
			creandoBarras(){
                // Crea los elementos visuales
			},
			actualizandoBarras(){
                // Da estilos y atributos a elementos visuales
			},
			
			reescalandoPantalla(){
				this.configurandoDimensionesParaSVG()
				this.configurandoDimensionesParaBarras();
				this.actualizandoBarras()
			},
			mostrarTooltip(){},
			cerrarTooltip() {},
			
		}
	}

```

## Documentación

Para generar la documentación de nuestros componentes utilizamos VuePress, que es un generador de sitios estáticos basado en Vue, con un template por default optimizado para escribir documentación técnica. Cada página generada por VuePress contiene un HTML estático prerenderizado, lo que nos permite tener una velocidad de carga óptima.
### ¿Cómo utilizar VuePress en este proyecto?

Supongamos que necesitamos crear la documentación de un nuevo componente llamado **"Donas"**:

  1. Crear la carpeta contenedora de la documentación de este componente dentro de la carpeta `docs`:
  ```bash
	mkdir docs/donas
  ``` 
  2. Dentro de esta carpeta, vamos a crear los archivos que van a contener la documentación de este componente:
  * `README.md`: página inicial de la documentación de tu componente.
  * `ejemplos.md`: aquí puedes agregar los ejemplos varios de usos del componente.
  * Si tu componente requiere alguna otra documentación en especial, puedes agregar ese archivo con la terminación `.md`.

  3. Ahora vamos a agregar este componente a nuestro menú principal. Necesitas modificar el archivo `docs/.vuepress/config.js`. Para esto, agregamos un nuevo elemento al arreglo `nav`: 
  ```javascript
	
	module.exports = {
		//...
		themeConfig: {
			//...
			nav:[
				//...
				{
        			text: 'Donas',
        			link: '/donas/',
				},
			]
		}
	}
 ```
  4. Ya tenemos nuestro componente en la navegación principal, ahora agregaremos la documentación del componente en la barra lateral. Es muy importante que agregues **todos los enlaces** de documentación que ya creamos en el paso 2.

```javascript
	
	module.exports = {
		//...
		themeConfig: {
			//...
			sidebar:{
				//...
				 '/donas/': [ // debe ser igual al valor de la propiedad `link` del paso anterior
					{
						title: 'Donas',
						collapsable: false,
						children: [
							'', // esto es equivalente al archivo README de la carpeta de tu componente
							'ejemplos',
							'componente', //equivale a `docs/donas/componente.md`
						]
					}
				],
			}
		}
	}
 ```
   5. ¡Listo! Con estos pasos completados, ya puedes visualizar la documentación de tu nuevo componente.  
