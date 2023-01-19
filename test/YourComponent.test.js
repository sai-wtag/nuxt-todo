import { mount } from '@vue/test-utils'
import YourComponent from '@/components/YourComponent'

describe('YourComponent', () => {
  test('renders correctly', () => {
    const wrapper = mount(YourComponent)
    expect(wrapper.element).toMatchSnapshot()
  })
  test('is a Vue instance', () => {
    const wrapper = mount(YourComponent)
    expect(wrapper.vm).toBeTruthy()
  })
})
