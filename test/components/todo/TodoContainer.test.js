import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import TodoContainer from '@/components/todo/TodoContainer.vue'
import TodoCardLoader from '@/components/todo/utils/TodoCardLoader.vue'
import FilterOptions from '@/components/todo/FilterOptions.vue'
import AddTodoCard from '@/components/todo/AddTodoCard.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoNotFound from '@/components/todo/utils/TodoNotFound.vue'
import TodoFooter from '@/components/todo/utils/TodoFooter.vue'
import PlusIcon from '@/icons/PlusIcon.vue'

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
  const mounted = shallowMount(TodoContainer, {
    localVue,
    i18n,
    store,
    ...additionalData,
  })
  return mounted
}

describe('@/components/todo/TodoContainer.vue', () => {
  describe('searching state', () => {
    it('render @/components/todo/utils/TodoCardLoader.vue in searching state', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoSearching: () => true,
        },
      })
      expect(wrapper.findComponent(TodoCardLoader).exists()).toBe(true)
    })

    it('does not render @/components/todo/utils/TodoCardLoader.vue not in searching state', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoSearching: () => false,
        },
      })
      expect(wrapper.findComponent(TodoCardLoader).exists()).toBe(false)
    })
  })

  it('render "add-task" text', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.find('span.todo__add-text').text()).toBe(
      i18nMock[currLocale]['add-task']
    )
  })

  describe('render header', () => {
    it('header exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.find('div.todo__header').exists()).toBe(true)
    })

    it('create button exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.find('button.btn__create-task').exists()).toBe(true)
    })

    it('calls "setIsCreating" when "create button" is clicked', async () => {
      const wrapper = wrapperFactory()
      const setIsCreating = jest.fn()
      wrapper.setMethods({ setIsCreating })
      await wrapper.find('button.btn__create-task').trigger('click')
      expect(setIsCreating).toHaveBeenCalled()
    })

    it('@/icons/PlusIcon.vue exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(PlusIcon).exists()).toBe(true)
    })

    it('render "create" text', () => {
      const wrapper = wrapperFactory()
      const span = wrapper.find('.todo__header').find('span')
      expect(span.text()).toBe(i18nMock[currLocale].create)
    })

    it('@/components/todo/FilterOptions.vue exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(FilterOptions).exists()).toBe(true)
    })
  })

  describe('render card container', () => {
    it('card container exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.find('div.card-container').exists()).toBe(true)
    })

    it('render @/components/todo/AddTodoCard.vue if todo is creating', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoCreating: () => true,
        },
      })
      expect(wrapper.findComponent(AddTodoCard).exists()).toBe(true)
    })

    it('does not render @/components/todo/AddTodoCard.vue if todo is creating', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoCreating: () => false,
        },
      })
      expect(wrapper.findComponent(AddTodoCard).exists()).toBe(false)
    })

    it('render todo list if todo is available', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoAvailable: () => true,
        },
      })
      const todoItems = wrapper.findAllComponents(TodoItem)
      expect(todoItems.length).toBe(todos.getters.todos().length)
    })

    it('does not render "todo list" if todo is not available', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoAvailable: () => false,
        },
      })
      const todoItem = wrapper.find('.todo-tem')
      expect(todoItem.exists()).toBe(false)
    })
  })

  describe('@/components/todo/utils/TodoNotFound.vue', () => {
    it('render @/components/todo/utils/TodoNotFound.vue if todo not found', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoFound: () => false,
        },
      })
      expect(wrapper.findComponent(TodoNotFound).exists()).toBe(true)
    })

    it('does not render @/components/todo/utils/TodoNotFound.vue if todo found', () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoFound: () => true,
        },
      })
      expect(wrapper.findComponent(TodoNotFound).exists()).toBe(false)
    })
  })

  describe('@/components/todo/utils/TodoFooter.vue', () => {
    it('render @/components/todo/utils/TodoFooter.vue', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(TodoFooter).exists()).toBe(true)
    })
  })
})
