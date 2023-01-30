export const state = () => ({
  locals: [
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'বাংলা' },
  ],
  currentLocale: { code: 'en', name: 'English' },
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
