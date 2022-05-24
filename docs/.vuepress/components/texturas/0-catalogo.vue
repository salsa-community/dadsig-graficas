<template>
    <div class="another-map">
        
        <dai-tarjeta-contenedor-mapa
        :permitir-colapso="false"
        >
            <template #header>
                
                    <p>Selecciona la textura</p>
                    <dai-selector-mapa v-model="texturaSeleccionada">
                        <option v-for="textura in texturasDisponibles" :value="textura" :key="textura">{{textura}}</option>
                    </dai-selector-mapa>
                    <hr>
                    <p>Selecciona el tamaño</p>
                    <input type="number" v-model="tamano" :disabled="!esTexturaSimpleActualSeleccion">
                    <p>Selecciona el espaciado</p>
                    <input type="number" v-model="espaciado" :disabled="!esTexturaSimpleActualSeleccion">
                    <p>Selecciona el angulo</p>
                    <input type="number" v-model="angulo" :disabled="!esTexturaSimpleActualSeleccion">
                    <p>Selecciona la escala</p>
                    <input type="number" v-model="escala" >
                
            </template>
            <template #footer>
                
                
                <dai-leyenda-mapa :para="['estados2']" />

            </template>
            <dai-mapa
                :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
                >
                    
                    <dai-capa-geojson 
                    id="estados2"
                    :url="$withBase('/sample-edos.geojson')"
                    :usar-texturas-en-relleno="true"
                    :estilo-capa="{
                        fill:{color:'orange'},
                        stroke:{color:'gray',width:1}
                    }"
                    :estiloTexturaRelleno="{
                        color:'orange',
                        pattern: texturaSeleccionada,
                        size:tamano,
                        spacing:espaciado,
                        angle:angulo,
                        scale:escala
                        
                    }"
                    />
                    
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data: function (){
        return {
            texturaSeleccionada:'hatch',
            tamano:1,
            espaciado:10,
            angulo:0,
            escala:1,
            texturasDisponibles:['hatch','cross','dot','circle','square','tile','woven','crosses','caps','nylon','hexagon','wave','vine','brick','rock'],
            texturasSimples:['hatch','cross','dot','circle','square','tile']
        }
    },
    computed:{
        esTexturaSimpleActualSeleccion:function(){
            return this.texturasSimples.includes(this.texturaSeleccionada)
        }
    },watch:{
        esTexturaSimpleActualSeleccion:function(nv){
            if(!nv){
                this.tamano = 1;
                this.espaciado= 10;
                this.angulo = 0;
            }
        },
        texturaSeleccionada:function(nv){
            if( this.esTexturaSimpleActualSeleccion && nv!=='hatch' && this.angulo>1){
                this.angulo = 1
            }
        }
    }
}
</script>