<template>
<!-- 底部docker -->
  <div class="docker">
      <div v-for="(item,id) in dockerItems" :key="id" :class="{docker__item:true, docker__item_active:item.id === 1}">  
        <span class="docker__item_iconfont iconfont" v-html="item.icon"></span>
        <span class="docker__item_text">
          {{item.text}}
        </span>
      </div>
  </div>
</template>
<script>
export default{
name:'Docker',
setup (){
    const dockerItems =[
        {
            id:1 ,
            icon: '&#xe638;',
            text: '首页'
        },
        {   
            id:2,
            icon: '&#xe600;',
            text: '购物车'
        },
        {
            id:3,
            icon: '&#xe713;',
            text: '订单'
        },
        {
            id:4,
            icon: '&#xe615;',
            text: '我的'
        }
    ];
    return { dockerItems };
}
}
</script>
<style lang="scss" >
@import '../style/mixins.scss';
@import '../style/variables.scss';
.docker{
  width: 375rem; 
  height: 49rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0 -1rem 1rem 0 #f1f1f1;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 14rem;
  
}

.docker__item{
  display: flex;
  flex-direction: column;
  align-items: center;

}

.docker__item_iconfont{
  font-size: 24rem;
}

.docker__item_active{
  color:aqua;
}
</style>