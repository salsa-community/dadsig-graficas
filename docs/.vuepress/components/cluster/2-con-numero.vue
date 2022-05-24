<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['cluster-basico','sin-cluster']"/>
        </template>
        <DaiMapa>
            <DaiCapaXyz />
            <DaiCapaGeojson 
            id="sin-cluster"
            titulo="Capa sin cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            />
            <DaiCapaGeojsonCluster 
            id="cluster-basico"
            titulo="Capa con cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'red'},
                    stroke:{color:'black',width:1},
                    radius:9
                },
                textStyle:{
                    text:'-',
                    fill:{color:'white'}
                }
            }"
            :usarTexturasEnRelleno="false"
            :props-asigna-estilo="['textStyle.text']"
            :fn-asigna-estilo="(f)=>[f.features.length.toString()]"
            />
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>