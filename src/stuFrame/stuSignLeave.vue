<template>
<!--    学生请假-->
  <div>
    <el-card class="box-card" style="margin: auto;width:30%;margin-top: 15%;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="请假日期">
          <el-date-picker  value-format="yyyy-MM-dd"    type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="缘由">
        <el-input type="textarea" rows="4"  v-model="form.text"></el-input>
      </el-form-item>
<!--      <el-form-item>-->
        <el-button style="float: right;margin-bottom: 15px;"  type="primary" @click="onSubmit">确定</el-button>
<!--      </el-form-item>-->
    </el-form>
    </el-card>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'stuSignLeave',
    data(){
      return {
       form:{}
      }
    },
    methods:{
      onSubmit(){
         this.form.studentID=sessionStorage.getItem("id");// 测试 session.get
          this.$axios({
            method:'post',
            url:'askLeave',
            data:qs.stringify(this.form)
          }).then(response=>{
            this.$message("已提交给导员,同意后将会邮件通知！")
          });
      }
    },


  }
</script>

<style scoped>

</style>
