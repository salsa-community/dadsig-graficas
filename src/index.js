import {
    DaiBarrasApiladas,
    DaiLineas,
    DaiBoxPlot
} from "./components"


export default function plugin(Vue){
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DaiBarrasApiladas)
    Vue.use(DaiLineas)
    Vue.use(DaiBoxPlot)


}

export {
    plugin as install,
    //componentes
    DaiBarrasApiladas,
    DaiLineas,
    DaiBoxPlot


}