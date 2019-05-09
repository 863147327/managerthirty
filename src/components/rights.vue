<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="180">
            </el-table-column>
            <el-table-column prop="level" label="层级">
                <template slot-scope="niubi">
                    {{ niubi.row.level==0?'一级':'' }}
                    {{ niubi.row.level==1?'二级':'' }}
                    {{ niubi.row.level==2?'三级':'' }}
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    export default {
        name: "users",
        data() {
            return {
                tableData: []
            }
        },
        created(){
            this.$request.getRights('list').then(res=>{
                // console.log(res)
                this.tableData = res.data.data
            })
        }
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