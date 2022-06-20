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

<donas-slots-tooltip/>


### Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega estilo en el scss para customizar la
gráfica y ciertos métodos para modificar los datos que se grafican por medio de un botón. Las bases se cargan desde
archivos `.json`.

<donas-cambiando-base/>