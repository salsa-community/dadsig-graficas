<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa :permitir-colapso="false">
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_poligonos"
                titulo="Estados, poligonos"
                :url="$withBase('/sample-edos.geojson')"
                :estilo-capa="{
                    fill:{color:'#a0a0f7'},
                    stroke:{ color: 'black'}
                }"
                />
                <dai-capa-geojson 
                id="estados_centroides"
                titulo="Estados, centroides"
                :url="$withBase('/centroides-estados.geojson')"
                :estilo-capa="{
                    circle:{
                        fill:{color:'red'},
                        stroke:{color:'green',width:3},
                        radius:7}
                    }"
                />
                
            </dai-mapa>
            <template v-slot:header>
                <dai-leyenda-mapa
                titulo="Capas con estilo simple"
                :para="['estados_poligonos','estados_centroides']"
                />
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

