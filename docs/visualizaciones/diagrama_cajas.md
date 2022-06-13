# Diagrama de cajas

<diagrama-cajas-ejemplo-basico/>

Esta sección contiene la descripción del componente reutilizable de vue para hacer una gráfica de cajas 
y bigotes (box plot).

A continuación se especifica la lista de propiedades que admite el componente.

## Parámetros

La siguiente es una lista de propiedades que admite el componente.

### Obligatorios

* `caja_id`: (_String_) Identificador básico del componente, sin espacios ni caracteres especiales.
* `datos`: (_Array_) Base de datos donde cada objeto del arreglo corresponde a una variable categórica con su 
correspondiente métrica. La variable categórica se grafica en el eje horizontal del plano, mientras que 
la métrica correspondiente se agrupa dentro de los límites de los cuartiles _extremo superior_, _cuartil superior_, 
_mediana_, _cuartil inferior_, _extremo inferior_ o bien fuera de los límites de los cuartiles, siendo entonces un 
punto/dato _atípico_ o _único_ (_outlier_).

En el siguiente ejemplo, se muestra un conjunto de datos donde cada arreglo corresponde a las acciones vendidas por 
cierta empresa, de tal manera que la variable categórica será el nombre de la empresa, `nombre_empresa` y la métrica
sera el número de acciones vendidas, `acciones_vendidas`:

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

* `titulo_eje_x`: (_String_) Titulo para el eje horizontal.
* `titulo_eje_y`: (_String_) Titulo para el eje vertical.

### Opcionales

Los siguiente parámetros se pueden usar para modificar la visualización.

* `ancho_tooltip` : (_Number_) Ancho de tooltip, por defecto usa 195.
* `margen` : (_Object_) Objeto que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 20, abajo: 40, izquierda: 40, derecha: 20}`.
* `alto_vis` : (_Number_) Altura del svg, 200 por defecto.
* `tooltip_activo`: (_Boolean_) `true` por default, muestra el tooltip. Si es `false`, entonces no mostrará tooltip.
* `textoTooltip`: (_Function_) Función que debe regresar el texto que queremos en el tooltip.