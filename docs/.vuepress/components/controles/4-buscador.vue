<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3 v-width-control="'100%'" >Control de busqueda</h3> 
                <dai-buscador-mapa 
                para="estados"
                :acceso-opciones="(f)=>f.nom_edo"
                placeholder="Buscar estado"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-geojson 
                id="estados" 
                :url="$withBase('/sample-edos.geojson')"
                />
            </dai-mapa>

            
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>