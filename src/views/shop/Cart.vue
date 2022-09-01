<template>
    <div class="cart">
        <div class="cart__left">
            <div class="cart__left__icon">
                <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261637089.png" 
                alt=""
                class="cart__left__icon__image"/>
                <span class="cart__left__icon__number">{{total}}</span>
            </div>
            <div class="cart__left__count">
                总计：<span class="cart__left__count__price">￥128</span>
            </div>
        </div>
    <div class="cart__right">去结算</div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
	name: "Cart",
	setup(){
		const store = useStore();
		const route = useRoute();
		//获取商铺id
		const shopId = route.params.id;
		//获取购物车数据
		const cartData = store.state.cartData;
		//定义计算属性，计算总量
		const total = computed(()=>{
			//获取当前商铺的所有商品
			const itemList = cartData[shopId];
			//计算总量
			let count = 0;
			//如果没有记录,不用计算直接返回，如果有酒遍历
			if(itemList){
				for (const key in itemList) {
					count+=itemList[key].count;
				}
			}
			return count;
		})
		return {total}
	}
};
</script>

<style lang="scss" scoped>
.cart {
	box-shadow: 0 -1px 1px 0 #f1f1f1;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 49rem;
	// background-color: olivedrab;
	display: flex;
	justify-content: space-between;
	&__left {
		display: flex;
		align-items: center;
		&__icon {
			position: relative;
			margin-left: 24px;
			margin-right: 32px;
			&__image {
				width: 28px;
				height: 26px;
			}
			&__number {
				display: block;
				width: 20px;
				height: 20px;
				background: #e93b3b;
				border-radius: 100%;
				font-family: PingFangSC-Medium;
				font-size: 16px;
				transform: scale(0.5, 0.5);
				transform-origin: center top;
				color: #ffffff;
				text-align: center;
				position: absolute;
				right: -10px;
				top: -4px;
			}
		}
		&__count {
			display: flex;
			align-items: center;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #333333;
			&__price {
				font-family: PingFangSC-Medium;
				font-size: 18px;
				color: #e93b3b;
			}
		}
	}
	&__right {
		width: 98px;
		height: 49px;
		background-color: #4fb0f9;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #ffffff;
		text-align: center;
		line-height: 49px;
	}
}
</style>