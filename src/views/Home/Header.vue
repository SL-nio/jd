<template>
    <div class="container__header">
      <div class="headerLeft">
          <span class="headerLeftPositionIconfont iconfont ">&#xe63c;</span>
          <span class="contain__header_text">世界哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或</span>
      </div>
      <div class="container__header_right">
        <span class="contain__header_right_position-iconfont iconfont" style='font-size:20px;'>&#xe759;</span>
      </div>
    </div>
</template>
<script>
export default{
    name:'Header',
}
</script>
<style lang="scss" >

@import '../../style/mixins.scss';
@import '../../style/variables.scss';

.container__header{
display: flex;
justify-content: space-between;
padding: 16rem 19.2rem; 
}
.headerLeft{
    width: 300rem;
    height: 20rem;
    @include ellipsis;
}
.headerLeftPositionIconfont{
   font-size: 20rem;
   margin-right: 9.7rem;
  
}
.contain__header_text{
   font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   font-size: 16rem;
   color:$content-fontcolor;

}
</style>