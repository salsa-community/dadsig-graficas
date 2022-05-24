<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            <label for=""><input type="checkbox" v-model="malla_visible"> apagar-prender malla</label>
            <DaiLeyendaMapa :para="['normal']"/>
            <DaiLeyendaMapa :para="['cluster-hexbin']" :mostrar-boton-alterna-todos="true"/>
        </template>
        <DaiMapa :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
            <DaiCapaXyz />
            <DaiCapaGeojsonHexbinDinamico
            id="cluster-hexbin"
            titulo="Capa con hexbin"
            :renderizarComoImagen="true"
            :datos="puntos"
            :diametroPixeles="25"
            :reglas-estilo-capa="{
                columna:'features_count',
                clasificacion:'cuantiles',
                clases:4
            }"
            :estilo-capa="{
                textStyle:{text:'-'}
            }"
            :props-asigna-estilo="['textStyle.text']"
            :fn-asigna-estilo="(f)=>[f.features_count+'']"
            :visible="malla_visible"
            :contenidoTooltip="(f)=>f.features_count+' hay aqui'"
            />
            <DaiCapaGeojson 
            id="normal"
            titulo="Capa normal"
            :renderizarComoImagen="true"
            :datos="puntos"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            :visible="false"
            
            />
            
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>

<script>

export default {
    data:function(){
        return {
            puntos : { "type": "FeatureCollection","features":[]},
            malla_visible:true
        }
    },
    mounted:function(){
        const url =this.$withBase('/large_dataset.geojson')
        fetch(url).then(response=>response.json()).then(data=>{
            this.puntos=data 
        })
    }
}
</script>