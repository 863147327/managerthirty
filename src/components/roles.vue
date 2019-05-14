<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--搜索框-->
        <el-row>
            <el-col :span="6">
                <el-button type="success" @click="addVisible = true" plain>添加角色</el-button>
            </el-col>
        </el-row>

        <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-row v-for="(level1,index) in props.row._children">
                        <el-col :span="6">
                            <el-tag type="primary" :key="level1.id" @close="delRight(props.row,level1.id)" closable>{{
                                level1.authName }}
                            </el-tag>
                            <span class="el-icon-arrow-right"></span>
                        </el-col>
                        <el-col :span="18">
                            <el-row v-for="(level2,i) in level1.children">
                                <el-col :span="6">
                                    <el-tag type="success" :key="level2.id" @close="delRight(props.row,level2.id)"
                                            closable>{{ level2.authName }}
                                    </el-tag>
                                    <span class="el-icon-arrow-right"></span>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag class="my-tag" type="warning" v-for="(level3,j) in level2.children"
                                            :key="level3.id" @close="delRight(props.row,level3.id)" closable>{{
                                        level3.authName }}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="niubi">
                    <el-button type="primary" size="mini" icon="el-icon-edit"
                               @click="handleEdit(niubi.$index, niubi.row)" plain></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                               @click="handleDelete(niubi.$index, niubi.row)" plain></el-button>
                    <el-button type="success" size="mini" icon="el-icon-check"
                               @click="handleRole(niubi.row)" plain></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增角色-->
        <el-dialog title="添加角色" :visible.sync="addVisible" width="30%">
            <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="addForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>

        </el-dialog>

        <!--编辑用户角色-->
        <el-dialog title="编辑角色" :visible.sync="editVisible" width="30%">
            <el-form :model="editForm" :rules="addRules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>

        </el-dialog>
        <!--权限分配-->
        <el-dialog title="权限分配" :visible.sync="rightVisible" width="30%">
            <el-tree
                    :data="rightData"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    ref="tree"
                    :default-checked-keys="defaultCheckRight"
                    :props="defaultProps">
            </el-tree>
            <el-button @click="rightVisible = false">取 消</el-button>
            <el-button type="primary" @click="setRolesRights">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "users",
        data() {
            return {
                tableData: [],
                // 是否显示新增对话框
                addVisible: false,

                // 新增用户数据
                addForm: {
                    roleName: '',
                    roleDesc: ''
                },
                // 新增用户的表单验证规则
                addRules: {
                    roleName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ]
                },
                // 显示编辑框
                editVisible: false,
                // 编辑角色
                editForm: {},
                // 所有权限
                rightData: [],
                // 分配角色框显示
                rightVisible: false,
                // 选中权限的数据
                rightForm: {},
                //默认选中的权限
                defaultCheckRight: [],
                // 对应属性
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                }

            }
        },
        created() {
            this.getRoles()
        },
        methods: {
            // 编辑角色
            handleEdit(index, row) {
                // console.log(index)
                // console.log(row)
                this.$request.getRolesById(row.id).then(res => {
                    // console.log(res)
                    this.editForm = res.data.data
                    // console.log(this.editForm)
                    this.editVisible = true
                })

            },
            // 删除角色
            handleDelete(index, row) {
                // console.log(index)
                // console.log(row)
                this.$confirm('你真的要把它删除吗?o(╥﹏╥)o', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$request.deleteRoles(row.id).then(res => {
                        console.log(res)
                        if (res.data.meta.status === 200) {
                            this.getRoles()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '你真好'
                    });
                });
            },
            // 修改权限
            handleRole(row) {
                // console.log(row)
                this.rightVisible = true
                this.rightForm = row
                this.$request.getRights('tree').then(res => {
                    // console.log(res)
                    this.rightData = res.data.data
                    // 设置选中的值
                    let checkedIds = []

                    function getChecksKeys(item) {
                        item._children.forEach(v => {
                            // console.log(v.id)
                            if (v.children) {
                                v._children = v.children
                                getChecksKeys(v)
                            }else{
                                checkedIds.push(v.id)
                            }
                        })
                    }

                    getChecksKeys(row)

                    // console.log(checkedIds)
                    this.defaultCheckRight = checkedIds
                    // console.log(this.defaultCheckRight)

                })
            },
            // 获取角色数据
            getRoles() {
                // 获取数据
                this.$request.getRoles().then(res => {
                    // console.log(res)
                    // 把数据处理一下
                    let Data = res.data.data
                    // console.log(Data)
                    // 遍历把children属性移除
                    Data.forEach(v => {
                        v._children = v.children;
                        // 删除children属性
                        delete v.children;
                    });
                    this.tableData = Data
                })
            },
            // 验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (formName == 'editForm') {
                            this.editForm.id = this.editForm.roleId
                            this.$request.editRoles(this.editForm).then(res => {
                                this.getRoles()
                                this.editVisible = false
                            })
                        } else {
                            // 发请求添加用户
                            this.$request.addRoles(this.addForm).then(res => {
                                // console.log(res)
                                // 关闭弹框
                                this.addVisible = false
                                // 获取数据
                                this.getRoles()
                                // 表单重置
                                this.$refs[formName].resetFields();
                            })
                        }
                    } else {
                        this.$message.error('数据格式不对')
                        return false;
                    }
                });
            },
            // 删除角色指定权限
            delRight(row, rightId) {
                this.$request.deleteRight({
                    roleId: row.id,
                    rightId
                }).then(res => {
                    // console.log(res)
                    row._children = res.data.data
                })
            },

            // 角色授权
            setRolesRights() {
                let rids = this.$refs.tree.getCheckedKeys().join(",")+',';
                console.log(rids)
                const half  =this.$refs.tree.getHalfCheckedKeys()
                console.log(half)
                rids = rids.concat(half)
                console.log(rids)
                // 调接口
                this.$request.setRoleRights({
                    roleId: this.rightForm.id,
                    rids
                }).then(res => {
                    this.rightVisible = false
                    // console.log(res)
                    if (res.data.meta.status == 200) {
                        this.getRoles()
                    }
                    this.$request.getMenus().then(res=>{
                        this.$store.commit('changeMenulist',res.data.data)
                    })
                })
            }
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

    .my-tag {
        margin-right: 5px;
        margin-bottom: 5px
    }
</style>