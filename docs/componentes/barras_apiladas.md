# Barras apiladas

A continuación se describe la utilización del componente e barras apiladas para construir un gráfico de este tipo.

La siguiente es una lista de propiedades que admite el componente 

`<dai-barras-apiladas/>` / `<DaiBarrasApiladas/>`:
## Obligatorios 

* `barras_apiladas_id`: (_String_) Identificador básico del componente, sin espacios ni caracteres especiales.
* `datos`: (_Array_) Base de datos, lista de objetos en donde cada objeto corresponde a una barra. Se debe 
especificar el nombre de la barra y los valores de sus subcategorías/colores, por ejemplo: 

```
[
  {nombre_entidad: 'Yucatán', cantidad_1: 120, cantidad_2: 30}, 
  {nombre_entidad: 'Puebla ', cantidad_1: 100, cantidad_2: 50}
]
```

* `variables`:  (_Array_) Arreglo de objetos, en donde cada uno contiene información de las subcategorías/colores 
incluidos en la base de datos. Por ejemplo: 
```
[
  {id: 'cantidad_1', nombre_colores: 'cantidad 1', color: 'yellow'},
  {id: 'cantidad_2', nombre_colores: 'cantidad 2', color: 'magenta'}
]
``` 
>> Con este parámetro se puede controlar cuantas subcategorías se quieran visualizar. , por ejemplo, si la base de datos tiene valores para `categoria_1`, `categoria_2` y `categoria_3`, pero en variables solo se especifican dos objetos para `categoria_2` y `categoria_3`, entonces la gráfica mostrará sólo estos últimos dos colores. `id` se refiere al nombre del identificador que se está usando en la base de datos, `nombre_colores` es una clave que puede cambiar y se debe especificar el nombre de dicha clave en uno de los parámetros de abajo, pero se refiere al texto que quiere que aparezca para el cliente, ya sea en tooltips o en nomenclatura, por ejemplo, y `color` es el color que se quiere que tenga cada subcategoría.
* `nombre_color`: (_String_) Debe tener el mismo valor que se está usando en los objetos de `variables` para referirse al texto que se quiere que aparezca para el cliente. Es decir, si `variables`  fuera `[{"id":"cantidad_1", "nombre_subcategoria":"cantidad 1", "color":"yellow"}, {"id": "cantidad_2","nombre_subcategoria": "cantidad 2", "color":"magenta"}]`, entonces `nombre_color` debe ser igual a `"nombre_subcategoria"`.

* `nombre_barra`: (_String_) Debe tomar el valor que se está usando como clave para referirnos a los nombres de las barras o categorías generales en la base de datos. En este ejemplo, tendría que ser igual a `"nombre_entidad"`

## Opcionales

A continuación se mencionan otros parámetros que se pueden usar para modificar la visualización
* `titulo_eje_x`: (_String_) Titulo para el eje horizontal
* `titulo_eje_y`: (_String_) Titulo para el eje vertical

* `ancho_tooltip` : (_Number_) Ancho de tooltip, por defecto usa 165
* `margen` : (_Object_) que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto es ` {arriba: 20, abajo: 50, izquierda: 60, derecha: 20}`
* `alto_vis` : (_Number_) altura del svg, 195 por defecto
* `tooltip_activo`: (_Boolean_) `true` por default, muestra el tooltip. Si es `false`, entonces no mostrarà tooltip
* `textoTooltip`: (_Function_) que debe regresar el texto que queremos en el tooltip. Para usar los datos de la barra más cercana al cursor, podemos acceder mediante `this.$refs['barras1'].tooltip_data_seleccionada`suponiendo que agreamos a nuestro componente `ref="barras1"`

## Caso particular: Barras Simples

Cuando los datos introducidos sólo describen una categoría y una métrica, el componente construirá una gráfica de 
barras simples.

Por ejemplo el arreglo `datos`,

```
[
{categoria: 'Variable A', metrica: 120},
{categoria: 'Variable B ', metrica: 150}
{categoria: 'Variable C ', metrica: 72}
]
```

y el arreglo `variables`,

```
[
  {id: 'metrica', nombre_colores: 'metrica', color: 'blue'},
]
``` 

<barras-apiladas-ejemplo-simples/>
