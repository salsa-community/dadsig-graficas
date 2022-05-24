<template>
    <div class="another-map">

            <DaiMapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <DaiCapaXyz />
                <!--Un tooltip con un enlace-->
                <DaiCapaGeojson 
                contenido-tooltip="hola soy un tooltip con un <a href='https://google.com' target='_blank'>enlace</a>"
                :tooltip-estatico="true"
                :tooltip-estatico-margen-superior="2"
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                />
                <!--Un tooltip con un elemento abbr que tiene un title-->
                <DaiCapaGeojson
                :contenido-tooltip="(centroide)=>`un elemento abbr:<br>
                    <abbr title='Grado de marginación :${centroide.estados_grado_marg}'>${centroide.estados_grado_marg}</abbr>`"
                :tooltip-estatico="true"
                :tooltip-estatico-margen-superior="5"
                id="estados_centroides"
                :url="$withBase('/centroides-estados.geojson')"
                :estilo-capa="{circle:{fill:{color:'white'},stroke:{color:'black'},radius:6}}"
                />
            </DaiMapa>
    
    </div>
</template>