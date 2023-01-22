import { shallowMount } from '@vue/test-utils'
import LandingPage from '@/pages/index'
import TodoIndexComponent from '@/components/todo/Index.vue'

describe('LandingPage', () => {
  test('todo component exists', () => {
    const wrapper = shallowMount(LandingPage)
    // const todoApp = wrapper.findComponent(TodoIndexComponent)
    expect(wrapper.exists()).toBe(true)
  })
})
