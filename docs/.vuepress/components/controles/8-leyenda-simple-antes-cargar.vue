<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template #header>
                <dai-leyenda-mapa para="centroides_1234" :tamanosDeMapa="true" />
            </template>
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-xyz/>
                <dai-capa-geojson 
                id="centroides_1234"
                :url="$withBase('/centroides-estados.geojson')"
                :visible="false"
                :estilo-capa="{
                    circle:{
                        fill:{color:'red'},
                        stroke:{color:'green',width:2},
                        radius:5
                    }
                }"
                tipoGeometria="Point"
                />
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
//import centroides from "../capas/centroides-estados.json"
