<template>
    <div class="another-map">

            <DaiMapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <DaiCapaXyz />
                <!--Un tooltip con contenido estatico-->
                <DaiCapaGeojson 
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                @hover_feature="hover1"
                :reglas-estilo-capa="{
                    clasificacion:'cuantiles',
                    columna:'pob18ymas',
                    colores:'Reds'
                }"
                />
                
            </DaiMapa>
            <p :style="{color:tooltip_fuera_color}">{{tooltip_fuera_contenido}}</p>

    </div>
</template>

<script>
export default {
    methods:{
        hover1:function(e){
            this.tooltip_fuera_contenido = e.feature.nom_edo
            this.tooltip_fuera_color = e.style.getFill().getColor()
        }
    },
    data:function(){
        return{
            tooltip_fuera_contenido:"Pasa el mouse sobre algun estado, y pon atencion al color de este texto",
            tooltip_fuera_color:"black"
        }
    }
}
</script>