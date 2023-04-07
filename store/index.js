import { SMALL_DEVICE_WIDTH, MEDIUM_DEVICE_WIDTH } from '@/utils/constants'

export const state = () => ({
  screenWidth: SMALL_DEVICE_WIDTH,
})

export const getters = {
  screenWidth: (state) => {
    return state.screenWidth
  },
  isMobile: (state) => {
    return state.screenWidth < SMALL_DEVICE_WIDTH
  },
  isTablet: (state) => {
    return (
      state.screenWidth >= SMALL_DEVICE_WIDTH &&
      state.screenWidth < MEDIUM_DEVICE_WIDTH
    )
  },
  isDesktop: (state) => {
    return state.screenWidth >= MEDIUM_DEVICE_WIDTH
  },
}

export const mutations = {
  SET_SCREEN_WIDTH: (state, screenWidth) => {
    state.screenWidth = screenWidth
  },
}

export const actions = {
  setScreenWidth: ({ commit }, screenWidth) => {
    commit('SET_SCREEN_WIDTH', screenWidth)
  },
}
