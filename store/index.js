export const state = () => ({
  screenWidth: 0,
})

export const getters = {
  screenWidth: (state) => {
    return state.screenWidth
  },
  isMobile: (state) => {
    return state.screenWidth < 768
  },
  isTablet: (state) => {
    return state.screenWidth >= 768 && state.screenWidth < 1024
  },
  isDesktop: (state) => {
    return state.screenWidth >= 1024
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
