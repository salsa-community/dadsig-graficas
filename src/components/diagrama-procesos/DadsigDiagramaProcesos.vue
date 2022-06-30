<template>
<!--los niveles de opacidad son 1, .3 y .1-->
    <div class="diagrama-procesos">
        <div class="proceso" v-for="(proceso, i) in datos" :key="i">
            <div class="proceso-titulo" :style="{color: proceso.color, background: proceso.color + '4d'}">{{proceso["nombre-proceso"]}}</div>
            
            <div class="etapa" v-for="(etapa,j) in proceso.etapas" :key="j">
                
                
                <div class="paso" v-for="(paso, k) in etapa.pasos" :key="k" :style="{
                    border: (paso.estado=='enproceso'? '1px solid '+proceso.color : 'none')}">
                    <div class="etapa-titulo" :v-if='etapa["nombre-etapa"] != ""' 
                        :style="{
                            color: (paso.estado=='finalizado'? proceso.color : 
                                paso.estado=='enproceso' ? '#fff': '#000'), 
                            background: (paso.estado=='finalizado'? proceso.color + '4d' : 
                                paso.estado=='enproceso' ? proceso.color: '#fff'),
                            border: (paso.estado=='inactiva'? '1px solid #000' : 'none')}">{{etapa["orden"]}}
                    </div>

                    <div class="detalle" v-for="(detalle, l) in paso.detalles" :key="l" :style="{
                            background: (paso.estado=='finalizado'? proceso.color + '1a' : 
                                paso.estado=='enproceso' ? proceso.color + '1a': '#0000001a'),
                            borderBottom: '1px solid #fff'
                            }">
                        <div v-if='detalle.tipo=="html"' v-html="detalle.contenido"></div>
                        <div v-if='detalle.tipo=="etiquetas"' >
                            <div  v-for="(etiqueta, e) in detalle.etiquetas" :key="e" class="btn" :class="etiqueta.clase">
                            {{etiqueta["nombre-corto"]}}
                        </div>
                        </div>
                        <div v-if='detalle.tipo=="modal"' :texto-modal="detalle.contenido">+</div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "DadsigDiagramaProcesos",
    props: {
        datos: Array
    }
}
</script>
<style scoped lang="scss">
.diagrama-procesos{
    div{
        //padding: 5px 0 0 20px;
    }
    .proceso{
        
        &-titulo{
            font-size:24px;
            width: 100%;
        }
        .etapa{
            display: inline-flex;
            flex-wrap: nowrap;
            &-titulo{
                font-size: 20px;
            }
            .paso{
                min-width: 180px;
                &-titulo{
                    font-size: 16px;
                }
            }
        }
    }
}

</style>