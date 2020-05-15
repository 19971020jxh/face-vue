<template>
<!--    群管理   -->
  <div>
<!--    群列表 ，群学生查看 -->
    <el-col :span="4"  >
      <el-menu   default-active="1">
        <el-menu-item :key="index" :index="index+1" v-for=" (item,index) in   signs">
             <label @click="selectGroups(item.id)" > {{item.name}}</label>
        </el-menu-item>

      </el-menu>
    </el-col>

    <el-col :span="20" >

<!--      // 群组   -->
      <el-card :key="index" class="box-card"  v-for="(group,index) in groups"  style="width: 45%;margin-right: 3%;margin-left:1%;display: inline-block" >
        <avatar :username="group.name" style="display: inline-block"></avatar>
        <div style="float: right;" @click="seeStudents(group.groupID)" >{{group.name}}</div>
        <div >
          <div style="margin-top: 11px;float: left">{{group.number}}人</div>
          <el-button style="float: right" type="text" class="button" @click="share(group.groupID)" >邀请</el-button>
          <el-button style="float: right;color: red;margin-right: 15px;" type="text" class="button" @click="groupEnd" >解散</el-button>
        </div>
      </el-card>


    </el-col>

    <el-dialog
      title="分享群"
      :visible.sync="shareDialog" width="16%" style="text-align: center">
      <qrcode id="qrcode" :value="qrcode" tag="img" ></qrcode>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="downQrCode">下载</el-button>
      </span>
    </el-dialog>

    <el-dialog title="学生信息"  :visible.sync="studentDialog">
      <el-table
        :data="students"
        style="width: 100%">
        <el-table-column
          prop="img"
          label="头像"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="mail"
          label="邮箱">
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>

</template>

<script>
  import Avatar from 'vue-avatar'
  export default {
    name: 'classManage',
    components:{
      Avatar
    },
    data(){
      return {
        signs:[],
        groups:[],
        students:[],
        shareDialog:false,
        studentDialog:false,
      }
    },
    created (){
      this.init();
    },
    methods :{
      seeGroup(){

      },
      groupEnd(){
        if(sessionStorage.getItem('teachID')==undefined){
          this.$message('请先登录！');
          return false;
        }

      },
      seeStudents(groupID){
            // 显示这个群的学生！
        this.$axios({
          method:'post',
          url:'seeStudents',
          params:{groupID:groupID},
        }).then(reponse=>{
          this.students=reponse.data.students;
        });

      },
      downQrCode(){
        let code=document.getElementById('qrcode').src;
        let a=document.createElement('a');
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        let blob=new Blob([uInt8Array], {type: contentType});
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        a.download = '群二维码';
        a.href = URL.createObjectURL(blob);
        a.click();


      },
      share(val){
        // -> 分享，邀请学生加入！
        this.shareDialog=true;
        this.qrcode='groupID-'+val;
      },
       init(){
         this.$axios({
           method:'post',
           url:'/selectByTeachID',
           params:{teachID:1}, // sessionStorage.getItem("teachID")
         }).then(response=>{
           this.signs=response.data.data;
           this.selectGroups(this.signs[0].id)
         })
       },
      selectGroups(id){
         this.$axios({
           method: 'post',
           url:'selectGroupBysignID',
           params:{id:id}
         }).then(response=>{
           this.groups=response.data.groups
         })
      }
    }
  }
</script>

<style scoped>

</style>
