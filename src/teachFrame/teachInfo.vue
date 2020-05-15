<template>
<!--    教师个人信息修改或配置修改  -->
  <div   >
    <el-card style="width: 40%;margin: auto;margin-top: 5%" >
    <el-form  :model="teacher" label-width="80px">
      <el-form-item label="id" v-if="false">
        <el-input v-model="teacher.id"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
       <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="teacher.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="teacher.password1"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="teacher.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="teacher.mail"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="update">修改</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>

</template>

<script>
  import qs from 'qs'
  export default {
    name: 'teachInfo',
    data(){
      return {
        teacher:{},
      }
    },
    created () {
      this.$axios({
        method:'post',
        url:'selectTeacher',
        data:qs.stringify({'teachID':1})//测试
      }).then(r=>{
         this.teacher=r.data.teacher;
      })
    },
    methods:{
      update(){
         if(this.teacher.password==this.teacher.password1){
            this.$axios({
              method: 'post',
              url:'updateTer',
              data:qs.stringify(this.teacher)
            }).then(r=>{
              this.$message('修改成功！')
            })
         }
      }
    }

  }
</script>

<style scoped>

</style>
