import DadsigDiagramaProcesos from './DadsigDiagramaProcesos.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigDiagramaProcesos.name,DadsigDiagramaProcesos);
}

export default plugin;


export { 
    plugin as install,
    DadsigDiagramaProcesos
};