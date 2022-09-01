<template>
<div class="login">
   <div class="loginPortrait">
    <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202221429453.png" alt="" class="loginImg">
   </div>
   <div class="loginInput">
    <input type="text" class="loginInputItem" placeholder="请输入手机号" v-model = "phone">
    <input type="password" class="loginInputItem" placeholder="请输入密码" v-model="password">
    <input type="password" class="loginInputItem" placeholder="请确认密码" v-model="confirmPassword">
   </div>
   <div class="loginButton">
    <button class="loginButtonOn" @click="handleRegister">注册</button>
   </div>

   <div class="loginContent">
    <a href="javascript:;" class="loginContentA" @click="handleLogin">已有账号登录</a>
   </div>

   <Toast v-if="isShow" :message='toastMessage' />
</div>

</template>

<script>

import { toRefs } from 'vue';
import { useRouter} from 'vue-router';
import { reactive } from '@vue/reactivity';
import {post} from '../../utils/request';
import Toast,{ showToastEffect } from '../../components/Toast.vue';

const userRegisterEffect = (showToast) => {
	const data = reactive({
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const router = useRouter();
	const handleRegister = async () => {
			// 调用接口
			try {
                 if(data.phone === ''){
                showToast('手机号不能为空')
                return
            }
            if(data.password === ''){
                showToast('密码不能为空')
                return
            }
            if(data.confirmPassword === ''){
                showToast('确认密码不能为空')
                return
            }
            if (data.password !== data.confirmPassword) {
			    showToast("密码不一致!");
                return
		    }
            const result = await post("/api/user/register", {
                phone: data.phone,
                password: data.password,
            });
            if (result.data.code === "0000") {
                // 注册成功自动登录
                localStorage.setItem("isLogin", "true");
                router.push({ name: "home" });
            } else {
                showToast("注册失败...");
            }
        } catch (error) {
            showToast("发送请求失败!");
        }
		
	};
    const { phone, password, confirmPassword } = toRefs(data);
	return {
		phone,
		password,
		confirmPassword,
		handleRegister,
	};
}

const userLoginEffect = () => {
	const router = useRouter();
	const handleLogin = () => {
		router.push({ name: "login" });
	};
	return { handleLogin };
};

export default {
	name: "Register",
	components: { Toast },
	setup() {
		const { isShow, toastMessage, showToast } = showToastEffect();
		const { phone, password, confirmPassword, handleRegister } = userRegisterEffect(showToast);
		const { handleLogin } = userLoginEffect();
		return {
			handleLogin,
			handleRegister,
			phone,
			password,
			confirmPassword,
			isShow,
			toastMessage,
		};
	},
};
</script>

<style lang="scss" scoped>
.loginPortrait{
    // background-color: olivedrab;
    margin-top: 120rem;
    text-align: center;
}
.loginImg{
    width: 66rem;
    height: 66rem;
}

.loginInput{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rem;
}
.loginInputItem{
    width: 295rem;
    height: 48rem;
    border: 1px solid rgba(0,0,0,0.1);
    background: #f9f9f9;
    border-radius: 6rem;
    font-size: 16rem;
    color: rgba(0,0,0,0.50);
    letter-spacing: 0;
    line-height: 24rem;
    margin-bottom: 16rem;
    padding:0 16rem;
}

.loginButton{
    display: flex;
    align-items: center;
    margin-top: 16rem;
    flex-direction: column;
}
.loginButtonOn{
    width: 295rem;
    height:48rem;
    background: #0091ff;
    box-shadow: 0 4rem 8rem 0 rgba(0,145,255,0.32);
    border-radius: 4rem;
    text-align: center;
    line-height: 48rem;
    font-size: 16rem;
    letter-spacing: 0;
    color: #ffffff;
}

.loginContent{
    display: flex;
    align-items: center;
    width: 98px;
    height: 20px;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 16rem;
}
.loginContentA{
    font-size: 14rem;
    color:rgba(0,0,0,0.5);
    letter-spacing: 0;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}
.loginContentGap{
    font-size: 14rem;
}
</style>