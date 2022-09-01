<template>
    <div class="shopinfoItem" >
        <div class="shopinfoItemLeft">
            <img :src="item.imgUrl" alt="" class="shopinfoItemLeftTupian">
        </div>
        <div :class="{'shopinfoItemRight':true,'shopinfoItemRight--borderd':showBorder}">
            <div class="shopinfoItemRight_Title">
                {{ item.title }}
            </div>
            <div class="shopinfoItemRightTags">
                <div class="shopinfoItemRightTagsItems" v-for="(tagItem, tagIndex) of item.tags" :key="tagIndex">
                    {{ tagItem }}</div>
            </div>
            <div class="shopinfoItemRightNotice">
                {{ item.notice }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Shopinfo',
    props:['item','showBorder']
}
</script>

<style scoped lang="scss">
@import '../style/mixins.scss';
@import '../style/variables.scss';
  .shopinfoItem{
    display: flex;
    margin-bottom: 12rem;
    &Left{
      &Tupian{
        width: 56rem;
        height: 56rem;
        margin-right: 16rem;
      }
    }
    &Right{
      // background-color: blueviolet;
      flex-grow: 1;//定义项目的扩大系数，用于分配容器的剩余空间
      &--borderd{
        border-bottom: 1rem solid #f1f1f1;
      }
      &_Title{
        font-size: 16rem;
        color: $content-fontcolor;
        margin-bottom: 8rem;
      }
      &Tags{
        display: flex;
        margin-bottom: 8rem;
        &Items{
          margin-right: 16rem;
          font-size: 13rem;
          color: $content-fontcolor;
        }
      }
      &Notice{
        font-size: 13rem;
        color: #E93B3B;
        margin-bottom: 12rem;
      }
    }
  }
</style>