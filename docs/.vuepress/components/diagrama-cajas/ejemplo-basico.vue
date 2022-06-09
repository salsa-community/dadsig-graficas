<template>
  <div id="app">
    <DaiDiagramCajas
        ref="cajas_basica"
        :caja_id="'diagramacajas_basica'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :tooltip_activo="false"
        :variables="{'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#000'}"
    />
  </div>
</template>

<script>
import diagramacajasejemplo from "./diagramacajas_ejemplo_1.json"

export default {
  name: 'box_plot_ejemplo_basico',

  data: function () {
    return {
      datos: diagramacajasejemplo,
    }
  },
}
</script>

<style lang="scss">
</style>
