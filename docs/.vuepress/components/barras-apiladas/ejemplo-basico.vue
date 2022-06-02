<template>
  <div>
    <DaiBarrasApiladas
      :barras_apiladas_id="'barras_basicas'"
      :datos="[
        {
          nombre_rectangulos: 'Nombre de variable 1 ',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'Nombre de variable 2 ',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: 'yellow' },
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: 'magenta' },
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: 'blue' },
      ]"
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
  name: "ejemplo-basico",
};
</script>
