<template>
  <div v-bind:id=dona_id class="contenedor-dona">
    <slot name="encabezado"></slot>
    <svg class="svg-dona">
      <g class="grupo-contenedor-de-dona"></g>
      <g class="grupo-contenedor-tooltip">
        <foreignObject>
          <div class="tooltip-contenido">
            <div class="contenedor-boton-cerrar">
              <button class="boton-cerrar-tooltip" @click="cerrarTooltip">
                &times;
              </button>
            </div>
            <p class="tooltip-variable"></p>
            <p class="tooltip-cifra"></p>
          </div>
        </foreignObject>
      </g>
    </svg>
    <slot name="pie"></slot>
    <div v-show="logo_conacyt" class="grid-column-4 grid-column-6-esc">
      <a class="boton boton-conacyt" href="https://conacyt.mx/" target="_blank">
        <img src="https://conacyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg" alt="Conacyt" height="28px">
      </a>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'DadsigDonas',
  props: {
    dona_id: String,
    datos: Array,
    // tooltip_activo: {
    //   type: Boolean,
    //   default: function () {
    //     return true
    //   }
    // },
    logo_conacyt: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    ancho_tooltip: {
      type: Number,
      default: 100
    },
    radio_interno: {
      type:Number,
      default: .18
    },
    radio_externo: {
      type: Number,
      default: .32
    },
    radio_texto: {
      type: Number,
      default: .33
    },
  },
  watch: {
    datos: function(new_val,old_val) {
      this.configurandoDimensionesParaDona();
      if (new_val.length > old_val.length) {
        //Actualizamos paths
        this.segmentos = this.grupo_contenedor
            .selectAll("path")
            .data(this.data_para_pay);

        this.segmentos = this.segmentos.enter()
            .append("path").style("cursor","pointer")
            .merge(this.segmentos);

        this.segmentos.exit().remove();

        //Actualizamos textos
        this.textos_porcentajes = this.grupo_contenedor
            .selectAll("text")
            .data(this.data_para_pay);

        this.textos_porcentajes = this.textos_porcentajes.enter()
            .append("text")
            .merge(this.textos_porcentajes);

        this.textos_porcentajes.exit().remove();
      }
      else {
        this.segmentos.data(this.data_para_pay)
            .exit()
            .remove();

        this.textos_porcentajes.data(this.data_para_pay)
            .exit()
            .remove();
      }

      //Ajustes
      this.textos_porcentajes.style("fill-opacity", "1");
      // this.reestablecerVista();

      this.actualizandoDona();
    }
  },
  mounted: function () {
    this.svg = d3.select("#"+this.dona_id+" svg.svg-dona");
    this.grupo_contenedor = this.svg.select("g.grupo-contenedor-de-dona");
    this.grupo_contenedor_tooltip = this.svg.select("g.grupo-contenedor-tooltip");

    this.configurandoDimensionesParaSVG();

    /*
     Creando la funcion y dimensiones para el pie:
     Es importante que el pie no tenga ninguna funcion sort y que las
     rebanadas hereden el orden de la base de datos para que los indices
     de las rebanadas coincidan con los indices de la nomenclatura
    */
    this.pie = d3.pie().sort(null);
    this.arc = d3.arc();
    this.arc_texto = d3.arc();

    this.configurandoDimensionesParaDona();
    this.creandoDona();
    this.actualizandoDona();
    this.contenedor_leyenda = d3.select("#"+this.dona_id+"-leyenda");
    this.tooltip = this.grupo_contenedor_tooltip.select("foreignObject");

    window.addEventListener("resize", this.reescalandoPantalla);
  },
  destroyed() {
    window.removeEventListener("resize", this.reescalandoPantalla)
  },
  methods: {
    configurandoDimensionesParaDona: function () {
      this.pie.value((d) => d.cantidad);
      this.data_para_pay = this.pie(this.datos);
      this.arc.innerRadius(this.ancho * this.radio_interno)
          .outerRadius(this.ancho * this.radio_externo);
      this.arc_texto.innerRadius(this.ancho * this.radio_texto)
          .outerRadius(this.ancho * this.radio_texto);
    },
    configurandoDimensionesParaSVG: function () {
      this.ancho = document.getElementById(this.dona_id).clientWidth;
      this.alto = this.ancho;
      this.svg.attr("width", this.ancho).attr("height", this.ancho);
      this.grupo_contenedor.attr("transform", `translate(${this.ancho * .5}, ${this.alto * .5})`);
      this.grupo_contenedor_tooltip.attr("transform", `translate(${this.ancho * .5}, ${this.alto * .5})`);
    },
    creandoDona: function () {
      this.segmentos = this.grupo_contenedor
          .selectAll("paths")
          .data(this.data_para_pay)
          .enter()
          .append('path')
          .style("cursor", "pointer");

      this.textos_porcentajes = this.grupo_contenedor
          .selectAll('allLabels')
          .data(this.data_para_pay)
          .enter()
          .append("text");

      if (this.tooltip_activo) {
        this.svg
            .on("mousemove", (evento) => {
              this.mostrarTooltip(evento)
            })
            .on("mouseout", this.cerrarTooltip)
            .on("mouseout", this.reestablecerVista)

      }

    },
    actualizandoDona: function () {
      this.segmentos
          .attr('d', this.arc)
          .attr('fill', (d) => d.data.color)
          .attr("class", (d,i) => "rebanada-"+i)
          .attr("stroke-opacity", 0)
          .on("mouseover", (event,d) => this.clickButtonCategoria(d.index));

      this.textos_porcentajes
          .text((d) => (Math.round(1000 * d.data.cantidad / d3.sum(this.datos.map(d => d.cantidad))) / 10 ) +"%")
          .attr("class", (d,i) => "texto-"+i)
          .style("font-size", "20px")
          .style("fill", d => d.data.color)
          .style("font-weight", "700")
          .attr('transform', (d) => {
            var pos = this.arc_texto.centroid(d);
            return 'translate(' + pos + ')';
          })
          .style("fill-opacity", 1)
          //
          // Los siguientes dos estilos alinean el texto segun el angulo en el que se encuentre
          .style('text-anchor', (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? 'start' : 'end');
          })
          .style('dominant-baseline', (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < .5 * Math.PI || midangle > 1.5 * Math.PI ? 'auto' : 'hanging');
          });
      if (this.tooltip_activo) {
        this.svg
            .on("mousemove", (evento) => {
              this.mostrarTooltip(evento)
            })
            .on("mouseout", this.cerrarTooltip)
            .on("mouseout", this.reestablecerVista)

      }
    },
    reescalandoPantalla: function () {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaDona();
      this.actualizandoDona();
    },
    clickButtonCategoria: function(indice) {
      this.segmentos.interrupt()
          .transition()
          .duration(500)
          .style("fill-opacity", .25);
      this.textos_porcentajes.interrupt()
          .transition()
          .duration(500)
          .style("fill-opacity", 0);
      //
      // Si el click ocurrio en un elemento que no esta seleccionado, este se resalta
      if (!this.svg.select("path.rebanada-"+indice).classed("activo")) {
        this.svg.select("path.rebanada-"+indice)
            .interrupt()
            .transition()
            .duration(500)
            .style("fill-opacity", 1);

        this.svg.select("text.texto-"+indice).interrupt()
            .transition()
            .duration(500)
            .style("fill-opacity", 1);
        this.svg.selectAll("path")
            .classed("activo", false);

        this.contenedor_leyenda
            .selectAll(".boton-categoria")
            .classed("inactivo", true);
        this.contenedor_leyenda
            .select(".boton-categoria.label-"+indice)
            .classed("activo", true)
            .classed("inactivo", false);
        this.mostrarTooltip(indice);
      }
          //
      // Si el click ocurrio en un elemento que ya estaba seleccionado, este se regresa a su estado original
      else {
        this.cerrarTooltip();
        this.reestablecerVista();
      }
      this.svg.select("path.rebanada-"+indice)
          .classed("activo", !this.svg.select("path.rebanada-"+indice).classed("activo"));
    },
    mostrarTooltip: function(indice) {
      this.tooltip.style("visibility", "visible");

      let pos = this.arc_texto.centroid(this.data_para_pay[indice]);
      console.log(this.arc_texto.centroid(this.data_para_pay[indice]))

      let angulo_medio = this.data_para_pay[indice].startAngle + (this.data_para_pay[indice].endAngle - this.data_para_pay[indice].startAngle) / 2;


      this.tooltip
          .attr("x", angulo_medio > Math.PI ? pos[0] : pos[0] - this.ancho_tooltip)
          .attr("y", pos[1])
          .attr("width", this.ancho_tooltip)
          .attr("height", 30);

      let contenido_tooltip = this.tooltip.select("div.tooltip-contenido")
          .style("background", "rgba(0, 0, 0, .8)")
          .style("min-width", this.ancho_tooltip)
          .style("border-radius", "8px")
          .style("width", this.ancho_tooltip+"px")
          .attr("height", 70 )
          .style("padding", "0 3px 0 10px");

      // this.svg.select("button.boton-cerrar-tooltip")
      //     .on("click", this.reestablecerVista);

      contenido_tooltip
          .select("p.tooltip-variable")
          .text(this.datos[indice]["nombre"])
          .style("margin", "0")
          .style("padding", "0");

      contenido_tooltip
          .select("p.tooltip-cifra")
          .html(`${this.datos[indice]["cantidad"].toLocaleString("en")} | <b>${(Math.round(1000 * this.datos[indice]["cantidad"] / d3.sum(this.datos.map(d=>d.cantidad))) / 10 ) +"%"}<b>`)
          .style("margin", "0")
          .style("padding", "0 0 5px 0");

      this.tooltip
          .attr("height", contenido_tooltip.style("height"))
          .style("height", contenido_tooltip.style("height"))
          .attr("width", parseInt(contenido_tooltip.style("width")) + 13)
          .attr("y", angulo_medio < .5 * Math.PI || angulo_medio > 1.5 * Math.PI ? pos[1] : pos[1]-parseInt(contenido_tooltip.style("height")));
    },

    cerrarTooltip() {
      this.tooltip
          .style("visibility", "hidden");
      this.segmentos
          .style("fill-opacity", "1")

    },

    reestablecerVista: function () {
      this.tooltip.style("visibility", "hidden");
      this.segmentos.interrupt()
          .transition()
          .duration(500)
          .style("fill", d => d.color)
          .style("fill-opacity", 1);
      this.textos_porcentajes.interrupt()
          .transition()
          .duration(500)
          .style("fill-opacity", 1);

      this.contenedor_leyenda
          .selectAll(".boton-categoria")
          .classed("activo", false)
          .classed("inactivo", false);
    },
  }
}
</script>

