import { shallowMount } from '@vue/test-utils'
import TodoIndexComponent from '@/components/todo/Index.vue'
import SearchBarComponent from '@/components/todo/SearchBar.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'

describe('TodoIndex', () => {
  const wrapper = shallowMount(TodoIndexComponent)
  const div = wrapper.findAll('div').at(0)

  test('container class exists', () => {
    expect(div.classes('container')).toBe(true)
  })

  test('header exists', () => {
    expect(div.contains('header')).toBe(true)
  })

  test('SearchBar component exists', () => {
    const header = div.findAll('header').at(0)
    const searchbar = header.findComponent(SearchBarComponent)
    expect(searchbar.exists()).toBe(true)
  })

  test('TodoContainer component exists', () => {
    const searchbar = div.findComponent(TodoContainer)
    expect(searchbar.exists()).toBe(true)
  })
})
