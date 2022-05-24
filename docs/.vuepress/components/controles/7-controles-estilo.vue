<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa :colapsada="false" altura-colapsada="70vh">
            <template v-slot:header>
                <dai-selector-mapa class="control-large" v-width-control="'100%'">
                    <option value="o">Titulo de visualizacion dropdown</option>
                </dai-selector-mapa>
                <p v-width-control="'100%'">Lorem ipsum dolor, sit amet consectetur adipisicing elit. A sapiente repellat ea iusto ab, esse autem placeat mollitia sint natus labore cupiditate ipsum perspiciatis, reiciendis ad, aspernatur omnis facere aliquam!</p>

                <dai-selector-mapa  v-width-control="'60%'">
                    <option value="o">Selector</option>
                </dai-selector-mapa>

                <dai-interruptor-mapa :opciones="['Switch 1','Switch2']" v-width-control="'40%'" />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-geojson 
                id="estados" 
                :url="$withBase('/sample-edos.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cuantiles',
                    columna:'pob18ymas',
                    colores:'GnBu',
                    clases:4
                }"
                />

                <dai-capa-geojson 
                id="estados_centroides"
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="[
                    {
                        clasificacion:'categorias',
                        columna : 'estados_grado_marg',
                        acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
                        propiedadObjetivo: 'relleno',
                        colores:'Reds'
                    },
                    {
                        clasificacion:'cuantiles',
                        columna:'estados_pob18ymas_rural',
                        propiedadObjetivo:'proporcion',
                        proporciones:[5,8,12,15,20],
                        clases:5,
                        tituloVariable:'Cantidad de problación'
                    }
                ]"
                />
                <dai-capa-geojson 
                id="puntos_simple"
                titulo="Titulo para puntos simples 1"
                :url="$withBase('/centroides-estados.geojson')"
                :estilo-capa="{circle:{fill:{color:'orange'},radius:4}}"
                />
                <dai-capa-geojson 
                id="puntos_simple2"
                titulo="Titulo para puntos simples 2"
                :url="$withBase('/centroides-estados.geojson')"
                :estilo-capa="{circle:{fill:{color:'black'},radius:2}}"
                />

                <dai-info-mapa>
                    <h4>Valores totales seleccionados</h4>
                    <p>Variable 1: 100,000,000,000<br>Variable 2: 100,000,000,000</p>
                </dai-info-mapa>
            </dai-mapa>
            <template v-slot:footer>
                <dai-leyenda-mapa  
                titulo="Titulo de la leyenda 1" 
                para="estados" 
                :mostrar-boton-alterna-todos="true" 
                v-width-control="'100%'" />
                <!--Para poner dentro del titulo del control de opacidad el porcentaje-->
                <dai-opacidad-mapa 
                capa-id="estados" 
                v-width-control="'100%'" 
                :value.sync="opacidad_capa" 
                :titulo="`Opacidad ${(opacidad_capa*100).toLocaleString('en-US')}%`"/>
                <hr class="dai-map-separator ">
                    
                <dai-leyenda-mapa  
                titulo="Titulo de la leyenda 2" 
                para="estados_centroides" 
                :mostrar-boton-alterna-todos="true" 
                v-width-control="'100%'" />
                <hr class="dai-map-separator ">
                <dai-leyenda-mapa 
                :para="['puntos_simple','puntos_simple2']" 
                titulo="Titulo de la leyenda 3" 
                :mostrar-boton-alterna-todos="true"
                />
                <hr class="dai-map-separator thick">
                <div class="dai-map-notes">
                    <h4>Notas</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, voluptates non esse accusamus eius unde obcaecati explicabo tenetur</p>
                    <hr class="dai-map-separator thin">
                    <p>
                        <strong>Fuente</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, 
                    </p>
                    <p>
                        <strong>Marco Geoestadistico</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, 
                    </p>
                </div>
                <hr class="dai-map-separator thick">
                    
                <button class="dai-map-button download">Descargar datos </button>
            </template>
        </dai-tarjeta-contenedor-mapa>
        
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            opacidad_capa:1
        }
    }
}
</script>