<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3 v-width-control="'100%'" >Control de leyenda</h3> 
                <dai-leyenda-mapa
                titulo="Este es el titulo de la leyenda"
                :para="['estados','estados2','estados3','corredores']"
                :mostrar-boton-alterna-todos="true"
                :tamanosDeMapa="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-geojson 
                id="estados" 
                :url="$withBase('/sample-edos.geojson')"
                :visible="false"
                />
                <dai-capa-geojson 
                id="estados2" 
                titulo="Estados con titulo"
                :url="$withBase('/centroides-estados.geojson')"
                
                />
                <dai-capa-geojson 
                id="estados3" 
                :url="$withBase('/centroides-estados.geojson')"
                :estilo-capa="{icon:{src:$withBase('/aves.svg')}}"
                :visible="false"
                tipoGeometria="Point"
                />
                <dai-capa-geojson 
                id="corredores" 
                url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion%3Acorredores&bbox=-117.1227035522461%2C14.684399604797363%2C-86.80320739746094%2C32.595672607421875&width=768&height=453&srs=EPSG%3A4326&styles=&format=geojson"
                :visible="false"
                :estilo-capa="{
                    stroke:{color:'red',width:2}
                }"
                tipoGeometria="LineString"
                />
            </dai-mapa>

            
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>