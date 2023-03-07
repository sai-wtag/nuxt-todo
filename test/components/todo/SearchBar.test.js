import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import SearchBar from '@/components/todo/SearchBar.vue'
import SearchIcon from '@/icons/SearchIcon.vue'

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

const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren
  },
})

const wrapperFactory = (additionalData) => {
  const mounted = mount(SearchBar, {
    localVue,
    i18n,
    store,
    stubs: {
      transition: transitionStub(),
    },
    computed: {
      searchKey: () => 'search-key',
    },
    ...additionalData,
  })
  return mounted
}

describe('@/components/todo/SearchBar.vue', () => {
  it('render "search input" if input is visible', async () => {
    const wrapper = wrapperFactory()
    await wrapper.setData({ isInputVisible: true })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('does not render "search input" if input is not visible', async () => {
    const wrapper = wrapperFactory()
    await wrapper.setData({ isInputVisible: false })
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('render @/icons/SearchIcon.vue', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.findComponent(SearchIcon).exists()).toBe(true)
  })

  it('toggle input visibility on click', async () => {
    const wrapper = wrapperFactory()
    const isInputVisible = true
    await wrapper.setData({ isInputVisible })
    await wrapper.findComponent(SearchIcon).trigger('click')
    expect(wrapper.vm.isInputVisible).toBe(!isInputVisible)
  })
})
