<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template #header>
                <div>
                    <p>Da lick en el boton para alternar la textura</p>
                    <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                        {{usarTexturas?'quitar texturas':'poner texturas'}}
                    </button>
                </div>
                

                <dai-leyenda-mapa para="estados1"  />
            </template>
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-xyz/>
                <dai-capa-geojson 
                id="estados1"
                :url="$withBase('/sample-edos.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cortes-naturales',
                    columna : 'pob18ymas',
                    clases:5,
                }"
                :estilo-capa="{
                    stroke:{color:usarTexturas?'gray':'lightgray',width:1}
                }"
                :usar-texturas-en-relleno="usarTexturas"
                :estiloTexturaRelleno="{
                    color:'#2171b5',
                    pattern:'hatch',
                    angle:90,
                    
                }"
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