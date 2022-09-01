<template>
<div class="containerNav">
      <div class="containerNavItem" v-for="item of navItem" :key="item.id">
        <img :src="item.navIconUrl" alt="" class="containerNavItemImg">
        <span class="containerNavItemText">{{item.text}}</span>
      </div>
    </div>
</template>
<script>
export default{
    name:'Nav',
    setup(){
      const navItem=[
        {
          id:0,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
          text:'超市便利'
        },
        {
          id:1,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843550.png',
          text:'菜市场'
        },
        {
          id:2,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843505.png',
          text:'水果店'
        },
        {
          id:3,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843412.png',
          text:'鲜花绿植'
        },
        {
          id:4,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844276.png',
          text:'医药健康'
        },
        {
          id:5,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844145.png',
          text:'家居时尚'
        },
        {
          id:6,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844545.png',
          text:'烘焙蛋糕'
        },
        {
          id:7,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844072.png',
          text:'签到'
        },
        {
          id:8,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844735.png',
          text:'大牌免运'
        },
        {
          id:9,
          navIconUrl:'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844286.png',
          text:'红包套餐'
        },
      ]
      return {navItem};
    }
}
</script>
<style lang="scss">
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.containerNav{
  // background-color: orange;
  display:flex;
  flex-wrap: wrap;//让弹性盒元素在必要的时候拆行：
  margin-top: 16rem;
  padding-left: 8rem;
  padding-right: 8rem;
  &Item{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16rem;
    &Img{
      width: 40rem;
      height: 40rem;
      margin-bottom: 6rem;
    }
    &Text{
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-size: 12rem;
      color: $content-fontcolor;
    }
  }
}
</style>