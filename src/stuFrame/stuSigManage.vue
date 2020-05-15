<template>
<!--    学生通过教师分享的链接或二维码加入签到群-->
  <div>
    <h3 style="margin: 15px;" >请出示分享的二维码</h3>
    <div >
      <qrcode-stream @decode="onDecode" @init="onInit" style=" margin:auto; width: 250px;height: 250px;" />
    </div>

    <h3 style="margin: 15px;" >扫描结果[示例]: {{ result }}</h3>
    <div style="margin: 30px;" :key="index" v-for="(item,index) in tabledata">
      <el-card class="box-card">
      <span>{{item.name}}</span>
      <el-button type="warning" style="float: right;margin-top: -8px;" @click="addGroup(item.id)" >加入</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import { QrcodeStream } from 'vue-qrcode-reader'
  export default {
    name: 'stuSigManage',
    components: { QrcodeStream },
    data () {
      return {
        result: '',
        error: '',
        tabledata:[{
          id:'1',
          name:'计算机3班签到群'
        },{
          id:'2',
          name:'计算机6班签到群'
        }],
      }
    },
    methods: {
      onDecode (result) {
        this.result = result
        this.$axios({
          method: 'post',
          url:'addGroup',
          data:qs.stringify({'str':this.result})
        }).then(response=>{
            this.tabledata=[];
            this.tabledata=response.data.groups;
        })

      },
      async onInit (promise) {
        try {
          await promise
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            this.error = "ERROR: you need to grant camera access permisson"
          } else if (error.name === 'NotFoundError') {
            this.error = "ERROR: no camera on this device"
          } else if (error.name === 'NotSupportedError') {
            this.error = "ERROR: secure context required (HTTPS, localhost)"
          } else if (error.name === 'NotReadableError') {
            this.error = "ERROR: is the camera already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.error = "ERROR: installed cameras are not suitable"
          } else if (error.name === 'StreamApiNotSupportedError') {
            this.error = "ERROR: Stream API is not supported in this browser"
          }
        }
      },
      addGroup(groupID){
        this.$axios({
          method:'post',
          url:'jj',
          params:{'groupID':groupID,'studentID':sessionStorage.getItem("id")},//测试 session.get
        }).then(response=>{
           this.$message('加入成功！請及時注意群簽到');
           this.tabledata=[];
        });
      },
    }
  }
</script>

<style scoped>

</style>
