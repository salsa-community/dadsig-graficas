<template>
  <div id="app">
    <DaiDiagramaCajas
        ref="cajas_slots"
        :caja_id="'diagramacajas_slots'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :variables="{'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#00f'}"
    >
      <template slot="encabezado">
        <div>
          <h3>Título slots</h3>
          <p>
            Tanto el título que aparece arriba, como este texto, se integran
            como slot. Se puede estilizar segun las necesidades con un poco de
            CSS o, en su momento, importando el sistema de diseño
          </p>
        </div>
      </template>
      <template slot="pie">
        <div>
          <h3>Pie de gráfica</h3>
          <p>
            Este otro bloque corresponde al slot de pie de gráfica, en donde
            usualmente se ponen nomenclaturas, notas o controles, y también
            puede modificarse con CSS según las necesidades.
          </p>
        </div>
      </template>
    </DaiDiagramaCajas>
  </div>
</template>

<script>
import diagramacajasejemplo from "./diagramacajas_ejemplo_1.json"

export default {
  name: 'box_plot_ejemplo_slots',

  data: function () {
    return {
      datos: diagramacajasejemplo,
    }
  },
}
</script>

<style lang="scss">
</style>
