<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>
                <div>
                    <p>Da lick en el boton para alternar la textura</p>
                    <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                        {{usarTexturas?'quitar texturas':'poner texturas'}}
                    </button>
                </div>
                <dai-leyenda-mapa
                :para="['estados_tamanos']"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-xyz/>
                <dai-capa-geojson 
                id="estados_tamanos" 
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="[
                    {
                        clasificacion:'cuantiles',
                        columna:'estados_pob18ymas_rural',
                        propiedadObjetivo:'proporcion',
                        proporciones:[5,8,12,15],
                        clases:4,
                        tituloVariable:'Cantidad de problación'
                    }
                ]"
                :estilo-capa="{
                    circle:{
                        stroke:{color:usarTexturas?'black':'white',width:1},
                        radius:1,
                        fill:{color:'#4285f4'},
                    }
                }"
                :usar-texturas-en-relleno="usarTexturas"
                />
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            usarTexturas:true
        }
    }
}
</script>