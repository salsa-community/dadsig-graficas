import DaiBarras from './DaiBarras.vue'
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiBarras.name,DaiBarras)
}

export default plugin;


export { 
    plugin as install,
    DaiBarras
}