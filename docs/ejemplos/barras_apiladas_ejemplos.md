
# DaiBarrasApiladas

En esta sección se detallan 3 distintos casos de uso del componente

## Gráfica estática
Se ingresa un Array de datos con tantos diccionarios como barras se deseen visualizar. Cada diccionario debe tener el nombre de la barra y las cantidades de cada una de las categorías-colores.

En este ejemplo, el componente se escribe de la siguiente manera 

```HTML 
<DaiBarrasApiladas
      :barras_apiladas_id="'barras_basicas'"
      :datos="[
        {
          nombre_rectangulos: 'Nombre de variable 1 ',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'Nombre de variable 2 ',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: 'yellow' },
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: 'magenta' },
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: 'blue' },
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical"
      titulo_eje_x="Eje horizontal"
      :tooltip_activo="false"
    />
```

En este caso, toda la información que se necesita para hacer la gráfica está en el `<template/>`, por  lo cual no es necesario escribir las etiquetas de `<script/>` o de `<style/>`. El resultado es el siguiente

<barras-apiladas-ejemplo-basico/>

## Uso de slots y tooltip

El siguiente ejemplo muestra la manera en la cual se pueden insertar encabezados y pies de gráficas para poner títulos, notas, controles, nomenclaturas, etc. dentro del componente. El HTML es el siguiente

```HTML
<DaiBarrasApiladas
    :barras_apiladas_id="'barras_slot'"
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
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#721817' },
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#2B4162' },
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: '#0B6E4F' },
    ]"
    :nombre_barra="'nombre_rectangulos'"
    :nombre_color="'nombre_colores'"
    titulo_eje_y="Eje vertical"
    titulo_eje_x="Eje horizontal"
>
    <template slot="encabezado">
    <div>
        <h3>Título slots</h3>
        <p>
        Tanto el título que aparece arriba, como este texto, se integran
        como slot. Se puede estilizar segun las necesidades con un poco de
        CSS o, en su momento, importando el sistema de diseño
        </p>
    </div>
    </template>
    <template slot="pie">
    <div>
        <h3>Pie de gráfica</h3>
        <p>
        Este otro bloque corresponde al slot de pie de gráfica, en donde
        usualmente se ponen nomenclaturas, notas o controles, y también
        puede modificarse con CSS según las necesidades.
        </p>
    </div>
    </template>
</DaiBarrasApiladas>
```

Y el gráfico resultante es el siguiente, observe que si no se especifica la propiedad de `:tooltip_activo="false"`, por default ya se puede ver un tooltip


<barras-apiladas-ejemplo-slots-tooltip/>

## Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega un poco de estilo y algunos métodos para modificar los datos que se están pintando. Las bases se cargan desde archivos .json y se agregó un poco de estilo. El resultado es el siguiente:

<barras-apiladas-ejemplo-cambiando-base/>


El `<template>` es el siguiente:

```HTML
<DaiBarrasApiladas
    :barras_apiladas_id="'barras_cambio_base'"
    :datos="datos"
    :variables="variables"
    :nombre_barra="'nombre_rectangulos'"
    :nombre_color="'nombre_colores'"
    titulo_eje_y="Eje vertical"
    titulo_eje_x="Eje horizontal"
    :margen="{arriba: 10, abajo: 20, derecha:10, izquierda:30}"
>
    <template slot="encabezado">
    <div class="encabezado">
        <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
        <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
    </div>
    </template>
    <template slot="pie">
    <div class="pie">
        <h3>Pie de gráfica</h3>
        <button @click="alternandoBase">Cambia la data</button>
    </div>
    </template>
</DaiBarrasApiladas>
```

En el escript se incluyó lo siguiente: 

``` Javascript

import base_dummy_1 from "./base_dummy_1.json";
import base_dummy_2 from "./base_dummy_2.json";

export default {
  name: "BarrasBasico",
  data: function () {
    return {
      algo: true,
      datos: base_dummy_1,
      variables: [
        { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#721817" },
        { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#2B4162" },
        { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#0B6E4F" },
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
          { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#231123" },
          { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#82204A" },
          { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#558C8C" },
		  { id: "cantidad_4", nombre_colores: "cantidad 4", color: "#E8DB7D" },
          { id: "cantidad_5", nombre_colores: "cantidad 5", color: "#DBC2CF" }
        ];
				
      } else {
        this.base_seleccionada = 1;
        this.datos = base_dummy_1;
        this.variables = [
          { id: "cantidad_1", nombre_colores: "cantidad 1", color: "#721817" },
          { id: "cantidad_2", nombre_colores: "cantidad 2", color: "#2B4162" },
          { id: "cantidad_3", nombre_colores: "cantidad 3", color: "#0B6E4F" }
        ];
      }
    },
  },
};
```