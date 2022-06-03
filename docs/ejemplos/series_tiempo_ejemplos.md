
# DaiSeriesTiempo

En esta secciónse detallan tres diferentes tipos casos de uso de este componente. El componente Series Tiempo, requiere que los datos se encuentren en un archivo `.json` externo, que se importa por medio de un `import`en el apartado `<script/>`. Para los diferentes ejemplos de esta sección, ya tenemos nuestros datos importados. 

## Gráfica estática
Dentro de nuestra gráfica estática, podemos observar que tenemos incluídas las propiedades obligatorias que ya mencionamos en la descripción de nuestro componente. Ya que el tooltip es una propiedad por default, para lograr esta gráfica estática lo que debemos hacer es agregar la propiedad de `:tooltip_activo= "false"`para lograr desaparecerlo en nuestra visualización. Nuestro `<template>`entonces, queda estructurado de la siguiente manera: 
```HTML

<DaiLineas
     :linea_id="'lineas1'" 
      ref="lineas1"
      :datos="datos"
      :nombre_clumna_horizontal="'fecha'"
      :variables_categorias="edos_seleccionados"
      :conversionTemporal="conversionTemporal"
      :titulo_eje_y="'Titulo eje y'"
	    :titulo_eje_x="'Titulo eje x'"
      :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
      :tooltip_activo ="false"
    />

```
Siendo este el resultado: 

<series-tiempo-ejemplo-basico/>

## Uso de slots y tooltip
Los slots son de mucha utilidad para poder insertar encabezados y pies de página al agregar títulos, notas, controles, nomenclaturas, o cualquier información que nos ayude a entender más las gráficas. Para poder agregar el uso de los slots y el tooltip, lo haremos de la siguiente manera: 
* Tooltip: como podemos observar, ya no es necesario agregar la propiedad de `:tooltip_activo`ya que el tooltip por default ya está agregado al componente. 
* Slots: podemos agregarlos tanto en el título como en el pie de la gráfica. En nuestro `<template slot>` agregamos el `"encabezado"` y el `"pie"`, y adentro de cada uno, lo que necesitemos que aparezca en cada una de estas secciones. 

Entonces nuestro HTML estará estructurado de la siguiente manera: 

```HTML
<DaiLineas
      :linea_id="'lineas2'" 
      ref="lineas2"
      :datos="datos"
      :nombre_clumna_horizontal="'fecha'"
      :variables_categorias="edos_seleccionados"
      :conversionTemporal="conversionTemporal"
      :titulo_eje_y="'Titulo eje y'"
	  :titulo_eje_x="'Titulo eje x'"
      :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
    >
    <template slot="encabezado">
		<div class="encabezado">
			<h3 class="titulo-visualizacion">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
			<p class="fecha-actualizacion" ><b>Fecha de actualizacion: </b> 00/00/2022</p>
			<p class="instruccional">Tanto el título que aparece arriba, como este texto, se integran
            como slot. Se puede estilizar segun las necesidades con un poco de
            CSS o, en su momento, importando el sistema de diseño</p>
		</div>
	</template>
  <template slot="pie">
        <div class= "pie">
            <h3>Pie de gráfica</h3>
            <p>Tanto el título que aparece arriba, como este texto, se integran
            como slot. Se puede estilizar segun las necesidades con un poco de
            CSS o, en su momento, importando el sistema de diseño</p>
        </div>
    </template>  
</DaiLineas>

```
Siendo este el resultado:
<series-tiempo-ejemplo-slots-tooltip/>

## Modificando datos
El siguiente ejemplo incluye lo que se ha visto en los anteriores, se agrega un poco de estilo y algunos métodos para modificar los datos que se están pintando. Las bases se cargan desde archivos .json y se agregó un poco de estilo. Dentro de nuestro slot `<pie>` agregamos un `<button>`con el evento para hacer el cambio de datos. También para darle estilos al botón, dependerá del CSS o de la importación del sistema de diseño.
Tenemos entonces como resultado el siguiente `HTML`:
 ```HTML
 <DaiLineas
      :linea_id="'lineas2'" 
      ref="lineas2"
      :datos="datos"
      :nombre_clumna_horizontal="'fecha'"
      :variables_categorias="edos_seleccionados"
      :conversionTemporal="conversionTemporal"
      :titulo_eje_y="'Titulo eje y'"
	  :titulo_eje_x="'Titulo eje x'"
      :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
    >
    <template slot="encabezado">
	    <div class="encabezado">
		    <h3 class="titulo-visualizacion">Titulo de visualización de una o dos líneas</h3>
		    <p class="fecha-actualizacion" ><b>Fecha de actualizacion: </b> 00/00/2022</p>
		    <p class="instruccional">Texto instruccional Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</div>
	</template>
    <template slot="pie">
        <div class= "pie">
            <p>Pie de gráfica</p>
            <button class="boton-base" @click="cambiaBaseLineas">Cambia la base</button>
        </div>
    </template>    
</DaiLineas>  
```
<series-tiempo-ejemplo-cambiando-base/>