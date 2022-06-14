# Barras verticales apiladas

A continuación se describe la utilización del componente de visualización `<DaiBarras/>` para construir un gráfico de 
barras verticales apiladas.

## Parámetros

La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.

### Obligatorios

* `barras_id`: (_String_) Identificador básico del componente, sin espacios ni caracteres especiales.
* `datos`: (_Array_) Base de datos, lista de objetos en donde cada elemento corresponde a una barra. Se debe especificar
  el nombre de la barra y los valores de sus subcategorías/colores, por ejemplo en la siguiente base de datos se dan dos 
  valores numéricos (métricas) para una variable categórica que representa los nombres de los estados de la República
  Mexicana.

  ```
  [
    {nombre_entidad: 'Yucatán', cantidad_1: 120, cantidad_2: 30}, 
    {nombre_entidad: 'Puebla ', cantidad_1: 100, cantidad_2: 50}
  ]
  ```

El valor de las métricas `cantidad_1` y `cantidad_2` son las que generan las barras apiladas. Si la base de datos 
sólo incluye una métrica, entonces la visualización será una de [barras verticales]() sencillas.
 
* `variables`:  (_Array_) Arreglo de objetos, en donde cada uno contiene información de las subcategorías/colores
  incluidos en la base de datos. Por ejemplo:

  ```
  [
    {id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#ffffcc'},
    {id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#c7e9b4'}
  ] 
  ``` 

  > Con este parámetro se puede controlar cuantas subcategorías se quieran visualizar. Por ejemplo, si la base de datos 
  > tiene valores para `cantidad_1`, `cantidad_2` y `cantidad_3`, pero en variables solo se especifican dos objetos 
  > para `cantidad_2` y `cantidad_3`, entonces la gráfica mostrará sólo estos últimos dos colores. El parámetro `id` 
  > se refiere al nombre del identificador que se está usando en la base de datos; `nombre_colores` es una clave que 
  > puede cambiar y se debe especificar el nombre de dicha clave en el parámetro `nombre_color`, pero se refiere 
  > al texto que quiere que aparezca para la persona usuaria, ya sea en tooltips o en nomenclatura; y `color` es 
  > el color que se quiere que tenga cada subcategoría.

* `nombre_color`: (_String_) Debe tener el mismo valor que se está usando en el arreglo `variables` para referirse
  al texto que se quiere que aparezca para el cliente. Es decir, si `variables`
  fuera 

  ```
    [
      {id: 'cantidad_1', nombre_subcategoria: 'cantidad 1', color: '#ffffcc'}, 
      {id: 'cantidad_2', nombre_subcategoria: 'cantidad 2', color: '#c7e9b4'}]
    ]
  ```
  entonces `nombre_color` debe ser igual a `"nombre_subcategoria"`.


* `nombre_barra`: (_String_) Debe tomar el valor que se está usando como clave para referirnos a los nombres de las
  barras o categorías generales en la base de datos. En este ejemplo, tendría que ser igual a `'nombre_entidad'`.

* `titulo_eje_x`: (_String_) Titulo para el eje horizontal, en esta visualización será para la variable categórica.
* `titulo_eje_y`: (_String_) Titulo para el eje vertical, en esta visualización será para las variables numéricas
  o métricas.

### Opcionales

Estos parámetros cuentan con un valor _default_ al importar el componente, por lo tanto la persona usuaria tendrá más
libertad de customizar el componente al modificarlos.

* `ancho_tooltip`: (_Number_) Ancho de tooltip, por defecto usa 165.
* `margen` : (_Object_) Objeto que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 20, abajo: 50, izquierda: 60, derecha: 20}`.
* `alto_vis` : (_Number_) Altura del svg, 195 por defecto.
* `tooltip_activo`: (_Boolean_) `true` por default lo que hace que se muestre el tooltip.
* `textoTooltip`: (_Function_) que debe regresar el texto que queremos en el tooltip. Para usar los datos de la barra
  más cercana al cursor, podemos acceder mediante `this.$refs['barras1'].tooltip_data_seleccionada` suponiendo que
  se agrega al componente `ref="barras1"`.
* `dominio_y`: (_Array_) Este es un parámetro que se construye a partir de los datos ingresados por la persona 
  usuaria. Indica el rango numérico del eje vertical y por lo tanto la persona usuaria lo puede especificar, sin 
  embargo no tiene un valor default.

## Ejemplos de uso

### Barras verticales apiladas sin interacción

Se ingresa un arreglo de datos con tantos diccionarios como barras se deseen visualizar. Cada diccionario debe tener 
el nombre de la barra y las cantidades de cada una de las categorías y colores.

En este ejemplo, el componente se escribe de la siguiente manera

```HTML 
<DaiBarras
      :barras_id="'barras_apiladas_estaticas'"
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
        { id: 'cantidad_1', nombre_colores: 'Cantidad 1', color: '#ffffcc'},
        { id: 'cantidad_2', nombre_colores: 'Cantidad 2', color: '#c7e9b4'},
        { id: 'cantidad_3', nombre_colores: 'Cantidad 3', color: '#7fcdbb'},
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (numérico)"
      titulo_eje_x="Eje horizontal (categórico)"
      :tooltip_activo="false"
    />
