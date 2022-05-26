<template>
    <div>
		<button @click="cambiaDatos"> cambia datos</button>
        <DaiBarrasApiladas
            :barras_apiladas_id="'barras_basicas_1'" 
            :datos="datos"

            :variables='variables_ejemplo_basico'
            :nombre_barra="'nombre_rectangulos'"
            :nombre_color="'nombre_colores'"
            titulo_eje_y="Eje vertical"
            titulo_eje_x="Eje horizontal"
            :margen="{arriba:20,abajo:50,izquierda:30,derecha:20}"
			ref="barritas1"
        />
    </div>
</template>
<script>

import *  as d3 from "d3";

export default {
	name:"BarrasBasico",
  data:function(){
    return {
		algo: true,
		datos: [
                {nombre_rectangulos:'Nombre de variable 1 ', cantidad_1_total:120,cantidad_2_total:40,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 2 ', cantidad_1_total:100,cantidad_2_total:30,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 3 ', cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:540, cantidad_1_porcentaje:30,cantidad_2_porcentaje:60,cantidad_3_porcentaje:10 },
                {nombre_rectangulos:'Nombre de variable 4 ', cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 5 ', cantidad_1_total:40,cantidad_2_total:130,cantidad_3_total:1, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
            ],
		datos_1: [
                {nombre_rectangulos:'Nombre de variable 1 ', cantidad_1_total:120,cantidad_2_total:40,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 2 ', cantidad_1_total:100,cantidad_2_total:30,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 3 ', cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:540, cantidad_1_porcentaje:30,cantidad_2_porcentaje:60,cantidad_3_porcentaje:10 },
                {nombre_rectangulos:'Nombre de variable 4 ', cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 5 ', cantidad_1_total:40,cantidad_2_total:130,cantidad_3_total:1, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
            ],
		datos_2: [
			{nombre_rectangulos:'Nombre de variable 1 ', cantidad_1_total:20,cantidad_2_total:40,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 2 ', cantidad_1_total:180,cantidad_2_total:30,cantidad_3_total:40, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 3 ', cantidad_1_total:30,cantidad_2_total:130,cantidad_3_total:540, cantidad_1_porcentaje:40,cantidad_2_porcentaje:60,cantidad_3_porcentaje:0 },
                {nombre_rectangulos:'Nombre de variable 4 ', cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:40, cantidad_1_porcentaje:33,cantidad_2_porcentaje:33,cantidad_3_porcentaje:33 },
                {nombre_rectangulos:'Nombre de variable 5 ', cantidad_1_total:50,cantidad_2_total:130,cantidad_3_total:1, cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0 },
		],
		variables_ejemplo_basico: [
                {"id":"cantidad_1_total","nombre_colores":"cantidad 1","color":"yellow"},
                {"id":"cantidad_2_total","nombre_colores":"cantidad 2","color":"magenta"},
                {"id":"cantidad_3_total","nombre_colores":"cantidad 3","color":"blue"},
            ]
		
    }
  },
  mounted(){
  },
  methods: {
		cambiaDatos(){
			if(this.algo){
				this.datos = this.datos_2;
				this.variables_ejemplo_basico = [
					{"id":"cantidad_1_total","nombre_colores":"cantidad 1","color":"yellow"},
					{"id":"cantidad_2_total","nombre_colores":"cantidad 2","color":"magenta"},
					{"id":"cantidad_3_total","nombre_colores":"cantidad 2","color":"red"}
				]
			}
			else{
				this.datos = this.datos_1;
				this.variables_ejemplo_basico = [
					{"id":"cantidad_1_porcentaje","nombre_colores":"cantidad 1","color":"cyan"},
					{"id":"cantidad_2_porcentaje","nombre_colores":"cantidad 2","color":"green"},
					{"id":"cantidad_3_porcentaje","nombre_colores":"cantidad 2","color":"purple"}
				]
			}
			this.algo = !this.algo
			this.$refs["barritas1"].grupo_fondo.append("circle")
				.style("fill","var(--variable)")
				.attr("cx",this.$refs["barritas1"].ancho *.5)
				.attr("cy",this.$refs["barritas1"].alto *.5)
				.attr("r",this.$refs["barritas1"].alto *.25)

		}

  }
}
</script>

<style lang="scss">
$border-radius-tarjeta:10px;
:root { --variable: yellow } 


div.contenedor-barras-apiladas-elaboradas {
		width: 100%;
		border: solid black 1px;
		border-radius: $border-radius-tarjeta;
		position: relative;
		
	}

div.encabezado{
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
div.leyenda-barras-apiladas{
		div.contenedor-switch{
			display: inline-flex;
			margin: 10px  20px 0 0;
			box-shadow: 0px 3px 6px #00000029;
			button{
				border: none;

				font-size: 14px;
				margin: 0px;
				padding: 10px;
				&.button-right{
					border-radius:  0 3px 3px 0;
				}
				&.button-left{
					border-radius:  3px 0 0 3px;
				}
				&.activo {
					background: #FFFFFF;
					color: #141414;
				}
			}
		
	}
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		border-radius: $border-radius-tarjeta;
		box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
		margin-bottom:10px;
	}

div.nomenclatura{
	margin-top: 15px;
	display: flex;
	justify-content: space-around;
	width: 100%;
	div.checkbox{
		margin: 0;
		padding: 5px 10px;
		display: flex;
		.color{
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
</style>
