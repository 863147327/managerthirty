<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="order_number" label="订单编号"></el-table-column>
            <el-table-column prop="order_price" label="订单价格"></el-table-column>
            <el-table-column prop="pay_status" label="是否付款">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.pay_status==0" type="danger" plain>未付款</el-button>
                    <el-button v-else type="success" plain>已付款</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"></el-table-column>
            <el-table-column label="下单时间">
                <template slot-scope="scope">{{ scope.row.create_time | formatTime }}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="niubi">
                    <el-button type="primary" size="mini" icon="el-icon-edit"
                               @click="editVisible = true" plain></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
                :current-page="1"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="60">
        </el-pagination>

        <!--编辑框-->
        <el-dialog title="修改用户订单" :visible.sync="editVisible" width="30%" >
            <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item label="省市区/县" prop="username">
                    <v-distpicker  @selected="selected"></v-distpicker>
                </el-form-item>
                <el-form-item label="详细地址" prop="">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="editVisible = false">确 定</el-button>

        </el-dialog>

    </div>
</template>

<script>
    import moment from 'moment'
    // 倒入省市区数据
    import options from '../assets/city_data2017_element'
    //  导入省市联动组件
    import VDistpicker from 'v-distpicker'
    export default {
        name: "users",
        data() {
            return {
                tableData: [],
                ordersData: {
                    pagenum: 1,
                    pagesize: 10
                },
                // 级链选择器省市区数据
                options,
                editForm: {
                    address: ''
                },
                editVisible:false,
                //选中的数据
                selectedOptions2: []
            }
        },
        components: {
            VDistpicker
        },
        // 过滤器
        filters:{
            formatTime(value){
                return moment(value).format('YYYT-MM-DD HH:mm:ss')
            }
        },

        created(){
            this.$request.getOrderslist(this.ordersData).then(res=>{
                this.tableData = res.data.data.goods
            })
        },
        methods: {
            selected(ssq){
                console.log(ssq)
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
</style>