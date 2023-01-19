import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent.vue'

describe('TestComponent', () => {
  it('displays the full name', () => {
    const wrapper = shallowMount(TestComponent)
    wrapper.setData({ firstName: 'John', lastName: 'Doe' })
    expect(wrapper.find('p').text()).toBe('John Doe')
  })
})
