<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <dai-leyenda-mapa
                :para="['estados2']"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados2" 
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cuantiles',
                    columna : 'estados_pob18ymas',
                    propiedadObjetivo: 'proporcion',
                    clases:4,
                    proporciones:[4,8,12,16]
                }"
                />
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>