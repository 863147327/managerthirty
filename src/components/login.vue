<template>
    <div class="login">
        <div class="center-box">
            <el-form label-position="top" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
                <h2>用户登录</h2>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
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

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 格式正确
                        this.$request.login(this.loginForm).then(res=>{
                            console.log(res)
                            if(res.data.meta.status === 200){
                                this.$router.push('/')
                                sessionStorage.setItem('token',res.data.data.token)
                            }else{
                                this.$message.error(res.data.meta.msg)
                            }
                        })
                    } else {
                        // 格式错误
                        this.$message.error('数据格式不对哦')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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