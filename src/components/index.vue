<template>
    <el-container class="my-container">
        <el-header class="my-header">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple left">
                        <img class="logo" src="../assets/logo.jpg" alt="">
                    </div>
                </el-col>
                <el-col :span="8" >
                    <div class="grid-content bg-purple-light center">
                        <h2>电商后台管理系统</h2>
                    </div>
                </el-col>
                <el-col :span="8" >
                    <div class="grid-content bg-purple right">
                        <el-button type="danger" icon="el-icon-delete" @click="logout" circle></el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container >
            <el-aside width="200px" class="my-aside">
                <el-menu router default-active="2" class="el-menu-vertical-demo">
                    <!--用户管理-->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="users" ><i class="el-icon-menu"></i>用户列表</el-menu-item>
                    </el-submenu>
                    <!--权限管理-->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="roles" ><i class="el-icon-menu"></i>角色列表</el-menu-item>
                        <el-menu-item index="rights" ><i class="el-icon-menu"></i>权限列表</el-menu-item>
                    </el-submenu>
                    <!--商品管理-->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="goods" ><i class="el-icon-menu"></i>商品列表</el-menu-item>
                        <el-menu-item index="params" ><i class="el-icon-menu"></i>分类参数</el-menu-item>
                        <el-menu-item index="categories" ><i class="el-icon-menu"></i>商品分类</el-menu-item>
                    </el-submenu>
                    <!--订单管理-->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="orders" ><i class="el-icon-menu"></i>订单列表</el-menu-item>
                    </el-submenu>
                    <!--数据统计-->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="reports" ><i class="el-icon-menu"></i>数据报表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main class="my-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        beforeCreate(){
            if(!sessionStorage.getItem('token')){
                this.$message.error('请登录')
                this.$router.push('login')
            }
        },
        methods: {
            logout(){
                sessionStorage.removeItem('token')
                this.$router.push('login')
            }
        }

    }

</script>

<style lang="scss">
    .my-container {
        height: 100%;

        .my-header {
            height: 60px;
            background-color: #b3c0d1;
            .el-col {
                .left {
                    .logo {
                        height: 60px;
                        width: 150px;
                    }
                }
                .center {
                    line-height: 60px;
                    text-align: center;
                    h2 {
                        margin: 0;
                        padding: 0;
                    }
                }
                .right {
                    line-height: 60px;
                    text-align: right;
                }
            };
        }

        .my-aside {
            background-color: lightblue;
        }

        .my-main {
            padding-top: 0;
            background-color: #e9eef3;
        }
    }
</style>