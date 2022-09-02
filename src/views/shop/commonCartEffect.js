import { useStore } from 'vuex';
import { toRefs } from 'vue';
//购物车逻辑
export const commonCartEffect = () => {
	//从vuex中获取数据
	const store = useStore();
	const { cartData } = toRefs(store.state);
	//向购物车增加内容，两个参数，一个是商铺id，一个是商品id
	const changeItemToCart = (shopId,itemId,itemInfo,num) =>{
		store.commit('changeItemToCart',{shopId,itemId,itemInfo,num})
	}
	return { cartData,changeItemToCart }
}