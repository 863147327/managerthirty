<template>
    <div class="login">
        <div class="center-box">
            <el-form label-position="top" label-width="80px">
                <h2>用户登录</h2>
                <el-form-item label="用户名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input></el-input>
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
        name: "login"
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