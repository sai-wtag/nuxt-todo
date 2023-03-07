import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import { todos } from '@/test/mocks/stores/todos.js'

import TodoIndex from '@/components/todo/Index.vue'
import TodoHeader from '@/components/todo/Header.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'
import SplashScreen from '@/components/todo/utils/SplashScreen.vue'

let store

beforeEach(() => {
  store = new Store({
    modules: {
      todos,
    },
  })
})

const wrapperFactory = () => {
  const mounted = shallowMount(TodoIndex, { localVue, store })
  return mounted
}

describe('@/components/todo/Index.vue', () => {
  describe('When todo list is not loading', () => {
    it('Do not render @/components/todo/utils/SplashScreen.vue', () => {
      const wrapper = wrapperFactory()
      const splashScreenComponent = wrapper.findComponent(SplashScreen)
      expect(splashScreenComponent.exists()).toBe(false)
    })

    it('Render @/components/todo/Header.vue', () => {
      const wrapper = wrapperFactory()
      const todoHeaderComponent = wrapper.findComponent(TodoHeader)
      expect(todoHeaderComponent.exists()).toBe(true)
    })

    it('Render @/components/todo/TodoContainer.vue', () => {
      const wrapper = wrapperFactory()
      const todoContainerComponent = wrapper.findComponent(TodoContainer)
      expect(todoContainerComponent.exists()).toBe(true)
    })
  })
})
