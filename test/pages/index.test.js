import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'

import HomePage from '@/pages/index.vue'
import TodoApp from '@/components/todo/Index.vue'

describe('@/pages/index.vue', () => {
  it('TodoApp component exists', () => {
    const wrapper = shallowMount(HomePage)
    const todoAppComponent = wrapper.findComponent(TodoApp)
    expect(todoAppComponent.exists()).toBe(true)
  })
})
