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
      //如果count为0，从商铺的购物车，删除该商品
      if(item.count === 0){
        //从shopInfo中删除item
        delete shopInfo.itemId
      }else{
        //把勾选状态改为true
        item.checked = true
        //把商品的相关信息，加入到对应的商铺里面
      shopInfo[itemId] = item
      }
      
      //如果商铺下面没有商品，那么清楚该商铺
      if(JSON.stringify(shopInfo) === "{}"){
        delete state.cartData[shopId]
      }else{
       //把对应的商铺信息写入到cartdate里面
      state.cartData[shopId] = shopInfo 
      }
      
    },
    changeItemChecked(state,payload){
      const {shopId,itemId} = payload
      //找到对应商品
      const item = state.cartData[shopId][itemId]
      //切换选中状态
      item.checked = ! item.checked
    },
    clearCart(state,payload){
      const {shopId} = payload
      //清空购物车
      state.cartData[shopId] = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
