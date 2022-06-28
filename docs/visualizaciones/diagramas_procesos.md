# Diagramas de procesos

A continuación se describe la utilización del componente de visualización `<DadsigDiagramaProcesos/>` para construir un
gráfico de diagrama de procesos

## Parámetros

La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.

### Obligatorios

* `datos` (_Array_) Base de datos como arreglo de objetos

    ```json
      {
      "id": "1",
      "nombre": "Planeación",
      "secciones": [
        {
          "id": "s1",
          "nombre": "1",
          "subsecciones": [
            {
              "id": "s1ss1",
              "nombre": "Planeación de Convocatoria",
              "estatus": "Finalizada",
              "descripcion": "1 Convocatoria",
              "responsables": [
                {
                  "id": "ST",
                  "nombre": "Secretaría Técnica"
                },
                {
                  "id": "SA",
                  "nombre": "Secretaría Administrativa"
                },
                {
                  "id": "CRIP",
                  "nombre": "CRIP"
                }
              ],
              "info": "aqui va lo que nadie sabe que puede haber"
            }
          ]
        }
      ]
    },
    ```


## Ejemplos de uso



### Basico en línea


```html
<template>
  <div>
    
  </div>
</template>
```

Siendo este el resultado,

<diagrama-procesos-basico/>
