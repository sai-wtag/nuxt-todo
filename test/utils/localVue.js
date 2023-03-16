import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueI18n)

export default localVue
