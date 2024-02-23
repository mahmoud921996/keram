import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ar from "vuetify/lib/locale/ar";
import cookie from "js-cookie";
import ArrowDown from '@/assets/icons/arrow-down'
import ArabicIcon from '@/assets/icons/arabicIcon'
import EnglishIcon from '@/assets/icons/englishIcon'
import MenuIcon from "@/assets/icons/menuIcon"
import store from "@/store";
import theme from "@/utils/theme"
import { getLanguage } from '@/utils/languages'
Vue.use(Vuetify);


export default new Vuetify({
  rtl: true,
  icons: {
    iconfont: 'mdi',
    values: {
      arrowDown: {
        component: ArrowDown
      },
      menuIcon: {
        component: MenuIcon
      },

      arabicIcon: {
        component: ArabicIcon
      },
      englishIcon: {
        component: EnglishIcon
      }
    }
  },

  theme: {
    themes: theme,
  },
  lang: {
    current: "ar",
    locales: { ar }
  }
});
