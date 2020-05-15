<template>
    <div>
<!--      教师管理页面-->
     <el-row>
      <el-col :span="4">
      <el-menu
        default-active="/teachAdmin/signInfo"
        router
        style="padding-top: 35%">
        <el-menu-item index="/teachAdmin/signInfo">
            <i class="el-icon-location"></i>
            <span>签到信息</span>
        </el-menu-item>
        <el-menu-item index="/teachAdmin/signManage">
          <i class="el-icon-menu"></i>
          <span slot="title"> 签到管理</span>
        </el-menu-item>
        <el-menu-item index="/teachAdmin/classManage">
          <i class="el-icon-setting"></i>
          <span slot="title">校群管理</span>
        </el-menu-item>
        <el-menu-item index="/teachAdmin/studentProblem">
          <i class="el-icon-question"></i>
          <span slot="title">学生异样</span>
        </el-menu-item>
        <el-menu-item index="/teachAdmin/teachInfo">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-menu>
      </el-col>

       <el-col :span="20">
             <router-view></router-view>
       </el-col>
     </el-row>
    </div>
</template>

<script>
  export default {
    name: 'teachAdmin',
    created () {
      this.$router.push("/teachAdmin/signInfo")
    }
  }
</script>

<style scoped>

</style>
