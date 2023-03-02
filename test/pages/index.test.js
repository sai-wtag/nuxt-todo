import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import { Store } from 'vuex'
import NuxtI18n from 'vue-i18n'

import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'
import localVue from '@/test/utils/localVue.js'

import HomePage from '@/pages/index.vue'
import TodoApp from '@/components/todo/Index.vue'

let store

const i18n = new NuxtI18n({
  locale: 'en',
  messages: i18nMock,
})

beforeEach(() => {
  store = new Store({
    modules: {
      todos,
    },
  })
})

const wrapperFactory = () => {
  const mounted = shallowMount(HomePage, {
    localVue,
    store,
    i18n,
    mocks: {
      $store: {
        dispatch: (item) => item,
      },
    },
  })

  return mounted
}

describe('@/pages/index.vue', () => {
  it('TodoApp component exists', () => {
    const wrapper = wrapperFactory()
    const todoAppComponent = wrapper.findComponent(TodoApp)

    expect(todoAppComponent.exists()).toBe(true)
  })
})
