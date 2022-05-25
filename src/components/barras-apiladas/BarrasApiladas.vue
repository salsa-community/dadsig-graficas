
<template>
	<div class="contenedor-barras-apiladas" v-bind:id=barras_apiladas_id>
		<slot name="encabezado"></slot>
		<div class="contenedor-tooltip-svg">
			<div class="tooltip"> 
				<div class="tooltip-contenido">
					<div class="contenedor-boton-cerrar">
						<button class="boton-cerrar-tooltip" @click="cerrarTooltip">
							&times;
						</button>
					</div>
					<div class="tooltip-cifras"></div>
				</div>
			</div>
            <div class="rotation-wrapper-outer">
                <div class="rotation-wrapper-inner">
                    <div class="element-to-rotate" :style="{width: `${alto_vis - margen.arriba - margen.abajo}px`,
                    transform: `rotate(-90deg)translateX(calc(-100% - ${.5 * margen.arriba}px))`}">
                        <p style="padding:10px 0 5px 0" v-html="titulo_eje_y"></p>
                    </div>
                </div>    
            </div>
			<svg class="svg-barras-apiladas">
				<defs></defs>
				<g class="grupo-fondo"></g>
				<g class="grupo-contenedor-de-barras"></g>
				<g class="grupo-frente"></g>
			</svg>
            <div class="eje-x">
                <p  v-html="titulo_eje_x" :style="{
                    padding: `${margen.abajo +10 }px ${margen.derecha}px 0 ${margen.izquierda + ancho_leyenda_y}px `
                }"></p>      
            </div>
		</div>
		<slot name="pie"></slot>
	</div>
</template>

<script>
	import * as d3 from "d3";

	export default {
		name: 'DaiBarrasApiladas',
		props: {
			barras_apiladas_id: String,
			datos: Array,
			variables: {
				type: Array,
				default: function() {return []}
			},
			nombre_barra: String,
			nombre_color: String,
			titulo_eje_y: String,
			titulo_eje_x: String,			
			ancho_tooltip:{
				type:Number,
				default:195
			},
			margen: {
				type: Object,
				default: function(){return {arriba:20,abajo:50,izquierda:60,derecha:20}}
			},
			alto_vis: {
				type: Number,
				default: function(){return 180}
			},
			
			/*tooltip_activo: {
				type: Boolean,
				default: function() {return true}
			},
			espaciado_barras:{
				type: Number,
				default: function() {return .3}
			},
			textoTooltip: {
				type: Function, 
				default: function(){
					var txt = []
					this.variables.map((d)=>{
						txt.push(  `<p><span class="nomenclatura-tooltip" style="background: ${d.color}"></span> 
						${d[this.nombre_color]} | <b>${this.tooltip_data_seleccionada[d.id].toLocaleString("en")}</b> 
						</p>` )
					})

					return `<p>${this.tooltip_categoria}</p> 
						${txt.reverse().join(" ")}`
				}
			}*/
		},
		watch:{

		},
		
		data(){
			return{
				width:200,
                ancho_leyenda_y:0
			}
		},
		mounted(){
			
		},
		methods:{
			configurandoDimensionesParaSVG(){
                 
			},

			configurandoDimensionesParaBarras(){
				
				
			},
			creandoBarras(){
				
			},
			actualizandoBarras(){
				
			},
			
			reescalandoPantalla(){

			},
			mostrarTooltip(){
				
			},
			cerrarTooltip() {
				
			},
			
		}
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	$border-radius-tarjeta:10px;
    svg.svg-barras-apiladas{
        position:absolute;
        top:0;
    }
	svg.svg-barras-apiladas::v-deep text{
		font-family: "Montserrat";

	}
	div.contenedor-tooltip-svg{
		position: relative;
        .rotation-wrapper-outer {
            display: table;
            .rotation-wrapper-inner {
                padding: 50% 0;
                height: 0;
                .element-to-rotate {
                    display: block;
                    transform-origin: top left;
                    //transform: rotate(-90deg) translate(-100%);
                    margin-top: -50%;
                    font-size: 12px;
                    text-align: center;
                    font-weight: 600;
                }
            }
        }
        div.eje-x{
            position: relative;
            width: 100%;
            text-align: center;
            font-size: 12px;
            text-align: center;
            font-weight: 600;
        }
        

		div.tooltip {
            color:#fff;
            font-size: 12px;
            position: absolute;
            z-index: 2;
			visibility: hidden;
        }
        div.tooltip::v-deep 
            div.tooltip-cifras{
                padding-bottom:5px;
                p{
                    margin: 3px;
                    span.nomenclatura-tooltip{
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        border: solid 1px rgba(255, 255, 255, .7 );
                        display: inline-block;
                    }
                }

		}
        div.tooltip div.contenedor-boton-cerrar{
            height: auto;
            display: flex;
            width: 100%;
            padding-top:5px;
            font-weight: 600;
        }
        div.tooltip button.boton-cerrar-tooltip{
            background: #fff;
            border:none;
			font-size: 30px;
			line-height: .9;
			font-weight: 300;
            padding: 0 5px;
			border-radius: 5px;
			margin: 0 0 0 auto;
            @media (min-width: 768px) {
                display: none;	
            }
            cursor:pointer;
            img{
                width:30px;
                height: 30px;
                float:right;
            }
        }
}
</style>
