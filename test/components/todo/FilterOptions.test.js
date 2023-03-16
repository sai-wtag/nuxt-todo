import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import FilterOptions from '@/components/todo/FilterOptions.vue'

const currLocale = 'en'
const i18n = new VueI18n({
  locale: currLocale,
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

const wrapperFactory = (additionalData) => {
  const mounted = mount(FilterOptions, {
    localVue,
    i18n,
    store,
    ...additionalData,
  })
  return mounted
}

describe('@/components/todo/FilterOptions.vue', () => {
  describe('when screen size is mobile', () => {
    it('select options should appear for filters', () => {
      const wrapper = wrapperFactory({
        computed: {
          isMobile: () => true,
        },
      })
      expect(wrapper.find('select').exists()).toBe(true)
    })

    it('render all the the filter options', () => {
      const wrapper = wrapperFactory({
        computed: {
          isMobile: () => true,
        },
      })
      const options = wrapper.find('select').findAll('option')
      expect(options.length).toBe(todos.getters.getTaskStates().length)
    })

    it(`checks if an option is changed`, async () => {
      const wrapper = wrapperFactory({
        computed: {
          isMobile: () => true,
        },
      })
      const options = wrapper.find('select').findAll('option')
      const position = 1
      await options.at(position).setSelected()
      expect(wrapper.find('option:checked').element.value).toBe(
        todos.getters.getTaskStates()[position]
      )
    })
  })
  describe('when screen size is not mobile', () => {
    it('select options should appear for filters', () => {
      const wrapper = wrapperFactory({
        computed: {
          isMobile: () => false,
        },
      })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('render all the the filter buttons', () => {
      const wrapper = wrapperFactory({
        computed: {
          isMobile: () => false,
        },
      })
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(todos.getters.getTaskStates().length)
    })

    it(`change 'currentTaskState' when an filter button is clicked`, async () => {
      const wrapper = wrapperFactory({
        computed: {
          isMobile: () => false,
        },
      })
      const buttons = wrapper.findAll('button')
      const position = 1
      await buttons.at(position).trigger('click')
      expect(wrapper.vm.currentTaskState).toBe(
        todos.getters.getTaskStates()[position]
      )
    })
  })
})
