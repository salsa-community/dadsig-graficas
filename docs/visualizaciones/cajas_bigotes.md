# Diagrama de cajas y bigotes

A continuación se describe la utilización del componente de visualización `<DadsigCajasBigotes/>` para construir un
gráfico de cajas y bigotes o también conocido como _Boxplot_.

## Parámetros

La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.

### Obligatorios

* `caja_id`: (_String_) Identificador básico del componente, sin espacios ni caracteres especiales.
* `datos`: (_Array_) Base de datos donde cada objeto del arreglo corresponde a una variable categórica con su
  correspondiente variable numérica ó métrica. La variable categórica se grafica en el eje horizontal del plano,
  mientras que la métrica correspondiente se agrupa dentro de los límites de los cuartiles _extremo superior_,
  _cuartil superior_, _mediana_, _cuartil inferior_, _extremo inferior_ o bien fuera de los límites de los cuartiles,
  siendo entonces un punto/dato _atípico_ o _único_ (_outlier_).

En el siguiente ejemplo, se muestra un conjunto de datos donde cada arreglo corresponde a las acciones vendidas por
cierta empresa, de tal manera que la variable categórica será el nombre de la empresa, `nombre_empresa` y la métrica
será el número de acciones vendidas, `acciones_vendidas`:

  ```
  [
      {
          "nombre_empresa": "Empresa A",
          "acciones_vendidas": 180
      },
      {
          "nombre_empresa": "Empresa B",
          "acciones_vendidas": 250
      },
      {
          "nombre_empresa": "Empresa C",
          "acciones_vendidas": 310
      },
      .
      .
      .
      {
          "nombre_empresa": "Empresa B",
          "acciones_vendidas": 412
      }
  ]
      
  ```

* `variables`: (_Object_) Objeto que contiene el nombre de la variable categórica, el nombre de la métrica y el color
  asignado al conjunto de cajas. Por ejemplo:

  ```
  {'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#000'}
  ``` 

* `titulo_eje_x`: (_String_) Título para el eje horizontal, en esta visualización será para la variable categórica.
* `titulo_eje_y`: (_String_) Título para el eje vertical, en esta visualización será para la variable numérica o
  métricas.

### Opcionales

Estos parámetros cuentan con un valor _default_ al importar el componente, por lo tanto la persona usuaria tendrá más
libertad de customizar el componente al modificarlos.

* `ancho_tooltip` : (_Number_) Ancho de tooltip, por defecto usa 195.
* `margen` : (_Object_) Objeto que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 20, abajo: 40, izquierda: 40, derecha: 20}`.
* `alto_vis` : (_Number_) Altura del svg, 200 por defecto.
* `tooltip_activo`: (_Boolean_) `true` por default, muestra el tooltip. Si es `false`, entonces no mostrará tooltip.
* `textoTooltip`: (_Function_) Función que debe regresar el texto que queremos en el tooltip.

## Ejemplos de uso

En esta sección se detallan tres distintos casos de uso de este componente. Dado que el diagrama de cajas y bigotes
requiere que los datos se encuentren completamente desagregados, se recomienda agregar los mismos por medio de un
archivo `.json` externo. Lo anterior se hace por medio de un `import` en el apartado `<script/>`. En el siguiente
extracto de código se agrega el archivo `diagramacajas_ejemplo_1.json` que grafica el número de acciones vendidas por
diversas empresas.

```vue
<script>
  import cajasbigotesejemplos from "./cajas_bigotes_ejemplo_1.json"

  export default {
    name: 'cajas-bigotes-basico',

    data: function () {
      return {
        datos: cajasbigotesejemplos,
      }
    },
  }
</script>
```

En el caso contrario en el que se quieran agregar los datos directamente como un arreglo en el template del componente,
éstos se deberán de colocar de la siguiente manera (nótese que aquí se abrevia el conjunto de datos usando "..."),

```HTML 
<DadsigCajasBigotes
        ref="cajas_bigotes_basica"
        :caja_id="'cajas_bigotes_basica'"
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
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#000'}"
        :tooltip_activo="false"
