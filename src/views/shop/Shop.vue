<template>
    <div class="container">
        <div class="container__header">
            <!-- src\views\shop\Shop.vue -->
            <div class="container__header__left">
                <span @click="handleBackClick" class="container__header__left__iconfont iconfont"> &#xe679; </span>
            </div>
            <div class="container__header__right">
                <span class="container__header__right__iconfont iconfont">&#xe651;</span>
                <input type="text" class="container__header__right__input" placeholder="请输入商品名称搜索" />
            </div>
        </div>
        <Shopinfo :item="item" :showBorder="false" />
        <Content/>
        <Cart/>
    </div>
</template>

<script>
import Shopinfo from '@/components/Shopinfo.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { get } from '@/utils/request';
import Content from './Content.vue';
import Cart from './Cart.vue';

const uesrShopInfoEffect = () => {
    const route = useRoute()
    const item = ref({

    })
    //获取数据
    const getItemData = async () => {
        const result = await get(`/api/user/shop/${route.params.id}`);
        item.value = result.data.data
    }

    return { getItemData, item }
}

const useBackRouterEffect = () => {
    const router = useRouter()
    const handleBackClick = () => {
        //返回上一级
        router.back()
    }
    return { handleBackClick }
}

export default {
    name: 'Shop',
    components: { Shopinfo,Content,Cart },
    setup() {
        const { item, getItemData } = uesrShopInfoEffect()
        getItemData()//执行调用接口
        const { handleBackClick } = useBackRouterEffect()
        return { item, handleBackClick }
    }
}
</script>

<style scoped >
.container {
    padding: 0 18rem;
}

/* // src\views\shop\Shop.vue */
.container__header {
    width: 100%;
    height: 32rem;
    margin-top: 16rem;
    margin-bottom: 16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container__header__left__iconfont {
    color: #b6b6b6;
    font-size: 20rem;
}

.container__header__right {
    position: relative;
}

.container__header__right__iconfont {
    color: #b7b7b7;
    font-size: 18rem;
    position: absolute;
    top: 6rem;
    left: 16rem;
}

.container__header__right__input {
    width: 310rem;
    height: 32rem;
    background: #f5f5f5;
    border-radius: 16rem;
    padding: 0 44rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 14rem;
    color: #333333;
    line-height: 16rem;
}
</style>