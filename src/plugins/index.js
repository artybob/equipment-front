import cookies from "./cookies";
import Vue from "vue";
// import moment from './moment';

export default function(app) {
  const inject = (name, plugin) => {
    const key = `$${name}`;
    app[key] = plugin;
    app.store[key] = plugin;
    Vue.use(() => {
      if (Object.prototype.hasOwnProperty.call(Vue, key)) {
        return;
      }
      Object.defineProperty(Vue.prototype, key, {
        get() {
          return this.$root.$options[key];
        }
      });
    });
  };
  // moment(app, inject);
  cookies(app, inject);
}
