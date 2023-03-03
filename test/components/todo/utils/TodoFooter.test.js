import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import TodoFooter from '@/components/todo/utils/TodoFooter.vue'

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

const wrapperFactory = () => {
  const mounted = shallowMount(TodoFooter, {
    localVue,
    i18n,
    store,
    computed: {
      hasMoreTodos: () => true,
      hasLoadedTodos: () => true,
    },
  })
  return mounted
}

describe('@/components/todo/utils/TodoFooter.vue', () => {
  describe('When more tasks are available', () => {
    it(`Render 'load-more' button`, () => {
      const wrapper = wrapperFactory()
      const loadMoreButton = wrapper.find('button.todo-btn__load-more')
      expect(loadMoreButton.exists()).toBe(true)
    })

    it(`Render load-more text`, () => {
      const wrapper = wrapperFactory()
      const loadMoreButton = wrapper.find('button.todo-btn__load-more')
      expect(loadMoreButton.text()).toBe(i18nMock.en['load-more'])
    })

    it(`Call 'loadMoreTodos' action when load-more button is clicked`, async () => {
      const wrapper = wrapperFactory()
      const loadMoreButton = wrapper.find('button.todo-btn__load-more')
      await loadMoreButton.trigger('click')
      expect(todos.actions.loadMoreTodos).toHaveBeenCalled()
    })
  })

  describe('When no more tasks are available', () => {
    it(`Render 'show-less' button`, () => {
      const wrapper = wrapperFactory()
      const showLessButton = wrapper.find('button.todo-btn__show-less')
      expect(showLessButton.exists()).toBe(true)
    })

    it(`Render show-less text`, () => {
      const wrapper = wrapperFactory()
      const showLessButton = wrapper.find('button.todo-btn__show-less')
      expect(showLessButton.text()).toBe(i18nMock.en['show-less'])
    })

    it(`Call 'showLessTodos' action when show-less button is clicked`, async () => {
      const wrapper = wrapperFactory()
      const showLessButton = wrapper.find('button.todo-btn__show-less')
      await showLessButton.trigger('click')
      expect(todos.actions.showLessTodos).toHaveBeenCalled()
    })
  })
})
