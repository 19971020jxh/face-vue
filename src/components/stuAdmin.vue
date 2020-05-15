<template>
  <div>
    <!--      学生管理页面-->
    <el-row>
      <el-col :span="4">
        <el-menu
          default-active="/stuAdmin/stuSignInfo"
          router
          style="padding-top: 35%">
          <el-menu-item index="/stuAdmin/stuSignInfo">
            <i class="el-icon-location"></i>
            <span>签到信息</span>
          </el-menu-item>
          <el-menu-item index="/stuAdmin/stuSigManage">
            <i class="el-icon-menu"></i>
            <span slot="title"> 签到管理</span>
          </el-menu-item>
<!--          <el-menu-item index="3">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">群[]管理</span>-->
<!--          </el-menu-item>-->
          <el-menu-item index="/stuAdmin/stuSignLeave">
            <i class="el-icon-setting"></i>
            <span slot="title">签到请示</span>
          </el-menu-item>
          <el-menu-item index="/stuAdmin/stuInfo">
            <i class="el-icon-setting"></i>
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
  import qs from 'qs'
  export default {
    name: 'stuAdmin',
    data(){
      return {

      }
    },
    created(){

       this.$router.push("/stuAdmin/stuSignInfo")

    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
