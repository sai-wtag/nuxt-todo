import { shallowMount } from '@vue/test-utils'
import TodoIndexComponent from '@/components/todo/Index.vue'
import TodoHeader from '@/components/todo/Header.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'

describe('TodoIndex', () => {
  const wrapper = shallowMount(TodoIndexComponent)
  const div = wrapper.findAll('div').at(0)

  test('container class exists', () => {
    expect(div.classes('container')).toBe(true)
  })

  test('TodoHeader component exists', () => {
    const searchbar = div.findComponent(TodoHeader)
    expect(searchbar.exists()).toBe(true)
  })

  test('TodoContainer component exists', () => {
    const searchbar = div.findComponent(TodoContainer)
    expect(searchbar.exists()).toBe(true)
  })
})
