<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa
        :colapsada="false"
        altura-colapsada="300px"
        etiqueta-colapso="Abrir"
        etiqueta-no-colapso="<strong>Cerrar</strong>"
        >
            <template v-slot:header>  
                <h3>Titulo del mapa</h3> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vitae enim, sit, accusantium rerum magnam perferendis doloribus cupiditate nostrum consequuntur voluptas dolorem commodi non! Quod reiciendis quisquam itaque magnam temporibus
            </template>
            <dai-mapa>
                <dai-capa-xyz/>
            </dai-mapa>

            <template v-slot:footer>  
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vitae enim, sit, accusantium rerum magnam perferendis doloribus cupiditate nostrum consequuntur voluptas dolorem commodi non! Quod reiciendis quisquam itaque magnam temporibus</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vitae enim, sit, accusantium rerum magnam perferendis doloribus cupiditate nostrum consequuntur voluptas dolorem commodi non! Quod reiciendis quisquam itaque magnam temporibus</p>
                
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>