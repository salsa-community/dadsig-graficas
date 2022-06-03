# Series de tiempo

Este sección contiene la descripción del componente reutilizable de vue para hacer una gráfica de series de tiempo.

A continuación, se especifíca la lista de propiedades que se admite en el componente `<dai-lineas/>` / `<DaiSeriesDeTiempo/>` 

## Obligatorias

Para tener una grafica de series de tiempo básica, estos son los parámetros que se deben especificar:

* `linea_id`: (_String_) Identificador único del componente.
* `datos`: (_Array_) Base de datos. Array de objetos, en donde cada objeto debe tener al menos las claves de cada línea, por ejemplo claves estatales y su valor. Además debe haber una clave asociada al eje temporal. Por ejemplo
```
[{"01":30,"02":31,"fecha": "01-01-2021"},{"01":35,"02":25,"fecha": "01-02-2021"}]
```
* `nombre_columna_horizontal`: (_String_) Es el nombre que lleva la variable que va a usarse en el eje horizontal. Normalmente es temporal y en el ejemplo anterior sería "fecha"
* `variables_categorias`: (_Array_) Lista de diccionarios que contiene atributos de cada una de las líneas. Las claves obligatorias son `cve` y `nombre`, y se refieren al nombre de la columna o línea en la base de datos y al nombre que queremos que se lea en el tooltip individual
 ```
  [
      {"cve": "01",
        "nombre": "Aguascalientes",
        "abr":"AGS",
        "color":"rgb(33,56,140)",
        "resaltado": false
        },
        "cve": "02",
        "nombre":"Baja California",
        "abr":"BC",
        "color":"rgb(10,25,45)"
        "resaltado": false
    }
  ]
  ```
  ## Opcionales

A continuación se mencionan otros parámetros que se pueden usar para modificar la visualización:

* `escala_logaritmica`: (_Boolean_) `falso` por default. Si es `true`, cambia la escala vertical a logarítmica
* `tooltip_activo`: (_Boolean_) Indica si queremos activar un tooltip. Es verdadero por default
* `tipo_tooltip`: (_String_) que indica el tipo de tooltip. Por default es `"general"` y muestra todos los datos
* `ancho_tooltip` : (_Number_) Número que indicancho de tooltip, por defecto usa 180
* `alto_vis` :  (Number) que indica altura del svg, 300 por default
* `margen` : (_Object_) Diccionario que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto es ` {arriba: 10, abajo: 70, izquierda: 20, derecha: 30}`
* `titulo_eje_y`: (_String_) Etiqueta del eje vertical
* `titulo_eje_x`: (_String_) Etiqueta del eje horizontal
* `conversionTemporal`: (_Function_) Función que por default es `d3.timeParse("%d-%m-%Y")` sirve para especificar el formato temporal de la base 
* `textoTooltip`: (_Function_)Esta función se puede modificar para modificar el texto que aparece en los tooltips