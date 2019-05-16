<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <router-view></router-view>

    </div>
</template>

<script>
    export default {
        name: "users",

    }
</script>

<style scoped>
    .my-bread {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        background-color: #d3dce6;
    }
</style>