<template>
    <div class="login-container">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="40px" class="ruleForm">
            <el-form-item prop="pass">
                <div class="from-item">
                    <label for="usr">账号</label>
                    <el-input id="usr" v-model="ruleForm.username" type="text" autocomplete="off" />
                </div>
            </el-form-item>
            <el-form-item prop="checkPass">
                <div class="from-item">
                    <label for="psw">密码</label>
                    <el-input id="psw" v-model="ruleForm.password" type="password" autocomplete="off" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                <a class="register"  href="/register">点我注册</a>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const validateUsername = (rule: any, value: any, callback: any) => {
    if (!ruleForm.username) {
        return callback(new Error('用户名不能为空！'))
    }
}
onMounted(() => {
    console.log(ruleFormRef)
    console.log('mounted')
})
const validatePassword = (rule: any, value: any, callback: any) => {
    if (!ruleForm.password) {
       return callback(new Error('密码不能为空！'))
    }
}

const ruleForm = reactive({
    username: '',
    password: '',
})

const rules = reactive<FormRules>({
    checkUser: [{ validator: validateUsername, trigger: 'blur' }],
    checkPass: [{ validator: validatePassword, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    axios.post('/users/login', {
        username: ruleForm.username,
        password: ruleForm.password
    }).then(({ data }) => {
        if (data.code == '0000') {
            let token = data.data.token
            localStorage.setItem('token', token)
            router.push('/home')
        }
    }).catch((err) => {
        console.log(err)
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    formEl.resetFields()
    ruleForm.password = ruleForm.username= ''
}
</script>


<style scoped lang="less">
.login-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#3498db, #34495e);

    .ruleForm {
        width: 350px;

        .from-item {
            width: 100%;
            height: 35px;
            display: flex;

            label {
                width: 40px;
                color: rgb(255, 251, 4);
            }
        }
    }
}
</style>
