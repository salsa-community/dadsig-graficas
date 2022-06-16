/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

//import "dai-maps/dist/dai-maps.css"

//import "../../src/styles/main.scss"

//import DaiMaps from "dai-maps"
//import  DaiMaps from "../../src/index.js"


import { DadsigBarras, DadsigDonas, DadsigSeriesTiempo, DadsigCajasBigotes } from "../../src/index.js"
import "./styles/index.scss"

/*export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(DaiMaps)
  // ...apply enhancements for the site.
}
*/

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(DadsigBarras)
  Vue.use(DadsigDonas)
  Vue.use(DadsigSeriesTiempo)
  Vue.use(DadsigCajasBigotes)
  // ...apply enhancements for the site.
}