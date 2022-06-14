<template>
  <DaiLineas
      ref="lineas2"
      :conversionTemporal="conversionTemporal"
      :datos="datos"
      :linea_id="'lineas2'"
      :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
      :nombre_columna_horizontal="'fecha'"
      :tipo_tooltip="'individual'"
      :titulo_eje_x="'Eje horizontal (temporal)'"
      :titulo_eje_y="'Eje vertical (numérico)'"
      :variables="edos_seleccionados"
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
  </DaiLineas>
</template>

<script>
import * as d3 from "d3";
import data_edos from "./data_edos.json"

export default {
  name: "ejemplo-slots-tooltips",

  data: function () {
    return {
      datos: data_edos,
      conversionTemporal: d3.timeParse('%d-%m-%Y'),
      edos_seleccionados: [
        {
          "cve": "31",
          "nombre": "Yucatán",
          "color": '#2c7fb8',
        },
      ],
      checkeados: [],
    }
  },
  mounted: function () {
    this.datos2 = this.datos;
  },
}
</script>

<style lang="scss">

.slot-encabezado, .slot-pie {
  font-family: "Lucida Console", "Courier New", monospace;
}

.slot-parrafo {
  font-size: 13px;
}

</style>
