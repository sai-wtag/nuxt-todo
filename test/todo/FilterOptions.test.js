import { shallowMount } from '@vue/test-utils'
import FilterOptions from '@/components/todo/FilterOptions.vue'

describe('FilterOptions.vue', () => {
  const wrapper = shallowMount(FilterOptions)
  const div = wrapper.find('div')

  test('div exists', () => {
    expect(div.exists()).toBe(true)
  })

  test('3 buttons exists', () => {
    const buttons = div.findAll('button')
    expect(buttons.length).toBe(3)
  })

  test('button text', () => {
    const buttons = div.findAll('button')
    expect(buttons.at(0).text()).toBe('All')
    expect(buttons.at(1).text()).toBe('Incomplete')
    expect(buttons.at(2).text()).toBe('Complete')
  })
})
