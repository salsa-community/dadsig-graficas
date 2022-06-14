# Series de tiempo

A continuación se describe la utilización del componente de visualización `<DaiSeriesTiempo/>` para construir un
gráfico de líneas cuyo eje horizontal es temporal, es decir una serie de tiempo.

## Parámetros

La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.

### Obligatorios

* `linea_id` (_String_) Identificador único del componente.
* `datos` (_Array_) Base de datos como arreglo de objetos, en donde cada elemento debe tener el valor de las variables 
numéricas (métricas) de cada línea a graficar y su correspondiente valor temporal. En el siguiente conjunto de datos 
de ejemplo se dan métricas como claves numéricas y la fecha correspondiente a cada una.

    ```
      [
        {
         "01":30,
         "02":31,
         "fecha": "01-01-2021"
        },
        {
         "01":35,
         "02":25,
         "fecha": "01-02-2021"
        }
      ]
    ```

* `nombre_columna_horizontal` (_String_) Es el nombre que lleva la variable que va a usarse en el eje horizontal.
  Normalmente es temporal y en el ejemplo anterior sería "fecha".
* `variables` (_Array_) Lista de diccionarios que contiene atributos de cada una de las líneas. Las claves
  obligatorias son `cve` y `nombre`, y se refieren al nombre de la línea en la base de datos y al nombre que se quiere 
  mostrar el tooltip de cada línea graficada.

  ```
  [
   {
    "cve": "01",
    "nombre": "Aguascalientes",
    "abr": "AGS",
    "color": "rgb(33,56,140)",
    "resaltado": false
   },
   {
    "cve": "02",
    "nombre": "Baja California",
    "abr": "BC",
    "color": "rgb(10,25,45)"
    "resaltado": false
    }
  ]
  ```

### Opcionales

Los siguiente parámetros se pueden usar para modificar la visualización.

* `escala_logaritmica` (_Boolean_) Valor booleano para cambiar de la escala default (cuando es `false`) lineal a la 
escala logarítmica.`falso` por default.
* `titulo_tooltip` (_String_) Cadena de caracteres para agregar un título de tooltip, es `""` por default.
* `color_linea` (_String_) Por default el color de la(s) línea(s) a graficar será `#000`.
* `tooltip_activo` (_Boolean_) Indica si se quiere activar el tooltip. Es `true` por default.
* `tipo_tooltip` (_String_) Cadena de caracteres que indica el tipo de tooltip. Por default es `"general"` y 
muestra todos los datos.
* `ancho_tooltip` (_Number_) Número que indica el ancho del tooltip, por defecto usa 180.
* `alto_vis` (Number) Número que indica la altura del svg, tiene valor de 300 por default.
* `margen` (_Object_) Diccionario que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 10, abajo: 70, izquierda: 20, derecha: 30}`.
* `titulo_eje_y`: (_String_) Etiqueta del eje vertical.
* `titulo_eje_x`: (_String_) Etiqueta del eje horizontal.
* `conversionTemporal`: (_Function_) Función que por default es `d3.timeParse("%d-%m-%Y")` sirve para especificar el
  formato de la variable temporal.
* `textoTooltip` (_Function_) Esta función se usa para modificar el texto que aparece en los tooltips.

## Ejemplos de uso

En esta secciónse detallan tres diferentes tipos casos de uso de este componente. El componente `<DaiSeriesTiempo/>`
requiere que los datos se encuentren en un archivo `.json` externo, que se importa por medio de un `import`en el 
apartado `<script/>`. Para los diferentes ejemplos de esta sección, ya se tienen los datos importados.

### Series de tiempo sin interacción

En esta ejemplo, la gráfica es estática, y se puede observar que se tienen incluídos los parámetros obligatorias que ya
se mencionaron en la sección anterior. Ya que el tooltip es una propiedad por default, para lograr esta gráfica estática
lo que se debe de hacer es agregar la propiedad de `:tooltip_activo= "false"` para lograr ocultaro en la visualización. 
El `<template>` queda entonces estructurado de la siguiente manera:

```HTML
<template>
  <div>
    <DaiLineas
            ref="lineas1"
            :conversionTemporal="conversionTemporal"
            :datos="datos"
            :linea_id="'lineas1'"
            :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
            :nombre_columna_horizontal="'fecha'"
            :titulo_eje_x="'Eje horizontal (temporal)'"
            :titulo_eje_y="'Eje vertical (numérico)'"
            :tooltip_activo="false"
            :variables="edos_seleccionados"
    />
  </div>
</template>
```

Siendo este el resultado,

<series-tiempo-basico/>

### Uso de slots y tooltip
Los [slots](https://vuejs.org/guide/components/slots.html) son de mucha utilidad para poder insertar encabezados y pies 
de página al agregar títulos, notas, controles, nomenclaturas, o cualquier información que nos ayude a entender más 
las gráficas. Para poder agregar el uso de los slots y el tooltip, se hará de la siguiente manera:

* Tooltip: como se puede observar, ya no es necesario agregar la propiedad de `:tooltip_activo` ya que el tooltip por 
  default ya está agregado al componente.
* Slots: se pueden agregar tanto en el título como en el pie de la gráfica. En `<template slot>` se agrega el
  `"encabezado"` y el `"pie"`, y adentro de cada uno, lo que se necesite que aparezca en cada una de estas secciones.

Entonces el HTML estará estructurado de la siguiente manera:

```HTML
<template>
  <DaiLineas
          ref="lineas2"
          :conversionTemporal="conversionTemporal"
          :datos="datos"
          :linea_id="'lineas2'"
          :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
          :nombre_columna_horizontal="'fecha'"
          :tipo_tooltip="'individual'"
          :titulo_eje_x="'Eje horizontal (temporal)'"
          :titulo_eje_y="'Eje vertical (numérico)'"
          :variables="edos_seleccionados"
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
  </DaiLineas>
</template>
```
El gráfico resultante es el siguiente, en el cual se empleo una tipografía distinta en los `slots` para
hacer énfasis en su adición a la visualización.

<series-tiempo-slots-tooltip/>

### Modificando datos