<template>
<!--    学生签到信息管理-->
  <div>
<!--    时间轴显示-->
    <!--    已结束 -->
    <!--    正在进行 -->
    <!--    将开始  -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>今日签到进度</span>
      </div>
    <timeline>
      <timeline-title>时间进度</timeline-title>
      <timeline-item :key="index" :hollow="true" v-for="(info,index) in infos " >
        <el-tag>状态:{{info.style}}</el-tag><el-tag style="margin-left: 15px;" type="warning">{{info.name}}</el-tag>
        <div style="text-align: right" v-if="info.style=='迟到'" >结束时间:{{info.endHour}}</div>
        <div style="text-align: right" v-if="info.style=='已完成'" >签到时间:{{info.sign_time}}</div>
        <div style="text-align: right" v-if="info.style=='未开始'" >开始时间:{{info.startHour}}</div>
        <div style="display: none;" v-else></div>
      </timeline-item>
    </timeline>
    </el-card>

<!--请假信息-->
    <el-card class="box-card" style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span>请假信息</span>
      </div>

         <el-alert
           :title="'请假日期: '+le.datetime+'    '+(le.isOk=='0'?'待处理':le.isOk=='1'?'已批准':'未成功')"
           :type="le.isOk==0?'info':le.isOk==1?'success':'error'"
           :description="le.text"
           show-icon
           :key="index" v-for=" (le,index) in leaves"
           style="margin-bottom: 15px;"
         >
         </el-alert>

    </el-card>
  </div>
</template>

<script>
  import qs from 'qs'
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  export default {
    name: 'stuSignInfo',
    components: {
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    data(){
      return {
        infos:[],
        leaves:[],
      }
    },
    created () {
      console.log(sessionStorage.getItem("sign"))
      if(sessionStorage.getItem("sign")==null){
        this.sign();
      }
      this.init();
    },
    methods:{
      sign(){
        // -> 签到.
        this.$axios({
          method:'post',
          url:'stuSign',
          data:qs.stringify({
            'studentID':sessionStorage.getItem('id'),
            'x':sessionStorage.getItem('x'),
            'y':sessionStorage.getItem('y')
          })
        }).then(respnose=>{
          this.$message('签到成功!')
          sessionStorage.setItem("sign","1")
        })
      },
      init(){
        this.$axios({
          method:'post',
          url:'studentSignInfo',
          data:qs.stringify({'studentID':sessionStorage.getItem("id")})
        }).then(response=>{
          this.leaves=response.data.leave;
          this.infos=response.data.info;
        })
      },
    }



  }
</script>

<style scoped>

</style>
