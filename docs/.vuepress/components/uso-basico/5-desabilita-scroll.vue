<template>
<div class="another-map">
    <p>Da click en el boton para alternar el valor del scroll</p>
    <button @click="permiteScroll= !permiteScroll">Permitir/desactivar scroll</button> {{permiteScroll}}
    <dai-mapa :zoom-on-scroll="permiteScroll"
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
    </dai-mapa>
</div>
</template>

<script>
export default {
    data:function(){
        return {
            permiteScroll:true
        }
    }
}
</script>