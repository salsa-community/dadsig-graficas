import DadsigBarras from './DadsigBarras.vue'
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigBarras.name,DadsigBarras)
}

export default plugin;


export { 
    plugin as install,
    DadsigBarras
}