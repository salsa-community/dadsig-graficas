<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <dai-leyenda-mapa
                :para="['estados_c']"
                :mostrar-boton-alterna-todos="true"
                />
                <button @click="usarTexturas=!usarTexturas">alternar textura</button>
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_c" 
                titulo="Estados con titulo"
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cuantiles',
                    columna : 'estados_pob18ymas_urbano',
                    acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
                    propiedadObjetivo: 'relleno',
                    colores:'Reds'
                }"
                :estilo-capa="{
                    circle:{
                        radius:10
                    }
                }"
                :usar-texturas-en-relleno="usarTexturas"
                :estiloTexturaRelleno="{
                    color:'red',
                    pattern:'cross',
                    scale:.5,
                    fill:{color:'yellow'}
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