<style scoped lang="scss">
$margen: 10px;
$radio: 10px;
.contenedor-dona {
  background: var(--color-fondo);
  border: solid var(--color-bordes) 1px;
  border-radius: $radio;
  color: var(--color-texto);
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  max-width: 500px;
  width: calc(100% - 20px);
  margin: auto;
}
.titulo-proyecto {
  font-size: 14px;
  margin: 20px $margen;
  text-align: right;
}
.titulo {
  font-size: 16px;
  font-weight: 700;
  margin: $margen;
}
.actualizacion {
  font-size: 12px;
  margin: $margen;
}
.instruccional {
  font-size: 14px;
  margin: $margen;
  opacity: .7;
}
.leyenda-dona {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  display: flex;
  flex-wrap: wrap;
  border-radius: $radio;
  box-shadow: 0px -5px 5px -1px rgba(var(--color-sombra),.2);
  margin-bottom: $margen;
  .titulo-leyenda {
    flex: 1 0 100%;
    font-size: 14px;
    font-weight: 700;
    margin: $margen * 2 $margen $margen;
    text-align: center;
  }
  .boton-categoria {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    background: none;
    border: none;
    color: var(--color-texto);
    cursor: pointer;
    margin: $margen;
    flex: 1 0 50%;
    align-items: center;
    max-width: calc(50% - 20px);
    display: flex;
    transition: opacity .3s ease-in-out;
    .categoria-color {
      width: 25px;
      height: 25px;
      border-radius: 25px;
    }
    .categoria-texto {
      font-size: 12px;
      padding-left: 5px;
    }
    &.activo {
      opacity: 1;
    }
    &.inactivo {
      opacity: .3;
    }
  }
}
.notas-dona {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  color: var(--color-texto);
  .contenedor {
    max-height: 0;
    overflow: hidden;
    transition: max-height .33s ease-in-out;
    &.abierto {
      max-height: 100vh;
    }
  }
  .separador {
    background: rgba(var(--color-sombra),.5);
    border: none;
    border-radius: 1px;
    height: 2px;
    margin: $margen;
  }
  .notas {
    font-size: 14px;
    margin: $margen * 2 $margen;
  }
  .fuente {
    border-top: 1px solid rgba(var(--color-sombra),.5);
    font-size: 14px;
    margin: $margen * 2 $margen;
    padding-top: $margen * 2;
  }
  .descargar-datos {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    background: var(--color-acento-fondo);
    border: none;
    border-radius: 5px;
    color: var(--color-acento-texto);
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    padding: $margen*.5 $margen;
    margin: $margen*2 auto;
    transition: background-color .33s ease-in-out, color .3s ease-in-out;
    &:hover,
    &:focus {
      background-color: var(--color-acento-fondo-hover);
      color: var(--color-acento-texto-hover);
    }
  }
  .boton-notas {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    background: var(--color-acento-fondo);
    border: solid var(--color-bordes) 1px;
    border-radius: 0 0 $radio $radio;
    color: var(--color-acento-texto);
    cursor: pointer;
    display: block;
    position: relative;
    bottom: -2px;
    left: -1px;
    width: calc(100% + 2px);
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    padding: $margen;
    margin: 0;
    transition: background-color .33s ease-in-out, color .3s ease-in-out;
    &:hover,
    &:focus {
      background-color: var(--color-acento-fondo-hover);
      color: var(--color-acento-texto-hover);
    }
  }
}
// svg
svg.svg-dona ::v-deep foreignObject {
  color: #fff;
  font-size: 12px;
}
svg.svg-dona ::v-deep div.contenedor-boton-cerrar {
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-top: 5px;
}
svg.svg-dona ::v-deep button.boton-cerrar-tooltip {
  background: none;
  border: none;
  padding: 0 0 0 5px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