/>
```

### Cajas y bigotes sin interacción

Se ingresa un _Array_ de datos con tantos objetos como datos desagregados se tengan. Cada objeto contendrá el nombre de
la variable categórica (a graficar en el eje horizontal) y el nombre y valor de su correspondiente métrica (a agruparse
o no dentro de los límites de los cuartiles dependiendo del valor de la métrica).

En este ejemplo, el componente se escribe de la siguiente manera

```HTML 
    <DadsigCajasBigotes
        ref="cajas_bigotes_basica"
        :caja_id="'cajas_bigotes_basica'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :tooltip_activo="false"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#000'}"
    />
```

En este caso, no es necesario agregar elementos en el apartado `<style/>` pues este componente ya incluye todo dentro
del template y el script. El resultado es el siguiente,

<cajas-bigotes-basico/>

### Uso de slots y tooltip

El siguiente ejemplo muestra la manera en la cual se utilizan los
[`slots`](https://vuejs.org/guide/components/slots.html) de Vue (también se explican de manera general en la sección
_Visualizaciones_ de esa documentación) para insertar encabezados y pies de gráficas para poner títulos, notas,
controles, nomenclaturas, etc. dentro del componente. El HTML es el siguiente,

```html
<DadsigCajasBigotes
        ref="cajas_slots"
        :caja_id="'cajas_bigotes_slots'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
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
</DadsigCajasBigotes>
```

El gráfico resultante es el siguiente, en el cual se empleo una tipografía distinta en los `slots` para hacer énfasis en
su adición a la visualización. Observe también que si no se especifica la propiedad de
`:tooltip_activo="false"`, por defecto ya se puede ver un tooltip,

<cajas-bigotes-slots-tooltip/>

### Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega estilo en el scss para customizar la
gráfica y ciertos métodos para modificar los datos que se grafican por medio de un botón. Las bases se cargan desde
archivos `.json`.

```html
<template>
    <div id="app">
        <DadsigCajasBigotes
                ref="cajas_bigotes_cambio_base"
                :caja_id="'cajas_bigotes_cambio_base'"
                :datos="datos"
                :titulo_eje_x="titulos_eje_x"
                :titulo_eje_y="titulos_eje_y"
                :variables="variables"
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
                    <p>Aliquam erat volutpat. In cursus ipsum purus. Quisque a pellentesque justo. Donec nec justo
                        sodales,
                        dignissim leo consectetur, pulvinar leo. Aenean sodales a lacus eget porta.</p>
                    <button @click="alternandoBase">Cambia la data</button>
                </div>
            </template>
        </DadsigCajasBigotes>
    </div>
</template>
```

En el `</script>` se agregan las bases y las funciones necesarias para alternar entre una y otra, mientras que en el
apartado de `</sytyle>` se customizan propiedades como el marco de la gráfica, radio del contenedor, etc.

```vue
<script>
import cajasbigotesejemplo1 from "./cajas_bigotes_ejemplo_1.json"
import cajasbigotesejemplo2 from "./cajas_bigotes_ejemplo_2.json"

export default {
  name: 'cajas-bigotes-cambiando-base',

  data: function () {
    return {
      datos: cajasbigotesejemplo1,
      variables: {'grupos': 'nombre_empresa', 'variable_dist': 'acciones_vendidas', 'color': '#2c7fb8'},
      titulos_eje_x: 'Empresas',
      titulos_eje_y: 'Acciones vendidas',
      base_seleccionada: 1,
    }
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = cajasbigotesejemplo2;
        this.variables = {'grupos': 'nombre_categoria', 'variable_dist': 'metrica', 'color': '#253494'};
        this.titulos_eje_x = 'Categorías';
        this.titulos_eje_y = 'Métrica';
      } else {
        this.base_seleccionada = 1;
        this.datos = cajasbigotesejemplo1;
        this.variables = {'grupos': 'nombre_empresa', 'variable_dist': 'acciones_vendidas', 'color': '#2c7fb8'};
        this.titulos_eje_x = 'Empresas';
        this.titulos_eje_y = 'Acciones vendidas';
      }
    },
  },
};
</script>
```

El resultado es el siguiente:

<cajas-bigotes-cambiando-base/>