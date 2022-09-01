<template>
    <div class="login">
        <div class="loginPortrait">
            <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202221429453.png" alt=""
                class="loginImg">
        </div>
        <div class="loginInput">
            <input type="text" class="loginInputItem" placeholder="请输入手机号" v-model="phone">
            <input type="password" class="loginInputItem" placeholder="请输入密码" v-model="password">
        </div>
        <div class="loginButton">
            <button class="loginButtonOn" @click="handleLogin">登录</button>
        </div>

        <div class="loginContent">
            <a href="javascript:;" class="loginContentA" @click="handleRegister">登陆注册</a>
            <span class="loginContentGap"> | </span>
            <a href="javascript:;" class="loginContentA">忘记密码</a>
        </div>

        <Toast v-if="isShow" :message='toastMessage' />
        <!-- 弹框 -->
    </div>

</template>

<script>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { reactive } from '@vue/reactivity';
import { post } from '../../utils/request';
import Toast, { showToastEffect } from '../../components/Toast.vue';


// 登录相关
const userLoginEffect = (showToast) => {
    const router = useRouter();
    const data = reactive({
        phone: '',
        password: '',
    })

    const handleLogin = async () => {
        try {
            // 非空校验
            if(data.phone === ''){
                showToast('手机号不能为空')
                return
            }
            if(data.password === ''){
                showToast('密码不能为空')
                return
            }
            const result = await post('/api/user/login', {
                phone: data.phone,
                password: data.password
            });
            if (result.data.code === '0000') {
                localStorage.isLogin = 'true'
                //确定跳转到哪个路由
                router.push({ name: 'home' })
            } else {
                showToast('登录失败')
                console.log(result.data.desc)
            }

        } catch (error) {
            showToast('url不对')
        }
    }
    const { phone, password } = toRefs(data)
    return { handleLogin, phone, password }
}

    const userRegisterEffect = () => {
        const router = useRouter();
        const handleRegister = () => {
            router.push({ name: 'register' })
        }
        return {handleRegister}
    }

export default ({
    name: 'login',
    components: { Toast },
    setup() {
        const { isShow, toastMessage, showToast } = showToastEffect()
        const {handleLogin,phone,password,data} = userLoginEffect(showToast)
        const {handleRegister} = userRegisterEffect()
        return { handleLogin, handleRegister, data, toastMessage, isShow, phone, password }
    }

})
</script>

<style lang="scss">
.loginPortrait {
    // background-color: olivedrab;
    margin-top: 120rem;
    text-align: center;
}

.loginImg {
    width: 66rem;
    height: 66rem;
}

.loginInput {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rem;
}

.loginInputItem {
    width: 295rem;
    height: 48rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #f9f9f9;
    border-radius: 6rem;
    font-size: 16rem;
    color: rgba(0, 0, 0, 0.50);
    letter-spacing: 0;
    line-height: 24rem;
    margin-bottom: 16rem;
    padding: 0 16rem;
}

.loginButton {
    display: flex;
    align-items: center;
    margin-top: 16rem;
    flex-direction: column;
}

.loginButtonOn {
    width: 295rem;
    height: 48rem;
    background: #0091ff;
    box-shadow: 0 4rem 8rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 4rem;
    text-align: center;
    line-height: 48rem;
    font-size: 16rem;
    letter-spacing: 0;
    color: #ffffff;
}

.loginContent {
    display: flex;
    align-items: center;
    width: 139px;
    height: 20px;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 16rem;
}

.loginContentA {
    font-size: 14rem;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}

.loginContentGap {
    font-size: 14rem;
}
</style>