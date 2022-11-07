export default {
    namespaced: true,
    state: {
      shop: {},
      shopList:[]
    },
    mutations: {
      updateShop (state, shopObj) {
        state.shop = shopObj
      },
      updateShopList (state, shops) {
        state.shopList = shops
      }
    }
  }