<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3 v-width-control="'100%'" >Control de leyenda</h3> 
                <dai-leyenda-mapa
                titulo="Este es el titulo de la leyenda"
                :para="['estados','estados2','estados3','corredores']"
                :mostrar-boton-alterna-todos="true"
                estilo-boton-alterna-todos="checkbox"
                :tamanosDeMapa="true"
                :colapsable="true"
                :mostrar-boton-info="true"
                :contenido-info="['<p>Del griego <em>phaios</em>, oscuro, y del ruso<em>phaios</em> <em>zemlja</em>, tierra.</p><p>Suelos con capas orgánicas de espesor mayor a 10 cm y presentan una concentración mayor al 18% de carbono orgánico. Son suelos de alto valor ecológico debido a sus propiedades de absorción de humedad.</p><p>El encalado y el drenaje combinados son prácticas que aumentan la disponibilidad de nutrientes y carbono orgánico, así como disminuyen la toxicidad por aluminio en el suelo. Los Gleysoles son aprovechados en México como pastizales cultivados y por su extensión constituyen una fuente importante de carbono especialmente en la vegetación de tular, manglar y popal.</p>', '<p>tooltip Estados con título</p>', '<strong>tooltip estados3</strong>', '<em>tooltip corredores</em>']"
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
                :visible="false"
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