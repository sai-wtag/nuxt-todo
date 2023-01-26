import { shallowMount } from '@vue/test-utils'
import LandingPage from '@/pages/index'

describe('LandingPage', () => {
  test('todo component exists', () => {
    const wrapper = shallowMount(LandingPage)
    expect(wrapper.exists()).toBe(true)
  })
})
