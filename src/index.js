import {
    DadsigBarras,
    DadsigDonas,
    DadsigSeriesTiempo,
    DadsigCajasBigotes
} from "./components"


export default function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DadsigBarras)
    Vue.use(DadsigDonas)
    Vue.use(DadsigSeriesTiempo)
    Vue.use(DadsigCajasBigotes)


}

export {
    plugin as install,
    DadsigBarras,
    DadsigDonas,
    DadsigSeriesTiempo,
    DadsigCajasBigotes
}