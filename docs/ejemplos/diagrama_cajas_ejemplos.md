
# DaiBoxPlot

En esta sección se detallan 3 distintos casos de uso del componente. Dado que el diagrama de cajas y bigotes requiere 
que los datos se encuentren completamente desagregados, se recomienda agregar los mismos por medio de un archivo `.json`
externo. Lo anterior se hace por medio de un `import` en el apartado `<script/>`. En el siguiente extracto
de código se agrega el archivo `box_plot_ejemplo.json` que grafica el número de acciones vendidas
por diversas empresas.

```HTML
<script>
    import boxplotejemplo from "./box_plot_ejemplo.json"

    export default {
        name: 'ejemplo_basico',
        data: function () {
            return {
                datos: boxplotejemplo,
            }
        },
    }
</script>
```
En el caso contrario en el que se quieran agregar los datos directamente como un arreglo en el
template del componente se deberían de colocar de la siguiente manera (nótese que aquí se
abrevia el conjunto de datos usando "..."),

```HTML 
<DaiBoxPlot
        ref="cajas_basica"
        :caja_id="'boxplot_basica'"
        :datos=[
                {
                    "nombre_empresa": "Empresa A",
                    "acciones_vendidas": 180
                },
                {
                    "nombre_empresa": "Empresa B",
                    "acciones_vendidas": 178
                },
                .
                .
                .,
                {
                    "nombre_empresa": "Empresa C",
                    "acciones_vendidas": 120
                }
             ]
        :titulo_eje_x="'Número de acciones vendidas'"
        :titulo_eje_y="'Empresa'"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#000'}"
        :tooltip_activo="false"
/>
```

## Gráfica estática
Se ingresa un _Array_ de datos con tantos objetos como datos desagregados se tengan. Cada objeto contendrá el nombre de 
la variable categórica (a graficar en el eje horizontal) y nombre y valor de su correspondiente métrica (a agruparse o 
no dentro de los límites de los cuartiles dependiendo del valor de la métrica).

En este ejemplo, el componente se escribe de la siguiente manera

```HTML 
    <DaiBoxPlot
        ref="cajas_basica"
        :caja_id="'boxplot_basica'"
        :datos="datos"
        :titulo_eje_x="'Número de acciones vendidas'"
        :titulo_eje_y="'Empresa'"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#000'}"
        :tooltip_activo="false"
    />
```

En este caso, no es necesario agregar elementos en el apartado `<style/>` pues este componente 
ya incluye todo dentro del template y el script. El resultado es el siguiente,

<boxplots-ejemplo-basico/>

## Uso de slots y tooltip

El siguiente ejemplo muestra la manera en la cual se pueden insertar encabezados y pies de gráficas para poner títulos, notas, controles, nomenclaturas, etc. dentro del componente. El HTML es el siguiente

```HTML
    <DaiBoxPlot
        ref="cajas_slots"
        :caja_id="'boxplot_slots'"
        :datos="datos"
        :titulo_eje_x="'Número de acciones vendidas'"
        :titulo_eje_y="'Empresa'"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#00f'}"
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
    </DaiBoxPlot>
```

Y el gráfico resultante es el siguiente, observe que si no se especifica la propiedad de `:tooltip_activo="false"`, 
por default ya se puede ver un tooltip.

<boxplots-ejemplo-slots-tooltip/>

## Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega un poco de estilo y algunos métodos para 
modificar los datos que se están pintando. Las bases se cargan desde archivos `.json` y se agregó un poco de estilo. 
El resultado es el siguiente:

<boxplots-ejemplo-cambiando-base/>


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