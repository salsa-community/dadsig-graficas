# Barras apiladas

Este sección contiene la descripción del componente reutilizable de vue para hacer una gráfica de barras apiladas. 

A continuación se especifica la lista de propiedades que se admite el componente `<dai-barras-apiladas/>` / `<DaiBarrasApiladas/>`:
## Obligatorios 

Para tener una grafica de barras apiladas básica, estos son los parámetros que de deben especificar

* `barras_apiladas_id`: Identificador básico del componente, sin espacios ni caracteres especiales
* `datos`: Base de datos, Array de objetos en donde cada objeto corresponde a una barra. Se debe especificar el nombre de la barra y los valores de sus subcategorías/colores, por ejemplo: 

```
[
  {nombre_entidad: 'Yucatán', cantidad_1: 120, cantidad_2: 30}, 
  {nombre_entidad: 'Puebla ', cantidad_1: 100, cantidad_2: 50}
]
```

* `variables`:  Array de objetos, en donde cada objeto contiene información de las subcategorías/colores incluidas en la base de datos. Por ejemplo: 
```
[
  {"id": "cantidad_1", "nombre_colores": "cantidad 1", "color": "yellow"},
  {"id": "cantidad_2", "nombre_colores": "cantidad 2", "color": "magenta"}
]
``` 
>> Con este parámetro podemos controlar cuantas subcategorías queremos visualizar. , por ejemplo, si la base de datos tiene valores para `categoria_1`, `categoria_2` y `categoria_3`, pero en variables solo especificamos dos objetos para `categoria_2` y `categoria_3`, entonces la gráfica mostrará sólo estos últimos dos colores. `id` se refiere al nombre del identificador que estamos usando en la base de datos, `nombre_colores` es una clave que puede cambiar y debemos especificar el nombre de dicha clave en uno de los parámetros de abajo, pero se refiere al texto que queremos que aparezca para el cliente, ya sea en tooltips o en nomenclatura, por ejemplo, y `color` es el color que queremos que tenga cada subcategoría.
* `nombre_color`: Debe tener el mismo valor que estamos usando en  los objetos de `variables` para referirnos al texto que queremos que aparezca para el cliente. Es decir, si `variables`  fuera `[{"id":"cantidad_1", "nombre_subcategoria":"cantidad 1", "color":"yellow"}, {"id": "cantidad_2","nombre_subcategoria": "cantidad 2", "color":"magenta"}]`, entonces `nombre_color` debe ser igual a `"nombre_subcategoria"`

* `nombre_barra`: Debe tomar el valor que estamos usando como clave para referirnos a los nombres de las barras o categorías generales en la base de datos. En este ejemplo, tendría que ser igual a `"nombre_entidad"`

## Opcionales

A continuación se mencionan otros parámetros que se pueden usar para modificar la visualización
* `titulo_eje_x`: (String) Titulo para el eje horizontal
* `titulo_eje_y`: (String) Titulo para el eje vertical

* `ancho_tooltip` : (Number) Ancho de tooltip, por defecto usa 165
* `margen` : (Object) que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto es ` {arriba: 20, abajo: 50, izquierda: 60, derecha: 20}`
* `alto_vis` : (Number) altura del svg, 195 por defecto
* `tooltip_activo`: (Boolean) `true` por default, muestra el tooltip. Si es `false`, entonces no mostrarà tooltip
* `textoTooltip`: (Function) que debe regresar el texto que queremos en el tooltip. Para usar los datos de la barra más cercana al cursor, podemos acceder mediante `this.$refs['barras1'].tooltip_data_seleccionada`suponiendo que agreamos a nuestro componente `ref="barras1"`