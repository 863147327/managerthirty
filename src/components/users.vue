<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--搜索框-->
        <el-row>
            <el-col :span="6">
                <el-input placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="success" @click="addVisible = true" plain>添加用户</el-button>
            </el-col>
        </el-row>

        <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="mg_state" label="用户状态">
                <template slot-scope="niubi">
                    <el-switch v-model="niubi.row.mg_state" active-color="#13ce66" @change="stateChange(niubi.row)"
                               inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="niubi">
                    <el-button type="primary" size="mini" icon="el-icon-edit"
                               @click="handleEdit(niubi.$index, niubi.row)" plain></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                               @click="handleDelete(niubi.$index, niubi.row)" plain></el-button>
                    <el-button type="success" size="mini" icon="el-icon-check" plain></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
                :current-page="1"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <!--新增用户-->
        <el-dialog title="提示" :visible.sync="addVisible" width="30%" >
            <span>添加用户</span>
            <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "users",
        data() {
            return {
                tableData: [],
                usersData: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                total: 0,
                //是否显示新增对话框
                addVisible: false,

                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                //新增用户的表单验证规则
                addRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ]
                }
            }
        },

        created() {
            this.getUsers()
        },
        methods: {
            getUsers(){
                this.$request.getUsers(this.usersData).then(res => {
                    console.log(res)
                    this.tableData = res.data.data.users
                    this.total = res.data.data.total
                })
            },
            handleEdit(index, row) {
                console.log(index)
                console.log(row)
            },
            handleDelete(index, row) {
                console.log(index)
                console.log(row)
            },
            //改变用户状态
            stateChange(row) {
                this.$request.updateStatus({id: row.id, type: row.mg_state}).then(res => {
                    console.log(res)
                })
            },
            //验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        //发请求添加用户
                        this.$request.addUser(this.addForm).then(res=>{
                            console.log(res)
                            //关闭弹框
                            this.addVisible = false
                            //获取数据
                            this.getUsers()
                            //表单重置
                            this.$refs[formName].resetFields();
                        })
                    } else {
                        this.$message.error('数据格式不对')
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //添加用户

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