<template>
  <div>
    <DadsigBarras
      :barras_id="'verticales_apiladas_slots_tooltip'"
      :datos="[
        {
          nombre_rectangulos: 'A',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'B',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'C',
          cantidad_1: 90,
          cantidad_2: 60,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'D',
          cantidad_1: 70,
          cantidad_2: 60,
          cantidad_3: 10,
        },
        {
          nombre_rectangulos: 'E',
          cantidad_1: 40,
          cantidad_2: 30,
          cantidad_3: 80,
        },
        {
          nombre_rectangulos: 'F',
          cantidad_1: 60,
          cantidad_2: 50,
          cantidad_3: 30,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#ffffcc' },
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#c7e9b4' },
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: '#7fcdbb' },
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (categórico)"
      titulo_eje_x="Eje horizontal (numérico)"
      orientacion="horizontal"
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
    </DadsigBarras>
  </div>
</template>
<script>
import * as d3 from "d3";

export default {
  name: "verticales-apiladas-slots-tooltip",
  data: function () {
    return {
      algo: true,
      datos: [
        {
          nombre_rectangulos: "Nombre de variable 1 ",
          cantidad_1_total: 120,
          cantidad_2_total: 40,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 2 ",
          cantidad_1_total: 100,
          cantidad_2_total: 30,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 3 ",
          cantidad_1_total: 20,
          cantidad_2_total: 130,
          cantidad_3_total: 540,
          cantidad_1_porcentaje: 30,
          cantidad_2_porcentaje: 60,
          cantidad_3_porcentaje: 10,
        },
        {
          nombre_rectangulos: "Nombre de variable 4 ",
          cantidad_1_total: 20,
          cantidad_2_total: 130,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 5 ",
          cantidad_1_total: 40,
          cantidad_2_total: 130,
          cantidad_3_total: 1,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
      ],
      datos_1: [
        {
          nombre_rectangulos: "Nombre de variable 1 ",
          cantidad_1_total: 120,
          cantidad_2_total: 40,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 2 ",
          cantidad_1_total: 100,
          cantidad_2_total: 30,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 3 ",
          cantidad_1_total: 20,
          cantidad_2_total: 130,
          cantidad_3_total: 540,
          cantidad_1_porcentaje: 30,
          cantidad_2_porcentaje: 60,
          cantidad_3_porcentaje: 10,
        },
        {
          nombre_rectangulos: "Nombre de variable 4 ",
          cantidad_1_total: 20,
          cantidad_2_total: 130,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 5 ",
          cantidad_1_total: 40,
          cantidad_2_total: 130,
          cantidad_3_total: 1,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
      ],
      datos_2: [
        {
          nombre_rectangulos: "Nombre de variable 1 ",
          cantidad_1_total: 20,
          cantidad_2_total: 40,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 2 ",
          cantidad_1_total: 180,
          cantidad_2_total: 30,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 3 ",
          cantidad_1_total: 30,
          cantidad_2_total: 130,
          cantidad_3_total: 540,
          cantidad_1_porcentaje: 40,
          cantidad_2_porcentaje: 60,
          cantidad_3_porcentaje: 0,
        },
        {
          nombre_rectangulos: "Nombre de variable 4 ",
          cantidad_1_total: 20,
          cantidad_2_total: 130,
          cantidad_3_total: 40,
          cantidad_1_porcentaje: 33,
          cantidad_2_porcentaje: 33,
          cantidad_3_porcentaje: 33,
        },
        {
          nombre_rectangulos: "Nombre de variable 5 ",
          cantidad_1_total: 50,
          cantidad_2_total: 130,
          cantidad_3_total: 1,
          cantidad_1_porcentaje: 50,
          cantidad_2_porcentaje: 50,
          cantidad_3_porcentaje: 0,
        },
      ],
      variables_ejemplo_basico: [
        {
          id: "cantidad_1_total",
          nombre_colores: "cantidad 1",
          color: "yellow",
        },
        {
          id: "cantidad_2_total",
          nombre_colores: "cantidad 2",
          color: "magenta",
        },
        { id: "cantidad_3_total", nombre_colores: "cantidad 3", color: "blue" },
      ],
    };
  },
  mounted() {},
  methods: {
    cambiaDatos() {
      if (this.algo) {
        this.datos = this.datos_2;
        this.variables_ejemplo_basico = [
          {
            id: "cantidad_1_total",
            nombre_colores: "cantidad 1",
            color: "yellow",
          },
          {
            id: "cantidad_2_total",
            nombre_colores: "cantidad 2",
            color: "magenta",
          },
          {
            id: "cantidad_3_total",
            nombre_colores: "cantidad 2",
            color: "red",
          },
        ];
      } else {
        this.datos = this.datos_1;
        this.variables_ejemplo_basico = [
          {
            id: "cantidad_1_porcentaje",
            nombre_colores: "cantidad 1",
            color: "cyan",
          },
          {
            id: "cantidad_2_porcentaje",
            nombre_colores: "cantidad 2",
            color: "green",
          },
          {
            id: "cantidad_3_porcentaje",
            nombre_colores: "cantidad 2",
            color: "purple",
          },
        ];
      }
      this.algo = !this.algo;
      this.$refs["barritas1"].grupo_fondo
        .append("circle")
        .style("fill", "var(--variable)")
        .attr("cx", this.$refs["barritas1"].ancho * 0.5)
        .attr("cy", this.$refs["barritas1"].alto * 0.5)
        .attr("r", this.$refs["barritas1"].alto * 0.25);
    },
  },
};
</script>

<style lang="scss" scoped>

.slot-encabezado, .slot-pie {
  font-family: "Lucida Console", "Courier New", monospace;
}

.slot-parrafo {
  font-size: 13px;
}

</style>


