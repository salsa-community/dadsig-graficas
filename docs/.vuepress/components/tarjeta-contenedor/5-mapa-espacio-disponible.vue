<template>
    <div class="another-map ">
        <button @click="permite_colapso=!permite_colapso">alterna 'permitir-colapso'</button>
        <button @click="llena_espacio=!llena_espacio">alterna 'llenar-espacio...'</button>
        <hr>
        <dai-tarjeta-contenedor-mapa
        :permitir-colapso="permite_colapso"
        :llenar-espacio-disponible-con-mapa="llena_espacio"
        class="full-height"
        >
            <template v-slot:header>  
                <p>permite colapso : {{permite_colapso}}</p>
                <p>llena espacio disponible : {{llena_espacio}}</p>
            </template>
            <dai-mapa>
                <dai-capa-xyz-osm/>
            </dai-mapa>

            <template v-slot:footer>  
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vitae enim, sit, accusantium rerum magnam perferendis doloribus cupiditate nostrum consequuntur voluptas dolorem commodi </p>
                
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            permite_colapso:false,
            llena_espacio : true
        }
    }
}
</script>

<style scoped>
.full-height{
    height: 80vh;
}
</style>

