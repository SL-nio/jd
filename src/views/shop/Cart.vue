<template>
	<div class="cart">
		<!-- 详情信息 -->
		<div class="cart__detail">
			<div v-for="item of cartItems" :key="item.id" class="cart__detail__item">
				<div class="cart__detail__item__left">
					<img :src="item.imgUrl" alt="" class="cart__detail__item__left__image" />
				</div>
				<div class="cart__detail__item__right">
					<div class="cart__detail__item__right__top">{{ item.name }}</div>
					<!-- <div class="cart__detail__item__right__middle">{{ item.sales }}</div> -->
					<div class="cart__detail__item__right__bottom">
						<div class="cart__detail__item__right__bottom__price">
							<div class="cart__detail__item__right__bottom__price__promotion">￥{{ item.promotionPrice }}
							</div>
							<div class="cart__detail__item__right__bottom__price__original">￥{{ item.originalPrice }}
							</div>
						</div>
						<div class="cart__detail__item__right__bottom__count">
							<span class="cart__detail__item__right__bottom__count__minus-iconfont iconfont"
								v-show="cartData?.[shopId]?.[item.id]?.['count']"
								@click="() => { changeItemToCart(shopId, item.id, item, -1) }">
								&#xe8c5;
							</span>
							<span class="cart__detail__item__right__bottom__count__number"
								v-show="cartData?.[shopId]?.[item.id]?.['count']">
								{{ cartData?.[shopId]?.[item.id]?.['count'] }} </span>
							<!-- 使用了?.语法, 找不到会返回 undefined, 不会报错 -->
							<span @click="() => { changeItemToCart(shopId, item.id, item, 1) }"
								class="cart__detail__item__right__bottom__count__plus-iconfont iconfont"> &#xe601;
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cart__count">
			<!-- 购物车总计 -->
			<div class="cart__count__left">
				<div class="cart__count__left__icon">
					<img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261637089.png" alt=""
						class="cart__count__left__icon__image" />
					<span class="cart__count__left__icon__number">{{ total }}</span>
				</div>
				<div class="cart__count__left__count">
					总计：<span class="cart__count__left__count__price">{{ sumPrice }}</span>
				</div>
			</div>
			<div class="cart__count__right">去结算</div>
		</div>

	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { commonCartEffect } from './commonCartEffect';

const useCartEffect =()=>{
	const store = useStore();
		const route = useRoute();
		//获取商铺id
		const shopId = route.params.id;
		//获取购物车数据
		const cartData = store.state.cartData;
		//定义计算属性，计算总量
		const total = computed(() => {
			//获取当前商铺的所有商品
			const itemList = cartData[shopId];
			//计算总量
			let count = 0;
			//如果没有记录,不用计算直接返回，如果有酒遍历
			if (itemList) {
				for (const key in itemList) {
					count += itemList[key].count;
				}
			}
			return count;
		})
		//定义计算总价，sumPrice
		const sumPrice = computed(() => {
			//获取商铺所有商品
			const itemList = cartData[shopId]
			//计算总价
			let sum = 0.0
			//如果没有数量记录，不用计算总量，直接返回，如果有则遍历计算
			if (itemList) {
				for (const key in itemList) {
					sum += itemList[key].count * itemList[key].promotionPrice
				}
			}
			return sum.toFixed(2)
		})
		const cartItems = computed(()=>{
			const cartItems =cartData[shopId] || []
			return cartItems
		})
		return { total, sumPrice, cartItems,shopId }
}

export default {
	name: "Cart",
	setup() {
		const { cartData,changeItemToCart } = commonCartEffect();
		const { total, sumPrice, cartItems,shopId } =useCartEffect()
		return { total, sumPrice, cartItems,cartData,shopId,changeItemToCart }
	}
};
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';

.cart {
	&__detail {
		position: fixed;
		background-color: #fff;
		width: 375px;
		bottom: 49px;
		left: 0;
		&__item {
			margin: 0 18rem 12rem 16rem;
			display: flex;
			// border-bottom: 1rem solid #f1f1f1;

			&__left {
				margin-right: 16rem;

				&__image {
					width: 46rem;
					height: 46rem;
					// margin-bottom: 12rem;
				}
			}

			&__right {
				flex-grow: 1;

				&__top {
					@include ellipsis;
					width: 181px;
					font-family: PingFangSC-Medium;
					font-size: 14rem;
					color: #333333;
					margin-bottom: 8rem;
				}

				&__middle {
					font-family: PingFangSC-Regular;
					font-size: 12rem;
					color: #333333;
					line-height: 16rem;
					margin-bottom: 8rem;
				}

				&__bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;

					&__price {
						display: flex;
						align-items: center;

						&__promotion {
							font-family: PingFangSC-Semibold;
							font-size: 14rem;
							color: #e93b3b;
							line-height: 20rem;
							margin-right: 8rem;

							&::first-letter {
								font-size: 12rem;
							}
						}

						&__original {
							font-family: PingFangSC-Regular;
							font-size: 10rem;
							color: #999999;
							line-height: 20rem;

							&::first-letter {
								font-size: 12rem;
							}
						}
					}

					&__count {
						display: flex;
						align-items: center;

						&__minus-iconfont {
							color: #666666;
							font-size: 20rem;
						}

						&__number {
							font-family: PingFangSC-Regular;
							font-size: 14rem;
							color: #333333;
							margin-left: 10rem;
							margin-right: 10rem;
						}

						&__plus-iconfont {
							font-size: 17rem;
							color: #0091ff;
						}
					}
				}
			}
		}
	}

	&__count {
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
					min-width: 20px;
					height: 20px;
					background: #e93b3b;
					border-radius: 10rem;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					transform: scale(0.5, 0.5);
					transform-origin: left top;
					color: #ffffff;
					text-align: center;
					position: absolute;
					left: 24rem;
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
}
</style>