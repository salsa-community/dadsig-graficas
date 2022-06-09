import DaiDiagramaCajas from './DaiDiagramaCajas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiDiagramaCajas.name,DaiDiagramaCajas);
}

export default plugin;


export { 
    plugin as install,
    DaiDiagramaCajas
};