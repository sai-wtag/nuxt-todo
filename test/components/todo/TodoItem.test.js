import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'
import uuid4 from 'uuid4'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import TodoItem from '@/components/todo/TodoItem.vue'
import TodoCardLoader from '@/components/todo/utils/TodoCardLoader.vue'
import TodoActions from '@/components/todo/utils/TodoActions.vue'
import AddTodoCard from '@/components/todo/AddTodoCard.vue'

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

const todo = {
  id: uuid4(),
  title: 'Test title',
  isLoading: false,
  isEditing: true,
  isCompleted: false,
  completedAt: null,
  createdAt: new Date().toISOString(),
}
const wrapperFactory = (additionalData) => {
  const mounted = shallowMount(TodoItem, {
    localVue,
    i18n,
    store,
    ...additionalData,
    propsData: {
      todo,
    },
  })
  return mounted
}

describe('@/components/todo/TodoItem.vue', () => {
  describe('render "todo-item-container"', () => {
    it('todo-item-container exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.find('div.todo-item-container').exists()).toBe(true)
    })

    it('render @/components/todo/utils/TodoCardLoader.vue if todo is loading', async () => {
      const wrapper = wrapperFactory()
      await wrapper.setProps({
        todo: {
          ...todo,
          isLoading: true,
        },
      })
      expect(wrapper.findComponent(TodoCardLoader).exists()).toBe(true)
    })

    it('does not render @/components/todo/utils/TodoCardLoader.vue if todo not loading', async () => {
      const wrapper = wrapperFactory()
      await wrapper.setProps({
        todo: {
          ...todo,
          isLoading: false,
        },
      })
      expect(wrapper.findComponent(TodoCardLoader).exists()).toBe(false)
    })

    describe('when todo is not editing', () => {
      let wrapper
      beforeEach(() => {
        wrapper = wrapperFactory({
          computed: {
            isTodoEditing: () => false,
          },
        })
      })
      it('render todo item', () => {
        expect(wrapper.find('div.todo-item').exists()).toBe(true)
      })

      it('does not render @/components/todo/AddTodoCard.vue', () => {
        expect(wrapper.findComponent(AddTodoCard).exists()).toBe(false)
      })

      describe('todo header', () => {
        it('render todo item header', () => {
          expect(wrapper.find('div.todo-item__header').exists()).toBe(true)
        })

        it('render todo item title', () => {
          expect(wrapper.find('span.todo-title').exists()).toBe(true)
        })

        it('render "created-at" text', () => {
          expect(wrapper.find('span.time').exists()).toBe(true)
        })
      })

      describe('todo footer', () => {
        it('render todo item footer', () => {
          expect(wrapper.find('div.todo-item__footer').exists()).toBe(true)
        })

        it('render @/components/todo/utils/TodoActions.vue', () => {
          expect(wrapper.findComponent(TodoActions).exists()).toBe(true)
        })

        describe('when todo is completed', () => {
          it('render "completed-at" text', async () => {
            await wrapper.setProps({
              todo: {
                ...todo,
                isCompleted: true,
                completedAt: new Date().toISOString(),
              },
            })
            expect(wrapper.find('button.btn__completed-in').exists()).toBe(true)
          })
        })

        describe('when todo is not completed', () => {
          it('does not render "completed-at" text', async () => {
            await wrapper.setProps({
              todo: {
                ...todo,
                isCompleted: false,
                completedAt: null,
              },
            })
            expect(wrapper.find('button.btn__completed-in').exists()).toBe(
              false
            )
          })
        })
      })
    })

    describe('when todo is editing', () => {
      let wrapper
      beforeEach(() => {
        wrapper = wrapperFactory({
          computed: {
            isTodoEditing: () => true,
          },
        })
      })
      it('does not render todo item if todo not editing', () => {
        expect(wrapper.find('div.todo-item').exists()).toBe(false)
      })

      it('render @/components/todo/AddTodoCard.vue', () => {
        expect(wrapper.findComponent(AddTodoCard).exists()).toBe(true)
      })
    })
  })
})
