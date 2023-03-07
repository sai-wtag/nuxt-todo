import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import TodoNotFound from '@/components/todo/utils/TodoNotFound.vue'
import NotFoundIcon from '@/icons/NotFoundIcon.vue'

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
  const mounted = shallowMount(TodoNotFound, {
    localVue,
    i18n,
    store,
  })
  return mounted
}

describe('@/components/todo/utils/TodoNotFound.vue', () => {
  it(`@/icons/NotFoundIcon.vue exists`, () => {
    const wrapper = wrapperFactory()
    expect(wrapper.findComponent(NotFoundIcon).exists()).toBe(true)
  })

  it('calls "setIsCreating" action when "Not Found" icon is clicked', async () => {
    const wrapper = wrapperFactory()
    await wrapper.findComponent(NotFoundIcon).trigger('click')
    expect(todos.actions.setIsCreating).toHaveBeenCalled()
  })
})
