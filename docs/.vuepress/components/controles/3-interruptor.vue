<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3 v-width-control="'100%'" >Control de interruptor</h3> 
                <dai-interruptor-mapa
                v-model="capa_prendida"
                :opciones="['dark','light']"
                /> 

                <dai-interruptor-mapa
                v-model="capa_prendida"
                :opciones="['dark','light']"
                :opciones-etiquetas="['Oscuro','Claro']"
                /> 
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

            
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            capa_prendida:'dark'
        }
    }
    
}
</script>