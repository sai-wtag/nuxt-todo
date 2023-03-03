import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'

import TodoCardLoader from '@/components/todo/utils/TodoCardLoader.vue'
import LoaderIcon from '@/icons/LoaderIcon.vue'

const wrapperFactory = () => {
  const mounted = shallowMount(TodoCardLoader)
  return mounted
}

describe('@/components/todo/utils/TodoCardLoader.vue', () => {
  it('@/icons/LoaderIcon.vue exists', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.findComponent(LoaderIcon).exists()).toBe(true)
  })
})
