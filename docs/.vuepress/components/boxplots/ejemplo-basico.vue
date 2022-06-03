<template>
  <div id="app">
    <DaiBoxPlot
        ref="cajas_basica"
        :caja_id="'boxplot_basica'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :variables="{'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#000'}"
        :tooltip_activo="false"
    />
  </div>
</template>

<script>
import boxplotejemplo from "./box_plot_ejemplo_1.json"

export default {
  name: 'box_plot_ejemplo_basico',

  data: function () {
    return {
      datos: boxplotejemplo,
    }
  },
}
</script>

<style lang="scss">
</style>