```

En este caso, toda la información que se necesita para hacer la gráfica está en el `<template/>`, por  lo cual no es 
necesario escribir la etiqueta de `<style/>`, mientras que la de `<script/>` se puede colocar si se desea exportar 
esta visualización como otro componente de Vue. El resultado es el siguiente,

<barras-verticales-apiladas-basico/>

### Uso de slots y tooltip

El siguiente ejemplo muestra la manera en la cual se utilizan los 
[`slots`](https://vuejs.org/guide/components/slots.html) de Vue (también se explican de manera general en la sección 
_Visualizaciones_ de esa documentación) para insertar encabezados y pies de gráficas para poner títulos, 
notas, controles, nomenclaturas, etc. dentro del componente. El HTML es el siguiente

```HTML
<DaiBarras
    :barras_id="'verticales_apiladas_slots_tooltip'"
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
    titulo_eje_y="Eje vertical (numérico)"
    titulo_eje_x="Eje horizontal (categórico)"
>
    <template slot="encabezado">
    <div class="slot-encabezado">
        <h4>Título slots</h4>
        <p>
        Tanto el título que aparece arriba, como este texto, se integran
        como slot. Se puede estilizar segun las necesidades con un poco de
        CSS o, en su momento, importando el sistema de diseño
        </p>
    </div>
    </template>
    <template slot="pie">
    <div class="slot-pie">
        <h4>Pie de gráfica</h4>
        <p>
        Este otro bloque corresponde al slot de pie de gráfica, en donde
        usualmente se ponen nomenclaturas, notas o controles, y también
        puede modificarse con CSS según las necesidades.
        </p>
    </div>
    </template>
</DaiBarras>
```

El gráfico resultante es el siguiente, en el cual se empleo una tipografía distinta en los `slots` para 
hacer énfasis en su adición a la visualización. Observe también que si no se especifica la propiedad de
`:tooltip_activo="false"`, por defecto ya se puede ver un tooltip,

<barras-verticales-apiladas-slots-tooltip/>


### Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega estilo en el scss para customizar la
gráfica y ciertos métodos para modificar los datos que se grafican por medio de un botón. Las bases se cargan 
desde archivos `.json`.

<barras-verticales-apiladas-cambiando-base/>

El `<template>` es el siguiente:

```HTML
<template>
  <div>
    <DaiBarras
            :barras_id="'verticales_apiladas_cambiando_base'"
            :datos="datos"
            :margen="{arriba: 10, abajo: 20, derecha:10, izquierda:30}"
            :nombre_barra="'nombre_rectangulos'"
            :nombre_color="'nombre_colores'"
            :variables="variables"
            titulo_eje_x="Eje horizontal (categórico)"
            titulo_eje_y="Eje vertical (numérico)"
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
    </DaiBarras>
  </div>
</template>
```

En el script se incluyó lo siguiente:

``` Javascript

import base_dummy_1 from "./base_dummy_1.json";
import base_dummy_2 from "./base_dummy_2.json";

export default {
  name: "verticales-apiladas-cambiando-base",
  data: function () {
    return {
      algo: true,
      datos: base_dummy_1,
      variables: [
        { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#ffffcc" },
        { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#c7e9b4" },
        { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#7fcdbb" },
      ],
      base_seleccionada: 1,
    };
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = base_dummy_2;
		this.variables = [
          { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#dadaeb" },
          { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#bcbddc" },
          { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#9e9ac8" },
          { id: "cantidad_4", nombre_colores: "cantidad 4", color: "#756bb1" },
          { id: "cantidad_5", nombre_colores: "cantidad 5", color: "#54278f" }
        ];
				
      } else {
        this.base_seleccionada = 1;
        this.datos = base_dummy_1;
        this.variables = [
          { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#ffffcc" },
          { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#c7e9b4" },
          { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#7fcdbb" }
        ];
      }
    },
  },
};
```


