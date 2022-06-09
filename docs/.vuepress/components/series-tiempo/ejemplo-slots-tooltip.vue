<template>
  <DaiLineas
      ref="lineas2"
      :conversionTemporal="conversionTemporal"
      :datos="datos"
      :linea_id="'lineas2'"
      :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
      :nombre_clumna_horizontal="'fecha'"
      :titulo_eje_x="'Titulo eje x'"
      :titulo_eje_y="'Titulo eje y'"
      :variables_categorias="edos_seleccionados"
  >
    <template slot="encabezado">
      <div class="encabezado">

        <h3 class="titulo-visualizacion">Titulo de visualización de una o dos líneas</h3>
        <p class="fecha-actualizacion"><b>Fecha de actualizacion: </b> 00/00/2022</p>
        <p class="instruccional">Texto instruccional Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </template>
    <template slot="pie">
      <div class="pie">
        <p>Pie de gráfica</p>
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
          "color": `rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`
        },
        {
          "cve": "32",
          "nombre": "Zacatecas",
          "color": `rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`
        }
      ],
      checkeados: [],
    }
  },
  mounted: function () {
    this.datos2 = this.datos;
    this.cambiaBaseLineas()


  },
  methods: {
    cambiaBaseLineas() {
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

.boton-base {
  background-color: var(--color-acento-fondo);
  border: none;
  border-radius: 3px;
  color: var(--color-acento-texto);
  cursor: pointer;
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
  padding: 10px 20px;
  transition: background-color .33s ease-in-out, color .3s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-acento-fondo-hover);
    color: var(--color-acento-texto-hover);
  }
}

div#lineas2 {
  div.contenedor-tooltip-svg {

    div.tooltip::v-deep {
      div.tooltip-cuerpo {
        font-size: 12px;

        p {
          margin: 0;
        }

        ul.tooltip-lineas {
          margin: 0;
          padding: 5px 0 0 0;

          li {
            list-style: none;
            margin: 0 0 5px 0;
            font-size: 12px;

            &::before {
              background: transparent;
            }

            span.span-tooltip-color {
              transform: translateY(2px);
              width: 12px;
              height: 12px;
              border: solid 1px rgba(255, 255, 255, .7);
              display: inline-block;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}

div.contenedor-lineas-elaboradas {
  width: 100%;
  border: solid black 1px;
  border-radius: $border-radius-tarjeta;
  position: relative;

}

div.encabezado {
  .titulo-proyecto {
    padding: 10px 10px 0px 10px;
    text-align: right;
    font-size: 12px;
    display: inherit;

  }

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

  p.instruccional {
    font-size: 12px;
    padding: 0 10px;
    margin: 5px 0;
  }
}

div.pie {

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border-radius: $border-radius-tarjeta;
  box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
  margin-bottom: 10px;
}

div.nomenclatura {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;

  div.checkbox {
    margin: 0;
    padding: 5px 10px;
    display: flex;

    .color {
      border-radius: 50%;
      width: 20px;
      min-width: 20px;
      height: 20px;
    }

    .nombre {
      font-size: 12px;
      line-height: 1.6;
      padding-left: 10px;
    }
  }
}

footer {
  margin-top: 200px;
}
</style>
