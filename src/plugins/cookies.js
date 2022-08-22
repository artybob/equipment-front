import VueCookies from "vue-cookies";
export default function(app, inject) {
  inject("cookies", VueCookies);
}
