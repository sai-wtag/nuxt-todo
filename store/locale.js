import { EN, BN, ES, FR, IT } from '@/utils/constants'

export const state = () => ({
  locals: [BN, EN, ES, FR, IT],
  currentLocale: EN,
})

export const getters = {
  getCurrentLocale: (state) => {
    return state.currentLocale
  },
  getLocals: (state) => {
    return state.locals
  },
}

export const mutations = {
  setLocale: (state, locale) => {
    state.currentLocale = locale
  },
}

export const actions = {
  setLocale: ({ commit }, locale) => {
    commit('setLocale', locale)
  },
}
