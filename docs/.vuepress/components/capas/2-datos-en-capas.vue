<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa :permitir-colapso="false">
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                />
                <dai-capa-geojson 
                id="estados_centroides"
                :datos="centroides" 
                :estilo-capa="{circle:{fill:{color:'red'},radius:5}}"
                />
                <dai-capa-wms 
                id="estados_geoserver"
                url="https://geo.crip.conacyt.mx/geoserver/estados_inegi_2019/wms"
                :parametros="{'LAYERS':'estados_inegi_2019'}"
                />
            </dai-mapa>
            <template v-slot:header>
                <dai-leyenda-mapa
                :para="['estados_poligonos','estados_centroides','estados_geoserver']"
                />
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
import centroides from "./centroides-estados.json"
export default {
    data:function(){
        return {
            centroides : centroides
        }
    }
}
</script>