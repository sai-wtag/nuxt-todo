import { shallowMount } from '@vue/test-utils'
import FilterOptions from '@/components/todo/FilterOptions.vue'

describe('FilterOptions.vue', () => {
  const wrapper = shallowMount(FilterOptions, {
    mocks: {
      $t: (msg) => msg,
    },
  })

  const div = wrapper.find('div')

  test('div exists', () => {
    expect(div.exists()).toBe(true)
  })

  test('3 buttons exists', () => {
    const buttons = div.findAll('button')
    expect(buttons.length).toBe(3)
  })
})
