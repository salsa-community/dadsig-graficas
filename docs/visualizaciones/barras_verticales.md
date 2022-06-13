# Barras verticales

Esta gráfica es un caso particular del componente de barras apiladas. Cuando los datos introducidos sólo describen una
categoría y una métrica, el componente construirá una gráfica de barras simples.

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

ingresados de la manera anterior, produciran en siguiente gráfico de barras simples,

<barras-verticales-simples/>