<template>
<div class="containerBanner">
      <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202191609589.png" class="containerBanner_Img" alt="">
</div>
</template>
<script>
export default{
name:'Banner'
}
</script>
<style lang="scss">
.containerBanner{
   text-align: center;
   margin-top: 12rem;
   height: 88.8rem;//如果网速比较慢, 图片没有加载出来的时候, 下面的内容会挤上来, 为了解决这个问题, 可以给 banner 设置一个高度, 保证下面的内容位置不会因为图片没有加载出来而发生变化
   &_Img{
    width: 339rem;
    height: 86rem;
   
  }
}
</style>