<template>
    <div class="diagrama-procesos">
        <div class="proceso" v-for="(proceso, i) in datos" :key="i">
            <div class="proceso-titulo">{{proceso.nombre}}(proceso)</div>
            
            <div class="etapa" v-for="(etapa,j) in proceso.secciones" :key="j">
                <div class="etapa-titulo">{{etapa.nombre}}(etapa)</div>
                <div class="paso" v-for="(paso, k) in etapa.subsecciones" :key="k">
                    <div class="paso-titulo">{{paso.nombre}}(paso)</div>
                    <div class="segmentos-nodo">
                        (segmentos-nodo)
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
        background: rgba(0,0,0,.1);
        padding: 5px 0 0 20px;
    }
    .proceso{
        &-titulo{
            font-size:24px;
        }
        .etapa{
            &-titulo{
                font-size: 20px;
            }
            .paso{
                &-titulo{
                    font-size: 16px;
                }
            }
        }
    }
}

</style>