<template>
    <div class="another-map">
        <DaiTarjetaContenedorMapa>
            <DaiMapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <DaiCapaXyz />
                <!--Un popup-->
                <DaiCapaGeojson 
                contenido-popup="hola soy un popup<br>con algo mas de texto"
                :url="$withBase('/sample-edos.geojson')"
                :zoom-al-dar-click="false"
                />
                
            </DaiMapa>
        </DaiTarjetaContenedorMapa>
    </div>
</template>