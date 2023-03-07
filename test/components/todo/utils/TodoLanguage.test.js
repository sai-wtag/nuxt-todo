import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'
import { BN, EN, ES, FR, IT } from '@/utils/constants'

import TodoLanguage from '@/components/todo/utils/TodoLanguage.vue'

const i18n = new VueI18n({
  locale: 'en',
  messages: i18nMock,
})

let store
beforeEach(() => {
  store = new Store({
    modules: {
      todos,
    },
  })
})

const locales = [BN, EN, ES, FR, IT]
const wrapperFactory = () => {
  const mounted = shallowMount(TodoLanguage, {
    localVue,
    i18n,
    store,
    computed: {
      getLocals: () => locales,
    },
  })
  return mounted
}

describe('@/components/todo/utils/TodoLanguage.vue', () => {
  it(`i18n locale changes after selecting a locale`, async () => {
    const wrapper = wrapperFactory()
    const options = wrapper.find('select').findAll('option')
    const localePosition = 1
    await options.at(localePosition).setSelected()
    expect(wrapper.vm.$i18n.locale).toBe(locales.at(localePosition).code)
  })
})
