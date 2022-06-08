<template>
  <div>
    <DaiBarrasApiladas
        id
        :barras_apiladas_id="'barras_simples'"
        :datos="[
                  {categoría: 'Variable A', metrica: 120},
                  {categoría: 'Variable B ', metrica: 150}
                  {categoría: 'Variable C ', metrica: 72}
                ]"
        :variables="[{id: 'metrica', nombre_colores: 'metrica', color: 'blue'}]"
        :nombre_barra="'nombre_rectangulos'"
        :nombre_color="'nombre_colores'"
        titulo_eje_y="Eje vertical"
        titulo_eje_x="Eje horizontal"
        :tooltip_activo="false"
    />
  </div>
</template>


<script>
export default {
  name: "ejemplo-barras-simples",
};
</script>