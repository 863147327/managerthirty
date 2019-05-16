<template>
    <div>
        <!--提示框-->
        <el-alert title="消息提示的文案" type="info" center show-icon></el-alert>

        <!--步骤条-->
        <el-steps :space="200" :active="+num" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
            <!-- 标签页 -->
            <el-tabs v-model="num" tab-position="left" style="height: 600px;">
                <el-tab-pane label="基本信息">

                    <el-form label-position="top" :rules="rules" label-width="80px" :model="formLabelAlign">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="formLabelAlign.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="formLabelAlign.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="formLabelAlign.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="formLabelAlign.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <!--<el-cascader-->
                                    <!--expand-trigger="hover"-->
                                    <!--:options="options"-->
                                    <!--v-model="selectedOptions2"-->
                                    <!--@change="handleChange">-->
                            <!--</el-cascader>-->
                        </el-form-item>
                    </el-form>





                </el-tab-pane>
                <el-tab-pane label="商品参数">配置管理</el-tab-pane>
                <el-tab-pane label="商品属性">角色管理</el-tab-pane>
                <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
                <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
            </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "goodsAdd",
        data() {
            return {
                // 步骤选中值
                num: '0',

                // 商品基本信息
                formLabelAlign: {
                    goods_name: '',
                    goods_price: '',
                    goods_weight: '',
                    goods_number: ''
                },
                // 验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },

                //分类数据

            }
        },
        methods: {},
        updated() {
            console.log(this.num)
        }
    }
</script>

<style scoped>

</style>