<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>
                <p>Hay 3 capas, alterna sus propiedades: </p>
                <p>
                    <strong>Capa base estilo dark </strong>
                    <button @click="capa_dark_visible = !capa_dark_visible" 
                    class="dai-map-button">
                        prender / apagar
                    </button>
                    visible= {{capa_dark_visible}}
                    <button class="dai-map-button"
                    @click="capa_dark_opacidad = capa_dark_opacidad==1?0:capa_dark_opacidad +.2">
                        opacidad +20%
                    </button>
                    opacidad= {{capa_dark_opacidad}},
                    z-index= 3
                </p>

                <p>
                    <strong>Capa estados</strong>
                    <button class="dai-map-button"
                    @click="capa_estados_zindex = 4">
                        enviar al frente
                    </button>
                    <button class="dai-map-button"
                    @click="capa_estados_zindex = 1">
                        enviar hasta atras
                    </button>
                    z-index= {{capa_estados_zindex}}
                </p>

                <p>
                    <strong>Capa OSM</strong>
                    <button class="dai-map-button"
                    @click="capa_osm_visible=!capa_osm_visible">
                        prender / apagar
                    </button>
                    visible= {{capa_osm_visible}},
                    z-index= 2
                </p>
                
            </template>
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-xyz 
                id="capa_dark"
                :visible="capa_dark_visible"
                :opacidad="capa_dark_opacidad"
                :z-index="3" 
                url="https://{a-c}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png" 
                />
            
                <dai-capa-geojson 
                id="capa_estados"
                :z-index="capa_estados_zindex"
                :url="$withBase('/sample-edos.geojson')"
                />

                <dai-capa-xyz-osm 
                id="capa_osm" 
                :visible="capa_osm_visible"
                :z-index="2"
                />
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            capa_dark_visible:true,
            capa_dark_opacidad: .2,
            capa_estados_zindex: 1,
            capa_osm_visible: false
        }
    }
}
</script>