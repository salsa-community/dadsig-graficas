<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['normal']"/>
            <DaiLeyendaMapa :para="['cluster-hexbin']" :mostrar-boton-alterna-todos="true"/>
        </template>
        <DaiMapa :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
            <DaiCapaXyz />
            <DaiCapaGeojsonHexbinDinamico
            id="cluster-hexbin"
            titulo="Capa con hexbin"
            :datos="centroides"
            :diametroPixeles="25"
            :reglas-estilo-capa="{
                columna:'features_count',
                clasificacion:'linear',
                clases:3
            }"
            :estilo-capa="{
                textStyle:{text:'-'}
            }"
            :props-asigna-estilo="['textStyle.text']"
            :fn-asigna-estilo="(f)=>[f.features_count+'']"
            />
            <DaiCapaGeojson 
            id="normal"
            titulo="Capa normal"
            :datos="centroides"
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