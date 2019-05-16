<template>
    <div>
        <div>
            <!--搜索框-->
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="params.query" clearable></el-input>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="success" @click="$router.push('/goods/add')" plain>
                        添加商品
                    </el-button>
                </el-col>
            </el-row>

            <!--表格-->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称">
                </el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)">
                </el-table-column>
                <el-table-column prop="goods_weight" label="商品重量">
                </el-table-column>
                <el-table-column prop="add_time" label="创建时间">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
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

        </div>

    </div>
</template>

<script>
    export default {
        name: "goodslist",
        data() {
            return {
                // 商品数据
                tableData: [],
                // 商品列表参数
                params: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
            }
        },
        created() {
            this.$request.getGoods(this.params).then(res => {
                console.log(res)
                this.tableData = res.data.data.goods
            })
        }
    }
</script>

<style scoped>

</style>