# Diagramas de procesos

A continuación se describe la utilización del componente de visualización `<DadsigDiagramaProcesos/>` para construir un
gráfico de diagrama de procesos

## Parámetros

El diagrama se encuentra en desarrollo, y actualmente la única propiedad que acepta es `:datos`. La estructura jerarquica para un diagrama de procesos se define como sigue:
1. **Proceso**: Es el nivel más alto en el diagrama que puede englobar varias etapas
2. **Etapas**: Es el segundo nivel jerárquico, se ordenan de forma cardinal y son únicas
3. **Pasos**: inegran a las etapas, puede haber más de un paso por etapa
4. **Detalles**: Información adicional de los pasos


### Obligatorios

* `datos` (_Array_) Base de datos como arreglo de objetos con estructura jerárquica. A continuación se escribe un ejemplo de un procesos con una etapa y un paso, que muestra la estructura y las claves que la base datos debe tener.

```json
[{
  "orden": 1,
  "nombre-proceso": "Planeación",
  "color": "#262699",
  "etapas": [{
    "orden": 1,
    "nombre-etapa": "",
    "pasos": [{
      "orden": 1,
      "nombre-paso": "1",
      "estado": "finalizado",
      "detalles": [{
          "orden": 1,
          "tipo": "html",
          "clase": "titulo-principal",
          "contenido": "Planeación de convocatoria"
        },
        {
          "orden": 2,
          "tipo": "html",
          "clase": "texto-nota",
          "contenido": "<span class='icono'></span> Finalizada"
        },
        {
          "orden": 3,
          "tipo": "html",
          "clase": "",
          "contenido": "<b>123</b> Convocatorias"
        },
        {
          "orden": 4,
          "tipo": "etiquetas",
          "clase": "",
          "titulo": "Responsables",
          "etiquetas": [{
              "clase": "etiqueta-st",
              "nombre-corto": "ST",
              "nombre-largo": "Secretaría Técnica"
            },
            {
              "clase": "etiqueta-sa",
              "nombre-corto": "SA",
              "nombre-largo": "Secretaría Administrativa"
            },
            {
              "clase": "etiqueta-crip",
              "nombre-corto": "CRIP",
              "nombre-largo": "Coordinación de Repositorios, Información y Prospectiva"
            }
          ]
        },
        {
          "orden": 5,
          "tipo": "modal",
          "contenido": "<div><h3>Hola</h3><p>Pues aquí se podría en teoria meter lo que sea y se insertará en un modalsito en html</p></div>"
        }
      ]
    }]
  }]
}]
```


## Ejemplos de uso
En esta sección se visualizan algunos casos de uso


### Basico lineal
Ejemplo básico que consiste en procesos lineales, con sólo un paso por etapa, sin bifurcaciones

```html
<template>
  <div>
    <DadsigDiagramaProcesos
        :datos="datos"
    />
  </div>
</template>
```

Siendo este el resultado,

<diagrama-procesos-basico/>
