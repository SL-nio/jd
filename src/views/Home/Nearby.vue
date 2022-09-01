<template>
  <div class="containerNearby">
    <h2 class="containerNearbyTitle">附近店铺</h2>
    <div>
      <router-link  v-for="item of nearbyItems" key="item.id" :to="`/shop/${item.id}`">
        <Shopinfo  :item="item" :showBorder="true" v-if="item.imgUrl"/>
      </router-link>
    </div>
  </div>
  <Toast v-if="isShow" :message='toastMessage' />
</template>


<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Toast, { showToastEffect } from '../../components/Toast.vue';
import Shopinfo from '@/components/Shopinfo.vue';

const uesrNearbyEffect = (showToast) => {
  const nearbyItems = ref([])
  const getNearbyItems = async () => {
    const result = await get('/api/user/nearby')
    if (result.data.code === '0000') {
      console.log(result);
      nearbyItems.value = result.data.data
    } else {
      showToast(result.data.desc)
    }
  }
  getNearbyItems()
  return { nearbyItems }
}

export default {
  name: 'Nearby',
  components: { Toast, Shopinfo },
  setup() {
    const { isShow, toastMessage, showToast } = showToastEffect()
    const { nearbyItems } = uesrNearbyEffect(showToast)
    return { nearbyItems, isShow, toastMessage, nearbyItems }
  }
}
</script>

<style lang="scss" >
@import '../../style/mixins.scss';
@import '../../style/variables.scss';

// 附近店铺
.containerNearby {
  padding: 16rem 18rem;

  // background-color: aquamarine;
  &Title {
    font-size: 18rem;
    color: $content-fontcolor;
    padding-bottom: 14rem;
  }
  a{
    text-decoration: none;
  }

}
</style>