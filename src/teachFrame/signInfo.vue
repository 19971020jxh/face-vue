<template>
<!--    签到信息页面-->
  <div>
<!--  echart_1  1.echarts 统计图 :今天正在进行的,已完成,还未开始.-->

<!--    data: [-->
<!--    {value: 335, name: '直接访问'},-->
<!--    {value: 310, name: '邮件营销'},-->
<!--    {value: 274, name: '联盟广告'},-->
<!--    {value: 235, name: '视频广告'},-->
<!--    {value: 400, name: '搜索引擎'}-->
<!--    ]-->

<!--  echart_2  2.正在进行的签到，详细的签到信息. eacharts地图表示.各个学生的位置.-->
<!--正在进行/已完成  [可中断正在进行或即将开始的签到.btn]-->

<!--    地图-->

<!--    未完成学生/已完成学生列表-->


  </div>
</template>

<script>
  export default {
    name: 'signInfo',
    data(){
      return {
        echart_1:[],
        echart_2:[],
      }
    },
    created(){
      this.init();
    },
    methods:{
      init(){

      },
    },
  }
</script>

<style scoped>

</style>
