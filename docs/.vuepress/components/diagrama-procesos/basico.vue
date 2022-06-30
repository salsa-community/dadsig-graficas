<template>
    <div>
        <DadsigDiagramaProcesos
            :datos="datos"
        />
    </div>
</template>
<script>

</script>
<script>
import procesos from "./diagrama-procesos-actualizado.json"

export default {
    name:"ejemplo-basico-diagrama-procesos",
    data(){
        return {
            datos:procesos
        }
    }
}
</script>
