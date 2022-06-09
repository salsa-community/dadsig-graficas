
# DaiDiagramaCajas

En esta sección se detallan tres distintos casos de uso de este componente. Dado que el diagrama de cajas y bigotes requiere 
que los datos se encuentren completamente desagregados, se recomienda agregar los mismos por medio de un archivo `.json`
externo. Lo anterior se hace por medio de un `import` en el apartado `<script/>`. En el siguiente extracto
de código se agrega el archivo `diagramacajas_ejemplo_1.json` que grafica el número de acciones vendidas
por diversas empresas.

```HTML
<script>
    import diagramacajasejemplo from "./diagramacajas_ejemplo_1.json"

    export default {
        name: 'diagramacajas_ejemplo_basico',
        data: function () {
            return {
                datos: diagramacajasejemplo,
            }
        },
    }
</script>
```
En el caso contrario en el que se quieran agregar los datos directamente como un arreglo en el
template del componente, éstos se deberán de colocar de la siguiente manera (nótese que aquí se
abrevia el conjunto de datos usando "..."),

```HTML 
<DaiDiagramaCajas
        ref="cajas_basica"
        :caja_id="'diagramacajas_basica'"
        :datos=[
                {
                    "nombre_empresa": "Empresa A",
                    "acciones_vendidas": 180
                },
                {
                    "nombre_empresa": "Empresa B",
                    "acciones_vendidas": 178
                },
                .
                .
                .,
                {
                    "nombre_empresa": "Empresa C",
                    "acciones_vendidas": 120
                }
             ]
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#000'}"
        :tooltip_activo="false"
/>
```

## Gráfica estática
Se ingresa un _Array_ de datos con tantos objetos como datos desagregados se tengan. Cada objeto contendrá el nombre de 
la variable categórica (a graficar en el eje horizontal) y el nombre y valor de su correspondiente métrica (a agruparse o 
no dentro de los límites de los cuartiles dependiendo del valor de la métrica).

En este ejemplo, el componente se escribe de la siguiente manera

```HTML 
    <DaiDiagramaCajas
        ref="cajas_basica"
        :caja_id="'diagramacajas_basica'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :tooltip_activo="false"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#000'}"
    />
```

En este caso, no es necesario agregar elementos en el apartado `<style/>` pues este componente 
ya incluye todo dentro del template y el script. El resultado es el siguiente,

<diagrama-cajas-ejemplo-basico/>

## Uso de slots y tooltip

El siguiente ejemplo muestra la manera en la cual se pueden insertar encabezados y pies de gráficas para poner títulos, notas, controles, nomenclaturas, etc. dentro del componente.

```HTML
    <DaiDiagramaCajas
        ref="cajas_slots"
        :caja_id="'diagramacajas_slots'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :variables="{'grupos':'nombre_empresa',
                     'variable_dist':'acciones_vendidas',
                     'color':'#00f'}"
    >
    <template slot="encabezado">
        <div>
            <h3>Título slots</h3>
            <p>
                Tanto el título que aparece arriba, como este texto, se integran
                como slot. Se puede estilizar segun las necesidades con un poco de
                CSS o, en su momento, importando el sistema de diseño
            </p>
        </div>
    </template>
    <template slot="pie">
        <div>
            <h3>Pie de gráfica</h3>
            <p>
                Este otro bloque corresponde al slot de pie de gráfica, en donde
                usualmente se ponen nomenclaturas, notas o controles, y también
                puede modificarse con CSS según las necesidades.
            </p>
        </div>
    </template>
    </DaiDiagramaCajas>
```

Y el gráfico resultante es el siguiente, observe que si no se especifica la propiedad de `:tooltip_activo="false"`, 
por default ya se puede ver un tooltip.

<diagrama-cajas-ejemplo-slots-tooltip/>

## Modificando datos

El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega un poco de estilo y algunos métodos para 
modificar los datos que se están pintando. Las bases se cargan desde archivos `.json` externos. 

```HTML
    <DaiDiagramaCajas
        ref="cajas_cambio_base"
        :caja_id="'diagramacajas_cambio_base'"
        :datos="datos"
        :titulo_eje_x="titulos_eje_x"
        :titulo_eje_y="titulos_eje_y"
        :variables="variables"
    >
    <template slot="encabezado">
        <div class="encabezado">
            <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
            <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
    </template>
    <template slot="pie">
        <div class="pie">
            <h3>Pie de gráfica</h3>
            <button @click="alternandoBase">Cambia la data</button>
        </div>
    </template>
</DaiDiagramaCajas>
```

En el `</script>` se agregan las bases y las funciones necesarias para alternar entre una y otra, mientras que en el 
apartado de `</sytyle>` se customizan propiedades como el marco de la gráfica, radio del contenedor, etc.

``` Javascript
<script>
import diagramacajas_ejemplo1 from "./diagramacajas_ejemplo_1.json"
import diagramacajas_ejemplo2 from "./diagramacajas_ejemplo_2.json"

export default {
  name: 'diagramacajas_cambio_base',

  data: function () {
    return {
      datos: diagramacajasejemplo1,
      variables: {'grupos': 'nombre_empresa', 
                  'variable_dist': 'acciones_vendidas',
                  'color': '#f00'},
      titulos_eje_x: 'Empresas',
      titulos_eje_y: 'Acciones vendidas',
      base_seleccionada: 1,
    }
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = diagramacajasejemplo2;
        this.variables = {'grupos': 'nombre_categoria',
                          'variable_dist': 'metrica',
                          'color': '#800'};
        this.titulos_eje_x = 'Categorías';
        this.titulos_eje_y = 'Métrica';
      } else {
        this.base_seleccionada = 1;
        this.datos = diagramacajasejemplo1;
        this.variables = {'grupos': 'nombre_empresa',
                          'variable_dist': 'acciones_vendidas',
                          'color': '#800080'};
        this.titulos_eje_x = 'Empresas';
        this.titulos_eje_y = 'Acciones vendidas';
      }
    },
  },
};
</script>
```

El resultado es el siguiente:

<diagrama-cajas-ejemplo-cambiando-base/>




