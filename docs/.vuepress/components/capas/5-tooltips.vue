<template>
    <div class="another-map">

            <DaiMapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <DaiCapaXyz />
                <!--Un tooltip con contenido estatico-->
                <DaiCapaGeojson 
                contenidoTooltip="hola soy un tooltip"
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                />
                <!--Un tooltip con contenido dinamico-->
                <DaiCapaGeojson
                :contenidoTooltip="(centroide)=>`Grado de marginación <br><b>${centroide.estados_grado_marg}</b>`"
                id="estados_centroides"
                :url="$withBase('/centroides-estados.geojson')"
                :estilo-capa="{circle:{fill:{color:'white'},stroke:{color:'black'},radius:5}}"
                />
            </DaiMapa>

    </div>
</template>