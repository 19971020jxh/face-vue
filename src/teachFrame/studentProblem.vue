<template>
<!--    学生签到的异样
  1.请假
  2.超时
  3.不在签到区域
  。。。
-->
  <div>
<!--    是否开启异常提醒-->
<!--    异常签到_1-->
<!--     stu_1 :.....-->
    <el-alert
      :title="m.name+'请假成功'"
      :description="m.text"
      type="success" v-if="m.isOk==1" v-for="(m,index) in  data" :key="index" style="margin: 15px;width: auto" >
    </el-alert>
    <el-alert
      :title="m.name+'请假未批准'"
      :description="m.text"
      type="info" v-if="m.isOk==-1" v-for="(m,index) in  data" :key="index" style="margin: 15px;width: auto" >
    </el-alert>
    <el-card class="box-card" v-if="m.isOk==0" v-for="(m,index) in  data" :key="index"  style="margin: 15px;" >
      <span>请假日期:{{m.datetime}}</span><span style="margin-left: 15px;">请假人:{{m.name}}</span>
      <span style="margin-left: 15px;">请假缘由:{{m.text}}</span>
      <el-button  @click="deal(m.id,-1)" style="float: right;margin-top: -9px;margin-right: 15px;">拒绝</el-button>
      <el-button type="warning" @click="deal(m.id,1)" style="float: right;margin-top: -9px;margin-right: 15px;">批准</el-button>
    </el-card>

  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'studentProblem',
    data(){
      return {
         data:[],
      }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        this.$axios({
          method:'post',
          url:'stuProblem',
          data:qs.stringify({'teachID':1})// 测试
        }).then(response=>{
          this.data=response.data.data;
          console.log(this.data)
        });

      },
      deal (id, k) {
        this.$axios({
          method:'post',
          url:'updatePro',
          data:qs.stringify({'id':id,'isOk':k})
        }).then(response=>{
           this.$message('处理成功！');
           this.init();
        })
      }

    }
  }
</script>

<style scoped>

</style>
