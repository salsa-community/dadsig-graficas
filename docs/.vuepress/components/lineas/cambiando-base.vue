<template>
  <DadsigLineas
      ref="lineas3"
      :conversionTemporal="conversionTemporal"
      :datos="datos"
      :escala_logaritmica="true"
      :linea_id="'lineas3'"
      :margen="{arriba: 10, abajo: 20, izquierda: 50, derecha: 30}"
      :nombre_columna_horizontal="'fecha'"
      :tipo_tooltip="'individual'"
      :titulo_eje_x="'Eje horizontal (temporal)'"
      :titulo_eje_y="'Eje vertical (numérico)'"
      :variables="edos_seleccionados"
      class="contenedor-lineas-elaboradas"
  >
    <template slot="encabezado">
      <div class="encabezado">
        <h3 class="titulo-visualizacion">Titulo de gráfica con cambio de datos</h3>
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
  </DadsigLineas>
</template>

<script>
import * as d3 from "d3";
import data_edos from "./data_edos.json"

export default {
  name: "ejemplo-cambiando-base",

  data: function () {
    return {
      datos: data_edos,
      conversionTemporal: d3.timeParse('%d-%m-%Y'),
      edos: [
        {"cve": "01", "nombre": "Aguascalientes", "abr": "AGS"},
        {"cve": "02", "nombre": "Baja California", "abr": "BC"},
        {"cve": "03", "nombre": "Baja California Sur", "abr": "BCS"},
        {"cve": "04", "nombre": "Campeche", "abr": "CAMP"},
        {"cve": "07", "nombre": "Chiapas", "abr": "CHIS"},
        {"cve": "08", "nombre": "Chihuahua", "abr": "CHIH"},
        {"cve": "09", "nombre": "CDMX", "abr": "CDMX"},
        {"cve": "05", "nombre": "Coahuila", "abr": "COAH"},
        {"cve": "06", "nombre": "Colima", "abr": "COL"},
        {"cve": "10", "nombre": "Durango", "abr": "DUR"},
        {"cve": "15", "nombre": "Estado de México", "abr": "EDOMEX"},
        {"cve": "11", "nombre": "Guanajuato", "abr": "GTO"},
        {"cve": "12", "nombre": "Guerrero", "abr": "GRRO"},
        {"cve": "13", "nombre": "Hidalgo", "abr": "HGO"},
        {"cve": "14", "nombre": "Jalisco", "abr": "JAL"},
        {"cve": "16", "nombre": "Michoacán", "abr": "MICH"},
        {"cve": "17", "nombre": "Morelos", "abr": "MOR"},
        {"cve": "18", "nombre": "Nayarit", "abr": "NAY"},
        {"cve": "19", "nombre": "Nuevo León", "abr": "NL"},
        {"cve": "20", "nombre": "Oaxaca", "abr": "OAX"},
        {"cve": "21", "nombre": "Puebla", "abr": "PUE"},
        {"cve": "22", "nombre": "Querétaro", "abr": "QUE"},
        {"cve": "23", "nombre": "Quintana Roo", "abr": "Q ROO"},
        {"cve": "24", "nombre": "San Luis Potosí", "abr": "SLP"},
        {"cve": "25", "nombre": "Sinaloa", "abr": "SIN"},
        {"cve": "26", "nombre": "Sonora", "abr": "SON"},
        {"cve": "27", "nombre": "Tabasco", "abr": "TAB"},
        {"cve": "28", "nombre": "Tamaulipas", "abr": "TAMPS"},
        {"cve": "29", "nombre": "Tlaxcala", "abr": "TAX"},
        {"cve": "30", "nombre": "Veracruz", "abr": "VER"},
        {"cve": "31", "nombre": "Yucatán", "abr": "YUC"},
        {"cve": "32", "nombre": "Zacatecas", "abr": "ZAC"},
        {"cve": "000", "nombre": "promedio", "abr": "promedio"}
      ],
      edos_seleccionados: [
        {
          "cve": "31",
          "nombre": "Yucatán",
          "color": '#2c7fb8'
        },
        {
          "cve": "32",
          "nombre": "Zacatecas",
          "color": '#253494'
        }
      ],
      checkeados: [],
    }
  },
  mounted: function () {
    this.datos2 = this.datos;
    this.alternandoBase()
  },
  methods: {
    alternandoBase() {
      this.edos_seleccionados = this.edos.map((d) => ({
            "cve": d.cve,
            "nombre": d.nombre,
            "abr": d.abr,
            "color": `rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`,
            "resaltado": false
          }
      ))
      if (Math.random() < .5) {
        this.edos_seleccionados = this.edos_seleccionados.slice(1, 2)
      } else {
        this.edos_seleccionados = this.edos_seleccionados.slice(0, parseInt(Math.random() * 32));
        if (Math.random() < .5) {
          this.edos_seleccionados.push(
              {
                "cve": "000",
                "nombre": "promedio",
                "abr": "promedio",
                "color": `rgb(0, 0, 0)`,
                "resaltado": true
              }
          )
        }
      }
      this.checkeados = [...this.edos_seleccionados]
      this.datos.forEach((d) => {
        this.edos.forEach((edo) => {
          d[edo.cve] = d3.randomNormal(.4, .1)()
        })
      })
    },
  }
}
</script>

<style lang="scss">
$border-radius-tarjeta: 10px;

body {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  margin: 20px;
}

div.contenedor-lineas-elaboradas {
  width: 100%;
  border: solid black 1px;
  border-radius: $border-radius-tarjeta;
  position: relative;

}

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
</style>
