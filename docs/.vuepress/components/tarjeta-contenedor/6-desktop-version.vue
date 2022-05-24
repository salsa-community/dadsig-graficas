<template>
    <div class="another-map2">
        <dai-tarjeta-contenedor-mapa 
        :colapsada="false" 
        :es-version-escritorio-en-pantalla-larga="true"
        >
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
                    <p><strong>Valores totales seleccionados</strong></p>
                    <p>Variable 1: 100,000,000,000<br>Variable 2: 100,000,000,000</p>
                </dai-info-mapa>
            </dai-mapa>
            <template v-slot:footer>
                <dai-leyenda-mapa  
                titulo="Titulo de la leyenda 1" 
                para="estados" 
                :mostrar-boton-alterna-todos="true" 
                v-width-control="'100%'" />
                <dai-opacidad-mapa capa-id="estados" v-width-control="'100%'" />
                <hr class="dai-map-separator ">
                    
                
                <dai-leyenda-mapa 
                :para="['puntos_simple','puntos_simple2']" 
                titulo="Titulo de la leyenda 3" 
                :mostrar-boton-alterna-todos="true"
                />
                <hr class="dai-map-separator thick">
                
                
                    
                <button class="dai-map-button download">Descargar datos </button>
            </template>
        </dai-tarjeta-contenedor-mapa>
        
    </div>
</template>


<style >
@media (min-width: 959px){
    .another-map2{
    position: relative;
    width: 100%;
    height: 800px;
    }

    .another-map2 .card-map-container{
        position: absolute;
        width: calc(100vw  - 5rem);
        left: calc((100% - (100vw - 5rem)) / 2)
    }
}

</style>