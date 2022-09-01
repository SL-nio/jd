<!-- 弹框 -->
<template>
<div class="toast">
    {{message}}
</div>


</template>
    
<script>
import { reactive } from '@vue/reactivity';
import { toRefs } from 'vue'; 

export default{
    name:'toast',
    props:['message'],
}
export const showToastEffect = () =>{
    const toastData = reactive({
            isShow:false,
            toastMessage:''
        })
    const showToast = (message) =>{
            toastData.toastMessage = message;
            toastData.isShow = true;
            setTimeout(() => {
            toastData.toastMessage = '';
            toastData.isShow = false;
                }, 2000);
        }
    const { isShow,toastMessage } =toRefs(toastData)
    return {isShow,toastMessage,showToast}
}

</script>

<style class="scss" scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background:rgba(0,0,0,0.35);
    padding: 10rem;
    border-radius: 5rem;
    color: #fff ;
}

</style>