<template>
  <div id="app">
    <DaiDiagramaCajas
        ref="cajas_slots"
        :caja_id="'diagramacajas_slots'"
        :datos="datos"
        :titulo_eje_x="'Empresa'"
        :titulo_eje_y="'Acciones vendidas'"
        :variables="{'grupos':'nombre_empresa','variable_dist':'acciones_vendidas','color':'#2c7fb8'}"
    >
      <template slot="encabezado">
        <div class="slot-encabezado">
          <h4>Título slots</h4>
          <p class="slot-parrafo">
            Tanto el título que aparece arriba, como este texto, se integran
            como slot. Se puede estilizar segun las necesidades con un poco de
            CSS o, en su momento, importando el sistema de diseño
          </p>
        </div>
      </template>
      <template slot="pie">
        <div class="slot-pie">
          <h4>Pie de gráfica</h4>
          <p class="slot-parrafo">
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
  name: 'diagrama-cajas-slots-tooltip',

  data: function () {
    return {
      datos: diagramacajasejemplo,
    }
  },
}
</script>

<style lang="scss" scoped>

.slot-encabezado, .slot-pie {
  font-family: "Lucida Console", "Courier New", monospace;
}

.slot-parrafo {
  font-size: 13px;
}

</style>

