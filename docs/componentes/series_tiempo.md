# Series de tiempo

<series-tiempo-ejemplo-basico/>

Esta sección contiene la descripción del componente reutilizable de vue para hacer una gráfica de series de tiempo.

## Parámetros

La siguiente es una lista de propiedades que admite el componente.

### Obligatorios

* `linea_id`: (_String_) Identificador único del componente.
  * `datos`: (_Array_) Base de datos como arreglo de objetos, en donde cada elemento debe tener el valor de la métrica o 
  métricas de cada línea a graficar y su correspondiente valor temporal. En el siguiente conjunto de datos de ejemplo, 
  se dan métricas como claves numéricas y la fecha correspondiente a cada una.

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

* `nombre_columna_horizontal`: (_String_) Es el nombre que lleva la variable que va a usarse en el eje horizontal.
  Normalmente es temporal y en el ejemplo anterior sería "fecha".
  * `variables_categorias`: (_Array_) Lista de diccionarios que contiene atributos de cada una de las líneas. Las claves
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

* `escala_logaritmica`: (_Boolean_) `falso` por default. Si es `true`, cambia la escala vertical a logarítmica.
* `tooltip_activo`: (_Boolean_) Indica si queremos activar un tooltip. Es verdadero por default.
* `tipo_tooltip`: (_String_) Cadena de caracteres que indica el tipo de tooltip. Por default es `"general"` y 
muestra todos los datos.
* `ancho_tooltip` : (_Number_) Número que indica el ancho del tooltip, por defecto usa 180.
* `alto_vis` :  (Number) Número que indica la altura del svg, tiene valor de 300 por default.
* `margen` : (_Object_) Diccionario que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 10, abajo: 70, izquierda: 20, derecha: 30}`.
* `titulo_eje_y`: (_String_) Etiqueta del eje vertical.
* `titulo_eje_x`: (_String_) Etiqueta del eje horizontal.
* `conversionTemporal`: (_Function_) Función que por default es `d3.timeParse("%d-%m-%Y")` sirve para especificar el
  formato de la variable temporal.
* `textoTooltip`: (_Function_)Esta función se usa para modificar el texto que aparece en los tooltips.