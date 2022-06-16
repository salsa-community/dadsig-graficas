# Barras verticales

A continuación se describe la utilización del componente de visualización `<DadsigBarras/>` para construir un gráfico de
barras verticales.

## Parámetros

Se puede considerar este un caso particular de la visualización  de barras verticales apiladas, por 
lo tanto los parámetros obligatorios y opcionales descritos en la sección _Barras verticales apiladas_ serán los mismos 
que se deben de especificar para esta visualización y por lo tanto ya no se repetirán aquí.

## Ejemplo de uso

Cuando los datos introducidos sólo describen una variable categorica y una variable numérica (métrica),
el componente de visualizacion `<DadsigBarras/>` construirá una gráfica de barras verticales simples.

Por ejemplo, teniendo el siguientee arreglo para `datos`,

```
[
{categoria: 'Variable A', cantidad: 120},
{categoria: 'Variable B ', cantidad: 150}
{categoria: 'Variable C ', cantidad: 72}
]
```

y el arreglo `variables` como sigue,

```
[
  {id: 'cantidad', nombre_colores: 'cantidad', color: '#7fcdbb'},
]
``` 

Entonces se usa el componente `<DadsigBarras/>` de la siguiente manera.

```HTML
<template>
  <div>
    <DadsigBarras
        :barras_id="'verticales_simples'"
        :datos="[{categoria: 'Variable A', cantidad: 120},
                 {categoria: 'Variable B', cantidad: 150},
                 {categoria: 'Variable C', cantidad: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        :tooltip_activo="true"
        :variables="[{id:'cantidad', nombre_colores:'cantidad', color: '#7fcdbb'}]"/>
  </div>
</template>
```

Lo que producirá el siguiente gráfico de barras verticales simples,

<barras-verticales-simples/>