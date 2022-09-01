<template>
<div>
<!-- 首页内容 -->
  <div class="container">
    <Header />
    <Search />
    <Banner />
    <Nav />
    <Gap />
    <Nearby />
  </div>
  <Docker />
</div>
</template> 

<style lang="scss" >
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
/* 首页 */
.container{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49rem;
    top: 0;
    overflow-y:auto ;
}
</style>

<script>
import Header from './Header.vue'
import Search from './Search.vue'
import Banner from './Banner.vue'
import Nav from './Nav.vue'
import Gap from './Gap'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'

export default{
    name:'Home',
    components:{
        Header,
        Search,
        Banner,
        Nav,
        Gap,
        Nearby,
        Docker
    },
}
</script>