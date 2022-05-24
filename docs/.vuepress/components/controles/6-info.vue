<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>
                <p>Da click en el mapa y en algun estado</p>
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            @click="coordinate = $event.coordinate.toString()+' coordenada clickeada en el mapa'"
            @reset_view="vista_reseteada"
            >
                <dai-capa-geojson 
                id="estados" 
                :url="$withBase('/sample-edos.geojson')"
                @click_feature="click_estados"
                />

                <dai-info-mapa
                :colapsado="false"
                >
                    <p>{{coordinate}}</p>
                    <p>Estado seleccionado <strong>{{estado}}</strong></p>
                </dai-info-mapa>
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
        
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            coordinate: "click para capturar la coordenada",
            estado:  "da click en uno"
        }
    },
    methods:{
        click_estados:function(evento){
            //console.log("se dio click en los estados", evento)
            let feature = evento[0];
            this.estado = `${feature.getProperties()["nom_edo"]}`;
        },
        vista_reseteada:function(){
            this.estado = "da click en uno"
        }
    }
}
</script>