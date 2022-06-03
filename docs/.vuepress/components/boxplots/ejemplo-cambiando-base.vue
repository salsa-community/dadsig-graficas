<template>
  <div id="app">
    <DaiBoxPlot
        ref="cajas_cambio_base"
        :caja_id="'boxplot_cambio_base'"
        :datos="datos"
        :titulo_eje_x="'Número de acciones vendidas'"
        :titulo_eje_y="'Empresa'"
        :variables="variables"
    />
  </div>
</template>

<script>
import boxplotejemplo1 from "./box_plot_ejemplo_1.json"
import boxplotejemplo2 from "./box_plot_ejemplo_2.json"

export default {
  name: 'box_plot_cambio_base',

  data: function () {
    return {
      datos: boxplotejemplo1,
      variables: {'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#000'},
    }
  },
}
</script>

<style lang="scss">
</style>
