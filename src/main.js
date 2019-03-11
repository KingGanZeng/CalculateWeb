// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/common.less';
import './assets/font-style.css';
import App from './App';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(VueCookie);
Vue.use(ElementUI, { locale });

/**
 * @return {string}
 */
function InitLanguage() {
  console.log(Vue.cookie.get('DefaultLanguage'));
  return Vue.cookie.get('DefaultLanguage') == null ? 'en' : Vue.cookie.get('DefaultLanguage');
}
const i18n = new VueI18n({
  locale: InitLanguage(),
  messages: {
    // eslint-disable-next-line
    'en': Object.assign(require('../static/lang/en'), enLocale),
    // eslint-disable-next-line
    'zh-CN': Object.assign(require('../static/lang/zh-CN'), zhLocale),
  },
});
locale.i18n((key, value) => {
  i18n.t(key, value);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  components: { App },
  template: '<App/>',
});
