<template>
  <div>
    <!--      学生管理页面-->
    <el-row>
      <el-col :span="4">
        <el-menu
          default-active="1" style="padding-top: 35%">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span>签到信息</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title"> 签到管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">群[]管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">签到请示</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="20">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'stuAdmin'
  }
</script>

<style scoped>

</style>
