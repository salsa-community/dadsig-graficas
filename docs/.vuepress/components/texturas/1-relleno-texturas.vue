<template>
    <div class="another-map">
        
        <dai-tarjeta-contenedor-mapa
        :permitir-colapso="false"
        >
            <template #footer>
                <div>
                    <p>Da click para alternar la textura</p>
                    <button @click="usarTexturas=!usarTexturas" class="dai-map-button">alternar textura</button>
                </div>
                
                <dai-leyenda-mapa :para="['estados2','estados_c']" />

            </template>
            <dai-mapa
                :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
                >
                    <dai-capa-xyz/>
                    <dai-capa-geojson 
                    id="estados2"
                    :url="$withBase('/sample-edos.geojson')"
                    :usar-texturas-en-relleno="usarTexturas"
                    :estilo-capa="{
                        fill:{color:'orange'},
                        stroke:{color:'gray',width:1}
                    }"
                    :estiloTexturaRelleno="{
                        color:'orange',
                        pattern:'brick',
                        
                    }"
                    />
                    <dai-capa-geojson 
                    id="estados_c" 
                    titulo="centroides"
                    :url="$withBase('/centroides-estados.geojson')"
                    
                    :estilo-capa="{
                        circle:{
                            radius:12,
                            fill:{color:'blue'},
                            stroke:{color:usarTexturas?'black':'gray',width:1},
                        },
                    }"
                    :usar-texturas-en-relleno="usarTexturas"
                    :estiloTexturaRelleno="{
                        color:'blue',
                        pattern:'hatch',
                        scale:.5,
                        angle:45,
                        fill:{color:'gray'}
                    }"
                    />
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data: function (){
        return {
            usarTexturas:true,
            
        }
    },
    
}
</script>