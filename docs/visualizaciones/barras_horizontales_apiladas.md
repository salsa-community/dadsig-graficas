# Barras horizontales apiladas

A continuación se describe la utilización del componente de visualización `<DadsigBarras/>` para construir un gráfico de
barras horizontales apiladas.

## Parámetros
Se puede considerar este un caso particular de la visualización  de barras verticales apiladas, por 
lo tanto los parámetros obligatorios y opcionales descritos en la sección _Barras verticales apiladas_ serán los mismos 
que se deben de especificar para esta visualización y por lo tanto ya no se repetirán aquí.
## Ejemplos de uso
### Barras horizontales apiladas sin interacción
Se ingresa un arreglo de datos con tantos diccionarios como barras se deseen visualizar. Cada diccionario debe tener 
el nombre de la barra y las cantidades de cada una de las categorías y colores. Es importante que se agregue dentro de  los parámetros la orientación del componente: `orientacion="horizontal"`. _Es de importancia resaltar que lo anterior se necesita agregar para obtener una visualización con slots-tootlip y con modificación de datos, como se verá en el `HTML` de cada ejemplo de uso._ 

En este ejemplo, el componente se escribe de la siguiente manera: 
```html
<DadsigBarras
      :barras_id="'horizontales-apiladas-basico'"
      :datos="[
        {
          nombre_rectangulos: 'Variable A',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'Variable B',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#ffffcc'},
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#c7e9b4'},
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: '#7fcdbb'},
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (categórico)"
      titulo_eje_x="Eje horizontal (numérico)"
      orientacion="horizontal"
      :tooltip_activo="false"
    />

```
En este caso, toda la información que se necesita para hacer la gráfica está en el `<template/>`, por  lo cual no es 
necesario escribir la etiqueta de `<style/>`, mientras que la de `<script/>` se puede colocar si se desea exportar 
esta visualización como otro componente de Vue. El resultado es el siguiente,

<barras-horizontales-apiladas-basico/>

### Uso de slots y tooltip
El siguiente ejemplo muestra la manera en la cual se utilizan los 
[`slots`](https://vuejs.org/guide/components/slots.html) de Vue (también se explican de manera general en la sección 
_Visualizaciones_ de esa documentación) para insertar encabezados y pies de gráficas para poner títulos, 
notas, controles, nomenclaturas, etc. dentro del componente. El HTML es el siguiente
```html
<DadsigBarras
      :barras_id="'horizontales_apiladas_slots_tooltip'"
      :datos="[
        {
          nombre_rectangulos: 'A',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'B',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'C',
          cantidad_1: 90,
          cantidad_2: 60,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'D',
          cantidad_1: 70,
          cantidad_2: 60,
          cantidad_3: 10,
        },
        {
          nombre_rectangulos: 'E',
          cantidad_1: 40,
          cantidad_2: 30,
          cantidad_3: 80,
        },
        {
          nombre_rectangulos: 'F',
          cantidad_1: 60,
          cantidad_2: 50,
          cantidad_3: 30,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#ffffcc' },
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#c7e9b4' },
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: '#7fcdbb' },
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (categórico)"
      titulo_eje_x="Eje horizontal (numérico)"
      orientacion="horizontal"
    >
      <template slot="encabezado">
        <div class="slot-encabezado">
          <h4>Título slots</h4>
          <p class="slot-parrafo">
            Tanto el título que aparece arriba, como este texto, se integran
            como slot. Se puede estilizar segun las necesidades con un poco de
            CSS o, en su momento, importando el sistema de diseño
          </p>
        </div>
      </template>
      <template slot="pie">
        <div class="slot-pie">
          <h4>Pie de gráfica</h4>
          <p class="slot-parrafo">
            Este otro bloque corresponde al slot de pie de gráfica, en donde
            usualmente se ponen nomenclaturas, notas o controles, y también
            puede modificarse con CSS según las necesidades.
          </p>
        </div>
      </template>
    </DadsigBarras>

```
<barras-horizontales-apiladas-slots-tooltip/>

### Modificando datos
El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega estilo en el scss para customizar la
gráfica y ciertos métodos para modificar los datos que se grafican por medio de un botón. Las bases se cargan
desde archivos `.json`. Dentro del slot `<pie>` se agrega una etiqueta `<button>`con el evento para hacer el 
cambio de base de datos. También para darle estilos al botón, dependerá del SCSS o de la importación del 
sistema de diseño.

Se tiene entonces como resultado el siguiente `HTML`:
```html

    <DadsigBarras
        :barras_id="'horizontales_apiladas_cambiando_base'"
        :datos="datos"
        :margen="{arriba: 10, abajo: 20, derecha:10, izquierda:30}"
        :nombre_barra="'nombre_rectangulos'"
        :nombre_color="'nombre_colores'"
        :variables="variables"
        titulo_eje_x="Eje horizontal (numérico)"
        titulo_eje_y="Eje vertical (categórico)"
    >
      <template slot="encabezado">
        <div class="encabezado">
          <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
          <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
      </template>
      <template slot="pie">
        <div class="pie">
          <h3 class="titulo-visualizacion">Pie de gráfica</h3>
          <p>Aliquam erat volutpat. In cursus ipsum purus. Quisque a pellentesque justo. Donec nec justo sodales,
            dignissim leo consectetur, pulvinar leo. Aenean sodales a lacus eget porta.</p>
          <button @click="alternandoBase">Cambia la data</button>
        </div>
      </template>
    </DadsigBarras>
  

```
<barras-horizontales-apiladas-cambiando-base/>