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
                :url="$withBase('/sample-edos.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cortes-naturales',
                    columna : 'pob18ymas',
                    propiedadObjetivo: 'relleno',
                    clases:5,
                    colores:'OrRd'
                }"
                />
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>