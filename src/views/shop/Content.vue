<template>
	<div class="content">
		<div class="contentLeft">
			<div v-for="item of leftItems" :key="item.name" tab-name="item.name" :class="{
				contentLeftItem: true,
				'contentLeftItem--active': item.name === currentItemName
			}" @click="() => { handleLeftItemChange(item.name) }">{{ item.text }}</div>
		</div>
		<div class="contentRight">
			<div v-for="item of rightItems" :key="item.id" class="content__right__item">
				<div class="content__right__item__left">
					<img :src="item.imgUrl" alt="" class="content__right__item__left__image" />
				</div>
				<div class="content__right__item__right">
					<div class="content__right__item__right__top">{{ item.name }}</div>
					<div class="content__right__item__right__middle">{{ item.sales }}</div>
					<div class="content__right__item__right__bottom">
						<div class="content__right__item__right__bottom__price">
							<div class="content__right__item__right__bottom__price__promotion">￥{{ item.promotionPrice
							}}
							</div>
							<div class="content__right__item__right__bottom__price__original">￥{{ item.originalPrice }}
							</div>
						</div>
						<div class="content__right__item__right__bottom__count">
							<span class="content__right__item__right__bottom__count__minus-iconfont iconfont"
								v-show="cartData?.[shopId]?.[item.id]?.['count']"
								@click="()=>{changeItemToCart(shopId,item.id,-1)}"
								>
								&#xe8c5;
							</span>
							<span class="content__right__item__right__bottom__count__number"
								v-show="cartData?.[shopId]?.[item.id]?.['count']">
								{{ cartData?.[shopId]?.[item.id]?.['count'] }} </span>
								<!-- 使用了?.语法, 找不到会返回 undefined, 不会报错 -->
							<span
							 @click="()=>{changeItemToCart(shopId,item.id,1)}"
							 class="content__right__item__right__bottom__count__plus-iconfont iconfont"> &#xe601;
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import { ref, toRefs } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { get } from '../../utils/request';
import { watchEffect } from '@vue/runtime-core';

const leftItems = [
	{
		name: "all",
		text: "全部商品",
	},
	{
		name: "seckill",
		text: "秒杀",
	},
	{
		name: "fruit",
		text: "新鲜水果",
	},
	{
		name: "snacks",
		text: "休闲食品",
	},
	{
		name: "vegetable",
		text: "时令蔬菜",
	},
	{
		name: "meat",
		text: "肉蛋家禽",
	},
];
//左侧的逻辑
const useTabEffect = () => {
	//当前tab名称
	const currentItemName = ref('all');
	//点击更换itemname
	const handleLeftItemChange = (itemName) => {
		currentItemName.value = itemName
	};
	//返回数据
	return { handleLeftItemChange, currentItemName }
}
//内容区逻辑
const userContentEffect = (currentItemName) => {
	const rightItems = ref([]);
	//调用接口
	const route = useRoute();
	const shopId = route.params.id;
	const getContentData = async (shopId, currentTab) => {
		const result = await get(`/api/shop/${shopId}/tab/${currentTab}`);
		rightItems.value = result.data.data;
	};
	//计算属性，如果currentItemNam发生改变就调用接口
	watchEffect(() => {
		getContentData(shopId, currentItemName.value)
	});
	return { rightItems, shopId }
}
//购物车逻辑
const useCartEffect = () => {
	//从vuex中获取数据
	const store = useStore();
	const { cartData } = toRefs(store.state);
	//向购物车增加内容，两个参数，一个是商铺id，一个是商品id
	const changeItemToCart = (shopId,itemId,num) =>{
		store.commit('changeItemToCart',{shopId,itemId,num})
	}
	return { cartData,changeItemToCart }
}

export default {
	name: 'Content',
	setup() {
		const { cartData,changeItemToCart } = useCartEffect();
		const { currentItemName, handleLeftItemChange } = useTabEffect();
		const { rightItems, shopId } = userContentEffect(currentItemName);
		return { leftItems, currentItemName, handleLeftItemChange, rightItems, cartData, shopId,changeItemToCart };
	},
}
</script>

<style scoped lang="scss">
@import '../../style/mixins.scss';

.content {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 49rem;
	top: 146rem;
	// ...
	overflow-y: auto;
	display: flex;

	&Left {
		background-color: #f5f5f5;

		&Item {
			width: 76rem;
			height: 40rem;
			font-family: PingFangSC-Regular;
			font-size: 14rem;
			color: #333333;
			text-align: center;
			line-height: 40rem;

			&--active {
				background-color: #fff;
			}
		}

	}

	&__right {
		flex-grow: 1;
		background-color: #fff;
		overflow: auto;

		&__item {
			padding: 0 18rem 0rem 16rem;
			display: flex;
			border-bottom: 1rem solid #f1f1f1;

			&__left {
				margin-right: 16rem;

				&__image {
					width: 68rem;
					height: 68rem;
					margin-bottom: 12rem;
				}
			}

			&__right {
				flex-grow: 1;

				&__top {
					@include ellipsis;
					width: 181rem;
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
						margin-left: 20rem;

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
}
</style>