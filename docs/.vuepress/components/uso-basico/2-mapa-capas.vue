<template>
    <div class="another-map">
        <dai-mapa :zoom="4" :centro="[-99.1332,19.4326]" >
            <dai-capa-xyz url="https://{a-c}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"/>
            <dai-capa-geojson 
            :opacidad=".5"
            url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson"/>
        </dai-mapa>
    </div>
    
</template>

