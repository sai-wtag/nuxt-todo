import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import uuid4 from 'uuid4'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'

import TodoActions from '@/components/todo/utils/TodoActions.vue'
import CompleteIcon from '@/icons/CompleteIcon.vue'
import EditIcon from '@/icons/EditIcon.vue'
import DeleteIcon from '@/icons/DeleteIcon.vue'

const i18n = new VueI18n({
  locale: 'en',
  messages: i18nMock,
})

const wrapperFactory = () => {
  const mounted = shallowMount(TodoActions, {
    localVue,
    i18n,
    propsData: {
      todo: {
        id: uuid4(),
        title: 'Todo 1',
        completedAt: null,
        createdAt: new Date(),
      },
    },
    computed: {
      isTodoCompleted: () => false,
    },
  })
  return mounted
}

describe('@/components/todo/utils/TodoActions.vue', () => {
  describe('When todo is not completed', () => {
    it('@/icons/CompleteIcon.vue exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(CompleteIcon).exists()).toBe(true)
    })

    it('@/icons/EditIcon.vue exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(EditIcon).exists()).toBe(true)
    })
  })

  describe('When todo is completed', () => {
    it('@/icons/DeleteIcon.vue exists', () => {
      const wrapper = wrapperFactory()
      expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true)
    })
  })
})
