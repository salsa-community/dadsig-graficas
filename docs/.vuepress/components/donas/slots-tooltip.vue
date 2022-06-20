<template>
  <div id="app">
    <DadsigDonas
        ref="donas-slots-tooltip"
        :dona_id="'dona'"
        :datos="datos"
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
    </DadsigDonas>
  </div>
</template>

<script>

import donasejemplo from "./donas_1.json"

export default {
  name: 'donas-slots-tooltip',
  data: function () {
    return {
      datos: donasejemplo,
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

