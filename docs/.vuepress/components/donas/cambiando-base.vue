<template>
  <div id="app">
    <DadsigDonas
        ref="donas_cambio_base"
        :datos="datos"
        :dona_id="'donas_cambio_base'"
        :ancho_dona="400"
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
    </DadsigDonas>
  </div>
</template>

<script>
import donasejemplo1 from "./donas_1.json"
import donasejemplo2 from "./donas_2.json"
import donasejemplo3 from "./donas_3.json"

export default {
  name: "donas-cambiando-base",

  data: function () {
    return {
      datos: donasejemplo1,
      base_seleccionada: 1,
    }
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = donasejemplo2;
      } else if (this.base_seleccionada == 2) {
        this.base_seleccionada = 3;
        this.datos = donasejemplo3;
      } else {
        this.base_seleccionada = 1;
        this.datos = donasejemplo1
      }
    },
  },

}
</script>

<style lang="scss">
$border-radius-tarjeta: 8px;

div#donas_cambio_base {
  border: solid 1px #000;
  border-radius: $border-radius-tarjeta;

  div.encabezado {

    .titulo-visualizacion {
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