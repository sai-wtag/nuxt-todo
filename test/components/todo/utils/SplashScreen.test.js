import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

import localVue from '@/test/utils/localVue.js'
import i18nMock from '@/test/mocks/i18nMock.js'

import SplashScreen from '@/components/todo/utils/SplashScreen.vue'
import ProjectLogo from '@/icons/ProjectLogo.vue'

const i18n = new VueI18n({
  locale: 'en',
  messages: i18nMock,
})

const wrapperFactory = () => {
  const mounted = shallowMount(SplashScreen, { localVue, i18n })
  return mounted
}

describe('@/components/todo/utils/SplashScreen.vue', () => {
  it('@/icons/ProjectLogo.vue exists', () => {
    const wrapper = wrapperFactory()
    const projectLogo = wrapper.findComponent(ProjectLogo)
    expect(projectLogo.exists()).toBe(true)
  })

  it('Render project title', () => {
    const wrapper = wrapperFactory()
    const projectTitle = wrapper.find('span.project-title')
    expect(projectTitle.text()).toBe(i18nMock.en.todos)
  })
})
