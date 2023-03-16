import { jest, describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import { Store } from 'vuex'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'
import { todos } from '@/test/mocks/stores/todos.js'

import AddTodoCard from '@/components/todo/AddTodoCard.vue'
import TodoCardLoader from '@/components/todo/utils/TodoCardLoader.vue'
import CompleteIcon from '@/icons/CompleteIcon.vue'
import DeleteIcon from '@/icons/DeleteIcon.vue'

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
  const mounted = mount(AddTodoCard, {
    localVue,
    i18n,
    store,
    ...additionalData,
  })
  return mounted
}

describe('@/components/todo/AddTodoCard.vue', () => {
  describe('When todo is creating or updating', () => {
    it(`render @/components/todo/utils/TodoCardLoader.vue`, () => {
      const wrapper = wrapperFactory({
        computed: {
          isTodoCreatingOrUpdating: () => true,
        },
      })
      expect(wrapper.findComponent(TodoCardLoader).exists()).toBe(true)
    })
  })

  describe('Form tests', () => {
    beforeEach(() => {
      jest.spyOn(HTMLAudioElement.prototype, 'play')
      const playMock = jest.fn()
      HTMLAudioElement.prototype.play = playMock
    })

    describe('clicks submit button', () => {
      it(`calls 'submitHandler'`, async () => {
        const wrapper = wrapperFactory()
        const submitHandler = jest.spyOn(wrapper.vm, 'submitHandler')
        await wrapper.find('button.btn__save').trigger('submit')
        expect(submitHandler).toHaveBeenCalled()
      })
    })

    describe('Show required validation error', () => {
      it(`If title is empty`, async () => {
        const wrapper = wrapperFactory()
        await wrapper.find('button.btn__save').trigger('submit')
        expect(wrapper.vm.errorMessage).toBe(
          i18nMock[currLocale].validation.todo.title.required
        )
      })

      it(`If title is less than min length`, async () => {
        const wrapper = wrapperFactory()
        wrapper.setData({
          form: {
            title: 't',
          },
        })
        await wrapper.find('button.btn__save').trigger('submit')
        const errorMessage = `Title must be at least ${wrapper.vm.validationRules.title.minLength} characters`
        expect(wrapper.vm.errorMessage).toBe(errorMessage)
      })

      it(`If title is more than max length`, async () => {
        const wrapper = wrapperFactory()
        wrapper.setData({
          form: {
            title: 't'.repeat(wrapper.vm.validationRules.title.maxLength + 1),
          },
        })
        await wrapper.find('button.btn__save').trigger('submit')
        const errorMessage = `Title must be at most ${wrapper.vm.validationRules.title.maxLength} characters`
        expect(wrapper.vm.errorMessage).toBe(errorMessage)
      })
    })
  })

  describe('when todo is in editing state', () => {
    it(`render 'save' text`, () => {
      const wrapper = wrapperFactory({
        propsData: {
          isTodoEditing: true,
        },
      })
      expect(wrapper.find('.btn__save').text()).toBe(i18nMock[currLocale].save)
    })

    it(`render @/icons/CompleteIcon.vue`, () => {
      const wrapper = wrapperFactory({
        propsData: {
          isTodoEditing: true,
        },
      })
      expect(wrapper.findComponent(CompleteIcon).exists()).toBe(true)
    })
  })

  describe('when todo is not in editing state', () => {
    it(`render 'add' text`, () => {
      const wrapper = wrapperFactory({
        propsData: {
          isTodoEditing: false,
        },
      })
      expect(wrapper.find('.btn__save').text()).toBe(i18nMock[currLocale].add)
    })

    it(`does not render @/icons/CompleteIcon.vue`, () => {
      const wrapper = wrapperFactory({
        propsData: {
          isTodoEditing: false,
        },
      })
      expect(wrapper.findComponent(CompleteIcon).exists()).toBe(false)
    })
  })

  describe('common functionalities', () => {
    it(`render @/icons/DeleteIcon.vue`, () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true)
    })
  })
})
