<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <div id="main" style="height: 600px;width: 1300px"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "users",
        data() {
            return {
                option: {
                    title: {
                        text: '堆叠区域图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                }

            }
        },
        mounted() {
            this.$request.getReports().then(res => {
                const baseData = res.data.data
                for (const key in baseData) {
                    this.option[key] = baseData[key]
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption(this.option);
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