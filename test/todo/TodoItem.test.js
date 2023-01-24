import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/todo/TodoItem.vue'

describe('TodoItem.vue', () => {
  const wrapper = shallowMount(TodoItem, {
    propsData: {
      todo: {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        completedAt: null,
      },
    },
    mocks: {
      $t: (msg) => msg,
    },
  })
  const div = wrapper.find('div').find('div')

  test('3 action buttons exists', () => {
    const buttons = div.findAll('button')
    expect(buttons.length).toBe(3)
  })
})
