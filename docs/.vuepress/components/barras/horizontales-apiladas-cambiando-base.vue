<template>
  <div>
    <DadsigBarras
        :barras_id="'horizontales_apiladas_cambiando_base'"
        :datos="datos"
        :margen="{arriba: 10, abajo: 20, derecha:10, izquierda:30}"
        :nombre_barra="'nombre_rectangulos'"
        :nombre_color="'nombre_colores'"
        :variables="variables"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        orientacion="horizontal"
    >
      <template slot="encabezado">
        <div class="encabezado">
          <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
          <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
      </template>
      <template slot="pie">
        <div class="pie">
          <h3 class="titulo-visualizacion">Pie de gráfica</h3>
          <p>Aliquam erat volutpat. In cursus ipsum purus. Quisque a pellentesque justo. Donec nec justo sodales,
            dignissim leo consectetur, pulvinar leo. Aenean sodales a lacus eget porta.</p>
          <button @click="alternandoBase">Cambia la data</button>
        </div>
      </template>
    </DadsigBarras>
  </div>
</template>

<script>
import base_dummy_1 from "./base_dummy_1.json";
import base_dummy_2 from "./base_dummy_2.json";

export default {
  name: "horizontales-apiladas-cambiando-base",
  data: function () {
    return {
      algo: true,
      datos: base_dummy_1,
      variables: [
        {id: "cantidad_1", nombre_colores: "cantidad 1", color: "#ffffcc"},
        {id: "cantidad_2", nombre_colores: "cantidad 2", color: "#c7e9b4"},
        {id: "cantidad_3", nombre_colores: "cantidad 3", color: "#7fcdbb"},
      ],
      base_seleccionada: 1,
    };
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = base_dummy_2;
        this.variables = [
          {id: "cantidad_1", nombre_colores: "cantidad 1", color: "#dadaeb"},
          {id: "cantidad_2", nombre_colores: "cantidad 2", color: "#bcbddc"},
          {id: "cantidad_3", nombre_colores: "cantidad 3", color: "#9e9ac8"},
          {id: "cantidad_4", nombre_colores: "cantidad 4", color: "#756bb1"},
          {id: "cantidad_5", nombre_colores: "cantidad 5", color: "#54278f"}
        ];

      } else {
        this.base_seleccionada = 1;
        this.datos = base_dummy_1;
        this.variables = [
          {id: "cantidad_1", nombre_colores: "cantidad 1", color: "#ffffcc"},
          {id: "cantidad_2", nombre_colores: "cantidad 2", color: "#c7e9b4"},
          {id: "cantidad_3", nombre_colores: "cantidad 3", color: "#7fcdbb"}
        ];
      }
    },
  },
};
</script>

<style lang="scss">
$border-radius-tarjeta: 8px;

div#horizontales_apiladas_cambiando_base {
  border: solid 1px #000;
  border-radius: $border-radius-tarjeta;

  div.encabezado {

    .titulo-visualizacion {
      //font-size: 16px;
      padding: 10px 10px 0;
      margin: 0;
    }

    .fecha-actualizacion {
      font-size: 12px;
      padding: 0 10px;
      margin: 5px 0;
    }

  }

  div.pie {
    padding: 2px 15px;

    p {
      font-size: 12px;
    }

    button {
      font-size: 14px;
      font-family: Montserrat;
      margin: 0px;
      padding: 5px 10px;

      &:hover {
        background: #141414;
        color: #fff;
      }
    }

    border-radius: $border-radius-tarjeta;
    box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
    margin-bottom: 10px;
  }

}
</style>