<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3>Control de opacidad</h3> 
                
            </template>
            <dai-mapa :zoom="3">
                <dai-capa-xyz-osm id="capa_base" :opacidad=".5"/>
            </dai-mapa>

            <template v-slot:footer>  
                <dai-opacidad-mapa :value=".5" capaId="capa_base"/>
                
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>