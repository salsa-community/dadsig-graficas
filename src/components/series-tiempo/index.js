import DaiSeriesTiempo from './DaiSeriesTiempo.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiSeriesTiempo.name,DaiSeriesTiempo);
}

export default plugin;


export { 
    plugin as install,
    DaiSeriesTiempo
};