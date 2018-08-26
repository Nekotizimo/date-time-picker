import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = false;

require('../src/css/styles.css');

new Vue({
  render: h => h(App)
}).$mount('#app');
