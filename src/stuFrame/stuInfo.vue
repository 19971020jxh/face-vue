<template>
<!--    学生个人信息修改-->
  <div>
     <el-card class="box-card" style="width: 40%;margin: auto;margin-top: 5%;">
       <el-form :model="student">
         <el-form-item label="id" label-width="15" v-if="false">
           <el-input v-model="student.id" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="学号" label-width="15">
           <el-input v-model="student.studentID" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="姓名" label-width="15">
           <el-input v-model="student.name" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" label-width="15">
           <el-input v-model="student.mail" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="电话" label-width="15">
           <el-input v-model="student.phone" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="导员"  >
           <el-select v-model="student.daoyuan" placeholder="请选择" style="display: block">
             <el-option :label="item.name" :key="item.id"  v-for=" item in   daoyuan "  :value="item.id"></el-option>
           </el-select>
         </el-form-item>
         <el-button type="primary" style="margin-bottom: 15px;float: right" @click="onSubmit" >确定</el-button>
       </el-form>

     </el-card>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'stuInfo',
    data(){
      return {
        student:{
          id:'',
          studentID:'',
          name:'',
          mail:'',
          phone:'',
          daoyuan:[],
        },
      }
    },
    created () {
      this.init();
    },
    methods:{
      init(){
        this.$axios({
          method:'post',
          url:'stuInfo',
          data:qs.stringify({'id':sessionStorage.getItem('id')})
        }).then(response=>{
          this.student=response.data.student;
          this.daoyuan=response.data.daoyuan;
        })
      },
      onSubmit(){
        this.$axios({
          method: 'post',
          url:'updateStudent',
          data:qs.stringify(this.student),
        }).then(response=>{
             this.$message('修改成功！')
        })
      },
    }
  }
</script>

<style scoped>

</style>
