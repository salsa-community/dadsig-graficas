<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template #header>
                <p>Da click en el boton para llenar o vaciar la capa</p>
                <button @click="vaciar=!vaciar">{{vaciar?'llenar':'vaciar'}}</button>

                <dai-leyenda-mapa para="centroides" />
            </template>
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-xyz/>
                <dai-capa-geojson 
                id="centroides"
                :datos="centroidesComputados"
                :reglas-estilo-capa="{
                    clasificacion:'cortes-naturales',
                    columna : 'estados_pob18ymas',
                    propiedadObjetivo: 'proporcion',
                    clases:4,
                    proporciones:[4,8,12,16]
                }"
                />
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
import centroides from "../capas/centroides-estados.json"
export default {
    data: function (){
        return {
            centroides:centroides,
            vaciar:true
        }
    },
    computed: {
        centroidesComputados:function(){
            return !this.vaciar ? this.centroides : {"type": "FeatureCollection",features:[]}
        }
    }
}
</script>