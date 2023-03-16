import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'

import TodoHeader from '@/components/todo/Header.vue'
import ProjectLogo from '@/icons/ProjectLogo.vue'
import TodoLanguage from '@/components/todo/utils/TodoLanguage.vue'

const i18n = new VueI18n({
  locale: 'en',
  messages: i18nMock,
})

const wrapperFactory = () => {
  const mounted = shallowMount(TodoHeader, { localVue, i18n })
  return mounted
}

describe('@/components/todo/TodoHeader.vue', () => {
  it('@/icons/ProjectLogo.vue exists', () => {
    const wrapper = wrapperFactory()
    const projectLogo = wrapper.findComponent(ProjectLogo)
    expect(projectLogo.exists()).toBe(true)
  })

  it('@/components/todo/utils/TodoLanguage.vue', () => {
    const wrapper = wrapperFactory()
    const todoLanguage = wrapper.findComponent(TodoLanguage)
    expect(todoLanguage.exists()).toBe(true)
  })

  it('Render todo title', () => {
    const wrapper = wrapperFactory()
    const todoTitle = wrapper.find('span.todo__title')
    expect(todoTitle.text()).toBe(i18nMock.en.todos)
  })
})
