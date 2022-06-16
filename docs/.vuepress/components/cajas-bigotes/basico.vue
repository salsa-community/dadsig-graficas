<template>
  <div id="app">
    <DadsigCajasBigotes
        ref="cajas_bigotes_basica"
        :caja_id="'cajas_bigotes_basica'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :tooltip_activo="false"
        :variables="{'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#2c7fb8'}"
    />
  </div>
</template>

<script>
import cajasbigotesejemplos from "./cajas_bigotes_ejemplo_1.json"

export default {
  name: 'cajas-bigotes-basico',

  data: function () {
    return {
      datos: cajasbigotesejemplos,
    }
  },
}
</script>

<style lang="scss">
</style>
