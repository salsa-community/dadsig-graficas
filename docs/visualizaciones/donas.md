# Donas

A continuación se describe la utilización del componente de visualización `<DadsigDonas/>` para construir un gráfico de 
donas.

## Parámetros

La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.

### Obligatorios

* `dona_id`: (_String_) Identificador básico del componente, sin espacios ni caracteres especiales.
* `datos`: (_Array_) Base de datos donde cada objeto del arreglo corresponde a una variable categórica con su
    correspondiente variable numérica ó métrica y un color para cada segmento de arco de la dona. 

### Opcionales

Estos parámetros cuentan con un valor _default_ al importar el componente, por lo tanto la persona usuaria tendrá más
libertad de customizar el componente al modificarlos.

* `ancho_tooltip` : (_Number_) Ancho de tooltip, por defecto usa 100.
* `radio_interno`: (_Number_) Cantidad que se multiplica por el ancho del svg para dar un valor a la función
  `innerRadius` de d3. El valor por defecto es de 0.18.
* `radio_externo`: (_Number_) Cantidad que se multiplica por el ancho del svg para dar un valor a la función
    `outerRadius` de d3. El valor por defecto es de 0.32.
* `radio_texto`: (_Number_) Cantidad que se multiplica por el ancho del svg para dar un valor a la funciones
  `innerRadius` y `outerRadius` de d3 y que determinan la posición de los textos de porcentaje afuera de la dona. El 
  valor por defecto esde 0.33.

## Ejemplos de uso

En esta sección se detallan dos distintos casos de uso de este componente.

### Uso de slots y tooltip

El siguiente ejemplo muestra la manera en la cual se utilizan los
[`slots`](https://vuejs.org/guide/components/slots.html) de Vue (también se explican de manera general en la sección
_Visualizaciones_ de esa documentación) para insertar encabezados y pies de gráficas para poner títulos, notas,
controles, nomenclaturas, etc. dentro del componente. El HTML es el siguiente,

```html
    <DadsigDonas
        ref="donas-slots-tooltip"
        :dona_id="'dona'"
        :datos="datos"
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
</DadsigDonas>
```

El gráfico resultante es el siguiente, en el cual se empleo una tipografía distinta en los `slots` para hacer énfasis en
su adición a la visualización. Observe también que si no se especifica la propiedad de
`:tooltip_activo="false"`, por defecto ya se puede ver un tooltip,

<donas-slots-tooltip/>


### Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega estilo en el scss para customizar la
gráfica y ciertos métodos para modificar los datos que se grafican por medio de un botón. Las bases se cargan desde
archivos `.json`.

```html
<template>
    <div id="app">
        <DadsigDonas
                ref="donas_cambio_base"
                :datos="datos"
                :dona_id="'donas_cambio_base'">
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
        </DadsigDonas>
    </div>
</template>
```
En el `</script>` se agregan las bases y las funciones necesarias para alternar entre una y otra, mientras que en el
apartado de `</sytyle>` se customizan propiedades como el marco de la gráfica, radio del contenedor, etc.

```vue
<script>
import donasejemplo1 from "./donas_1.json"
import donasejemplo2 from "./donas_2.json"
import donasejemplo3 from "./donas_3.json"

export default {
  name: "donas-cambiando-base",

  data: function () {
    return {
      datos: donasejemplo1,
      base_seleccionada: 1,
    }
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = donasejemplo2;
      } else if (this.base_seleccionada == 2) {
        this.base_seleccionada = 3;
        this.datos = donasejemplo3;
      } else {
        this.base_seleccionada = 1;
        this.datos = donasejemplo1
      }
    },
  },

}
</script>
```

El resultado es el siguiente:

<donas-cambiando-base/>