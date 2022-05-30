<template>
  <div id="app">
    <header>
      <h1>DAI Componente Boxplot</h1>
    </header>    
    <DaiBoxPlot
      :caja_id="'boxplot1'" 
      :datos="datos"
      :variables="{'grupos':'Clase_social','variable_dist':'CD4_A','color':'#000'}"
      :titulo_eje_y="'Linfocitos por ml\u00B3 de sangre'"
			:titulo_eje_x="'Clase social'"
      ref="cajitas_fosfofosfo"
    />
    <footer>
      <p>componente de vue creado por el equipo de desarrollo de la dai. actualmente en desarrollo.</p>
    </footer>

  </div>
</template>

<script>
import linfodatos from "./linfodatos.json"
export default {
  name: 'ej',

  data:function(){
    return {
      datos:linfodatos,
      

    }
  },
  mounted:function(){
    this.datos2=this.datos;
    this.$refs.cajitas_fosfofosfo.svg
      


  },
  methods:{
   
    cambiaBase(){
        let ef =this.datos2;
        ef= ef.map((d) => ({'Clase_social':d.Clase_social,'CD4_A':d3.randomNormal(.4,.1)()}))
        this.datos=ef;
      
      let valores_unicos = [...new Set(this.datos.map(d => d.Clase_social))]
   
    },

  }
}
</script>

<style lang="scss">
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
</style>
