import { createStore } from 'vuex'

export default createStore({
  state: {
    cartData:{

    },
  },
  getters: {
  },
  mutations: {
    changeItemToCart(state,payload){
      const {shopId,itemId,itemInfo,num} = payload
      //判断对应的商铺id有没有对应的数据
      const shopInfo = state.cartData[shopId] || {}
      //判断商铺下有没有对应的商品数据
      let item = null 
      if(shopInfo[itemId]){
        item = shopInfo[itemId]
      }else{
        item = itemInfo
        item.count = 0
      }
      //数量+1或者减1
      item.count+=num
      //把商品的相关信息，加入到对应的商铺里面
      shopInfo[itemId] = item
      //把对应的商铺信息写入到cartdate里面
      state.cartData[shopId] = shopInfo

    }
  },
  actions: {
  },
  modules: {
  }
})
