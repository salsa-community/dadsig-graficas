<template>
  <div id="app">
    <DaiBoxPlot
        ref="cajas_cambio_base"
        :caja_id="'boxplot_cambio_base'"
        :datos="datos"
        :titulo_eje_x="titulos_eje_x"
        :titulo_eje_y="titulos_eje_y"
        :variables="variables"
    >
      <template slot="encabezado">
        <div class="encabezado">
          <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
          <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
      </template>
      <template slot="pie">
        <div class="pie">
          <h3>Pie de gráfica</h3>
          <button @click="alternandoBase">Cambia la data</button>
        </div>
      </template>
    </DaiBoxPlot>
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
      variables: {'grupos': 'nombre_empresa', 'variable_dist': 'acciones_vendidas', 'color': '#f00'},
      titulos_eje_x: 'Empresas',
      titulos_eje_y: 'Acciones vendidas',
      base_seleccionada: 1,
    }
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = boxplotejemplo2;
        this.variables = {'grupos': 'nombre_categoria', 'variable_dist': 'metrica', 'color': '#800'};
        this.titulos_eje_x = 'Categorías';
        this.titulos_eje_y = 'Métrica';
      } else {
        this.base_seleccionada = 1;
        this.datos = boxplotejemplo1;
        this.variables = {'grupos': 'nombre_empresa', 'variable_dist': 'acciones_vendidas', 'color': '#800080'};
        this.titulos_eje_x = 'Empresas';
        this.titulos_eje_y = 'Acciones vendidas';
      }
    },
  },
};
</script>

<style lang="scss">
$border-radius-tarjeta: 8px;

div#boxplot_cambio_base {
  border: solid 1px #000;
  border-radius: $border-radius-tarjeta;

  div.encabezado {

    .titulo-visualizacion {
      font-size: 16px;
      padding: 10px 10px 0;
      margin: 0;
    }

    .fecha-actualizacion {
      font-size: 10px;
      padding: 0 10px;
      margin: 5px 0;
    }

  }

  div.pie {
    padding: 2px 15px;

    button {
      border: none;
      font-size: 14px;
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