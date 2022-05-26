import DaiBoxPlot from './DaiBoxPlot.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiBoxPlot.name,DaiBoxPlot);
}

export default plugin;


export { 
    plugin as install,
    DaiBoxPlot
};