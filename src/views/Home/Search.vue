<template>
<div class="containerSearch">
      <span class='containerSearchIconfont iconfont'>&#xe651;</span>
      <input type="text" class="containerSearchInput" placeholder="中原杂碎好吃不贵">
</div>
</template>
<script>
export default{
    name:'Search'
}
</script>
<style lang="scss" >
@import '../../style/mixins.scss';
@import '../../style/variables.scss';

.containerSearch{
  text-align: center;
  position: relative;
  color: #b7b7b7;
}
.containerSearchIconfont{
  position: absolute;
  font-size: 16rem;
  left: 34rem;
  top:7rem;
}
.containerSearchInput{
  background-color: #f5f5f5;
  width:339rem;
  height:32rem;
  border-radius: 16rem;
  padding-left: 44rem;
  box-sizing: border-box;//当定义width和height时，border和padding的参数值被包含在width和height之内。
  &::-webkit-input-placeholder{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 14rem;
    line-height: 16rem;
  }
  &::-moz-input-placeholder{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 14rem;
    line-height: 16rem;
  }
  &:-moz-input-placeholder{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 14rem;
    line-height: 16rem;
  }
  &:-ms-input-placeholder{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 14rem;
    line-height: 16rem;
  }
}
</style>