import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import LandingPage from '@/components/demo.vue'

describe('LandingPage', () => {
  test('div element exists', () => {
    const wrapper = shallowMount(LandingPage, {
      mocks: {
        // Always returns the input
        $t: (i) => i,
        switchLocalePath: (i) => i,
        $store: (i) => i,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
  })
})
