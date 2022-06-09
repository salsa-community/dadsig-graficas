<template>
  <div>
    <DaiBarrasApiladas
        :barras_apiladas_id="'barras_simples'"
        :datos="[{categoria: 'Variable A', metrica: 120},
                 {categoria: 'Variable B', metrica: 150},
                 {categoria: 'Variable C', metrica: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Categorías"
        titulo_eje_y="Métrica"
        :tooltip_activo="true"
        :variables="[{id:'metrica', nombre_colores:'metrica', color: '#0080ff'}]"/>
  </div>
</template>

<script>
export default {
  name: "ejemplo-simples",
};
</script>