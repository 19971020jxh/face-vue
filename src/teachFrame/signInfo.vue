<template>
  <!--    签到信息页面-->
  <div>
    <!--  echart_1  1.echarts 统计图 :今天正在进行的,已完成,还未开始.-->
    <h3 style="margin-left: 15px;">签到情况概览</h3>
    <div  style="text-align: center" >
      <div id="echart1" style="width: 400px; height: 300px;display: inline-block"></div>
    </div>




    <!--正在进行/已完成  [可中断正在进行或即将开始的签到.btn]-->
<el-card class="box-card" style="margin: 15px;">
  <el-button   type="primary" disabled>签到位置情况:</el-button>
  <el-select v-model="mapSelectValue" placeholder="请选择">
    <el-option :key="index" v-for="(map,index) in mapSelect" :label="map" :value="map"></el-option>
  </el-select>
  <el-button type="primary" @click="excel" style="float: right;" >导出Excel</el-button>
</el-card>
    <!--     2.正在进行的签到，详细的签到信息. eacharts地图表示.各个学生的位置.-->
    <!--   高德 地图-->
    <div class="amap-page-container" style="margin: 15px;">
      <el-amap vid="amapDemo" zoom="2"  :center="center" class="amap-demo">
        <el-amap-marker :key="index" v-if="mapSelectValue==marker.name"  v-for="(marker, index) in markers" :position="marker.position"   visible="true" draggable="false" :vid="index"></el-amap-marker>
        <el-amap-text :key="index" v-if="mapSelectValue==marker.name"  v-for="(marker, index) in markers" :position="marker.position" :text="marker.text" :offset="[0,-50]"    ></el-amap-text>
      </el-amap>

    </div>
    <!--    必须添加excel导出功能-->

    <!--    未完成学生/已完成学生列表-->


  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: 'signInfo',
    data() {
      return {
        mapSelectValue:'',
        mapSelect:[],
        echart_1: [],
        center: [112.5273285, 31.21515044],
        markers: [],

      };
    },
    created(){
      this.init();
    },
    methods: {
       excel(){
       window.open('localhost:8081/download');
      },
      init(){
        this.$axios({
          method:'post',
          url:'/init/signInfo',
          data:qs.stringify({'teachID':1}),
        }).then(response=>{
            this.echart_1=response.data.echart1;
            this.drawLine();
            let set=new Set()
            let array=new Array();
            response.data.map.forEach(e=>{
              set.add(e.name);
              let k=new Object();
              k.text=e.text;
              k.name=e.name;
              let s=e.position.split(',');
              k.position=s;
              array.push(k)
            })
            this.mapSelect=Array.from(set)
            this.markers=array;
            this.mapSelectValue=this.mapSelect[0];
            console.log(this.markers)
        });
      },

      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('echart1'))
        // 绘制图表
        myChart.setOption({
          legend: {
            orient: 'vertical',
            x: 'right',
            data:['正在进行','已完成','将开始'],
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [{
            type: 'pie',
            data:this.echart_1
          }]
        });
      }
    }
  };
</script>



<style scoped>
  .amap-demo {
    height: 300px;
  }
</style>
