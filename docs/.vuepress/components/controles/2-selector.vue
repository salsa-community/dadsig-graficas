<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3>Control de seleccion</h3> 
                <dai-selector-mapa 
                v-model="capa_prendida"
                v-width-control="'100%'" 
                class="control-large" 
                @change="cambioSelector"
                >
                    <option value="dark">Capa base oscura</option>
                    <option value="light">Capa base clara</option>
                </dai-selector-mapa>
            </template>
            <dai-mapa :zoom="3">
                <dai-capa-xyz 
                
                :visible="capa_prendida==='dark'"
                url="https://{a-c}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
                />
                <dai-capa-xyz 
                :visible="capa_prendida==='light'"
                url="https://{a-c}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
                />
            </dai-mapa>

            <template v-slot:footer>  
                
                
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            capa_prendida:'dark'
        }
    },
    methods:{
        cambioSelector:function(e){
            console.log("Este es el nuevo valor",e);
            
        }
    }
}
</script>