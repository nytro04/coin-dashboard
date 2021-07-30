export const state = () => ({
  coins: [],
  coin: {}
})

export const mutations = {
  SET_COINS(state, coins) {
    state.coins = coins
  },

  SET_COIN(state, coin) {
    state.coin = coin
  }
}
export const actions = {
  setCoins({ commit }, coins) {
    commit('SET_COINS', coins)
  },
  setCoin({ commit }, coin) {
    commit('SET_COIN', coin)
  }
}
export const getters = {
  fetchCoins: (state) => state.coins,
  fetchCoin: (state) => state.coin
}
