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
      $moment: (i) => {
        return {
          format: (i) => i,
        }
      },
    },
  })
  const div = wrapper.find('div').find('div')

  test('3 action buttons exists', () => {
    const buttons = div.findAll('button')
    expect(buttons.length).toBe(3)
  })

  test('button text', () => {
    const buttons = div.findAll('button')
    expect(buttons.at(0).text()).toBe('Complete')
    expect(buttons.at(1).text()).toBe('Edit')
    expect(buttons.at(2).text()).toBe('Delete')
  })
})
