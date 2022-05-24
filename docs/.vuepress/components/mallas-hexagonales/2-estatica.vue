<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['normal','hexbin']"/>
        </template>
        <DaiMapa :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
            <DaiCapaXyz />
            <DaiCapaGeojsonHexbin
            id="hexbin"
            titulo="Capa con hexbin"
            :datos="centroides"
            :diametro="2"
            :estilo-capa="{
                textStyle:{text:'-'}
            }"
            :props-asigna-estilo="['textStyle.text']"
            :fn-asigna-estilo="(f)=>[f.features_count+'']"
            :reglas-estilo-capa="{
                columna:'features_count',
                clasificacion:'linear',
                clases:3
            }"
            
            />
            <DaiCapaGeojson 
            id="normal"
            titulo="Capa normal"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            
            />
            
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>

<script>
import centroides from "../capas/centroides-estados.json"
export default {
    data:function(){
        return {
            centroides:centroides
        }
    }
}
</script>