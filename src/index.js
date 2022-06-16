import {
    DadsigBarras,
    DadsigDonas,
    DadsigSeriesTiempo,
    DadsigDiagramaCajas
} from "./components"


export default function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DadsigBarras)
    Vue.use(DadsigDonas)
    Vue.use(DadsigSeriesTiempo)
    Vue.use(DadsigDiagramaCajas)


}

export {
    plugin as install,
    DadsigBarras,
    DadsigDonas,
    DadsigSeriesTiempo,
    DadsigDiagramaCajas
}