
# DaiSeriesTiempo

En esta sección veremos 3 casos de uso distintos de este componente. 

## Gráfica estática

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
<series-tiempo-ejemplo-basico/>

## Uso de slots y tooltip
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
			<p class="instruccional">Texto instruccional Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</div>
	</template>
</DaiLineas>

```
<series-tiempo-ejemplo-slots-tooltip/>

## Modificando datos
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