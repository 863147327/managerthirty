<template>
    <div class="login">
        <div class="center-box">
            <el-form label-position="top" :model="loginForm"  :rules="loginRules" label-width="80px">
                <h2>用户登录</h2>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="my-btn" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",

        data(){
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                }
            }
        },


        creates(){
            this.$request.sayHi()
        }

    }
</script>

<style lang="scss">
    html,body {
        height: 100%;
        margin: 0;
        padding: 0;
        .login {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: #324152;
            .center-box {
                padding: 50px 45px;
                width: 480px;
                height: 350px;
                background-color: #fff;
                border-radius: 5px;
                .my-btn {
                    margin: 0;
                    width: 100%;
                }
            }
        }
    }
</style>