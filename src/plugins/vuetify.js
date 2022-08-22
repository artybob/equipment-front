import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import '@fortawesome/fontawesome-free/css/all.css'
import ru from 'vuetify/lib/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
    lang: {
        locales: {ru},
        current: 'ru'
    },
    theme: {
        themes: {
            dark: {
                // primary: '#7F2FCB',
                // secondary: '#32B830',
                // accent: '#3F51B5',
            },
        },
    },
})
