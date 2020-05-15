<template>
<!--    签到管理增删改页面-->
  <div>
<!--    1.已经存在的签到列表-->
<!--    列表 ，定时启动 -->

    <el-button @click="newGroupDialog=true" style="margin: 25px" >新建签到</el-button>
    <el-table
      :data="tableData"
      style="width: 95%;margin: auto" >
      <el-table-column v-if="false">
        <template slot-scope="scope">{{scope.row.ID}}</template>
      </el-table-column>
      <el-table-column
        label="签到"
       >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        >
        <template slot-scope="scope">
        <span>{{scope.row.startHour}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        >
        <template slot-scope="scope">
        <span>{{scope.row.endHour}}</span>
        </template>
      </el-table-column>
      <el-table-column

        label="开始日期"
        >
        <template slot-scope="scope">
        <span>{{scope.row.startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column

        label="结束日期"
       >
        <template slot-scope="scope"  >
        <span>{{scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="次数"
        >
        <template slot-scope="scope">
        <span>{{scope.row.signStyle}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="周期性"
        >
        <template slot-scope="scope">
        <span>{{scope.row.replyDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280%" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="share(scope.row)">邀请</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新建签到"
      :visible.sync="newGroupDialog"
      width="30%"
      >
      <el-form   :model="group" label-width="80px">
        <el-form-item label="群名称" style="display: block">
          <el-input v-model="group.name"></el-input>
        </el-form-item>
        <el-form-item label="次数" >
          <el-select v-model="group.signStyle" placeholder="请选择" style="display: block">
            <el-option label="一次" :value="0"></el-option>
            <el-option label="周期性" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col   style="width: 100%" >
            <el-time-picker format='HH:mm' value-format="HH:mm"  type="fixed-time" placeholder="选择日期" v-model="group.startHour" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col   style="width: 100%" >
            <el-time-picker format='HH:mm' value-format="HH:mm" type="fixed-time" placeholder="选择日期" v-model="group.endHour" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-col style="width: 100%" >
            <el-date-picker format='yyyy-MM-dd' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="group.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col style="width: 100%" >
            <el-date-picker format='yyyy-MM-dd' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="group.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="签到日期" v-if="noReplyDate" >
          <el-select  v-model="group.replyDate" placeholder="请选择" style="display: block">
            <el-option label="每天" :value="0"></el-option>
            <el-option label="周一" :value="1"></el-option>
            <el-option label="周二" :value="2"></el-option>
            <el-option label="周三" :value="3"></el-option>
            <el-option label="周四" :value="4"></el-option>
            <el-option label="周五" :value="5"></el-option>
            <el-option label="周六" :value="6"></el-option>
            <el-option label="周日" :value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="newGroupDialog = false">取 消</el-button>
        <el-button type="primary" @click="newGroup">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑签到"
      :visible.sync="EditGroupDialog"
      width="30%"
    >

      <el-form   :model="editGroup" label-width="80px">

        <el-form-item label="群名称">
          <el-input v-model="editGroup.name"></el-input>
        </el-form-item>
        <el-form-item label="次数">
          <el-select v-model="editGroup.signStyle" placeholder="请选择">
            <el-option  label="一次" :value="0"></el-option>
            <el-option label="周期性" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-time-picker format='HH:mm' value-format="HH:mm"  type="fixed-time" placeholder="选择日期" v-model="editGroup.startHour" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-time-picker format='HH:mm' value-format="HH:mm" type="fixed-time" placeholder="选择日期" v-model="editGroup.endHour" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-col :span="11">
            <el-date-picker format='yyyy-MM-dd' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="editGroup.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col :span="11">
            <el-date-picker format='yyyy-MM-dd' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="editGroup.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="签到日期" v-if="noReplyDate" >
          <el-select  v-model="editGroup.replyDate" placeholder="请选择">
            <el-option label="每天" :value="0"></el-option>
            <el-option label="周一" :value="1"></el-option>
            <el-option label="周二" :value="2"></el-option>
            <el-option label="周三" :value="3"></el-option>
            <el-option label="周四" :value="4"></el-option>
            <el-option label="周五" :value="5"></el-option>
            <el-option label="周六" :value="6"></el-option>
            <el-option label="周日" :value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="EditGroupDialog = false">取 消</el-button>
        <el-button type="primary" @click="editGroupF">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="分享群"
      :visible.sync="shareDialog" width="16%" style="text-align: center">
      <qrcode id="qrcode" :value="qrcode" tag="img" ></qrcode>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="downQrCode">下载</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: 'signManage',
    data(){
      return {
        qrcode:'',
        shareDialog:false,
        EditGroupDialog:false,
        newGroupDialog:false,
        group:{
          replyDate:"",
          name:'',
          startHour:'',
          endHour:'',
          startTime:'',
          endTime:'',
          signStyle:'',
        },
        editGroup:{},
        tableData:[],
        noReplyDate:false,
      }
    },
    watch:{
      'group.signStyle':{
        handler:function(val){
          if(val==0) {
            this.noReplyDate=false;
          }else{
            this.noReplyDate=true;
          }
          this.group.replyDate="";
        }
      }
    },
    created(){
      this.init();
    },

    methods:{
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
        this.qrcode='signID-'+val.id;
      },
      handleDelete(val){
        this.$axios({
          method:'post',
          url:'daleteSign',
          params:val
        }).then(response=>{
          this.$message("删除成功！");
          this.init();
        });
      },
        handleEdit(val){
          this.editGroup=val
          this.EditGroupDialog=true;
        },
        editGroupF(){
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
           this.$axios({
             method:'post',
             url:'editSign',
             params:this.editGroup
           }).then(response=>{
             loading.close();
             this.$message('修改完成！');
             this.EditGroupDialog=false;
             this.init();
           })

        },
        newGroup(){
          this.group.teachID=sessionStorage.getItem("teachID");
          if(this.group.replyDate==""){this.group.replyDate=-1; }
          // 测试
          this.group.teachID=1;
          this.$axios({
            method:'post',
            url:'newSign',
            params: this.group,
          }).then(response=>{
            this.newGroupDialog=false;
            this.init()
          });
        },
        init(){
          this.$axios({
            method:'post',
            url:'/selectByTeachID',
            params:{teachID:1}, // sessionStorage.getItem("teachID")
          }).then(response=>{
            this.tableData=response.data.data;
          })

        },
    }



  }
</script>

<style scoped>

</style>
