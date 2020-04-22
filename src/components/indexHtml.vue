<template>
<div>
    <canvas id="canvas2"></canvas>
<!--  <el-row style="padding-top: 45px;"></el-row>-->
   <el-row style="margin-left: 5%;">
     <img src="../assets/hebeu_logo.png">
   </el-row>
    <el-row  style="width: 50%;margin-left: 25%;">

      <el-steps :active="nowStep" finish-status="success">
        <el-step title="请对准相机"></el-step>
        <el-step title="人脸识别"></el-step>
        <el-step title="活体检测"></el-step>
        <el-step title="人脸匹配"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-row>
  <el-row style="text-align: center"> <p style="color:red" v-html="data.info"> </p></el-row>
    <el-row :span="24" style="text-align: center;margin-top:45px;" >
      <el-col>
        <video id="video"    style="border-radius: 20%;width: 250px;height: 250px;"  autoplay muted></video>
      </el-col>
      <el-col style="position: absolute;z-index: 999;">
        <canvas id="overlay" style="border-radius: 20%;width: 250px;height: 250px;"  ></canvas>
      </el-col>
    </el-row>
  <el-row style="text-align: center;margin-top: 45px;">
        <el-button type="primary">教师登陆</el-button>
        <br/>
        <el-button style="margin-top: 15px;" type="info">在线预览</el-button>
  </el-row>

  <el-dialog title="注册" :visible.sync="registerDialog">
    <el-form :model="student">
      <el-form-item label="学号" :label-width="15">
        <el-input v-model="student.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="15">
        <el-input v-model="student.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="registerDialog = false">取 消</el-button>
      <el-button type="primary" @click="register">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>


<script>
  import * as faceapi from 'face-api.js'
  import axios from 'axios'
  import "babel-polyfill"
  export default {
    name: 'indexHtml',
    data(){
      return {
        student:{
          id:'',
          name:'',
          img:'',
        },
        registerDialog:false,
        video:'',
        nowStep:1,
        data:{
          // 是不是有人脸
          isFace:false,
          // 是不是活体
          isLive:false,
          isFinish:{
            isRequest:false,
            finish:false,
            img:''
          },
          // 活体检测动作, -1  1 微笑 2 张嘴
          neeDo:'-1',
         // 提示语
          info:'请对准相机'
        }
      }
    },
    created(){

    },
    watch:{
      data:{
        handler(newV,oldV){
          if(newV.isLive==false&& newV.isFace==false) this.nowStep= 2;
          if(newV.isFace==true) {
            if(newV.isLive==false) this.nowStep= 3;
            if(newV.isLive==true) this.nowStep=  4;
            if(newV.isFinish.finish==true) this.nowStep=5;// 匹配完成
          }
        },
        deep:true
      }
    },
    mounted(){
      this.backgroundJ();
       this.initJ();
    },
    methods:{
    initJ(){
      this.video=document.getElementById('video')
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('static/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('static/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('static/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('static/models'),
      ]).then(this.startVideo)
      this.video.addEventListener('play', () => {
      let canvas =document.getElementById('overlay')
      // faceapi.createCanvasFromMedia(this.video)
      // document.body.append(canvas)
      const displaySize = { width: 450, height: 450 }
      faceapi.matchDimensions(canvas, displaySize)
      //  alert('start!')
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, 450, 450)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        // 状态检查!
        this.check(detections);
      }, 1000)

    })
  },
    check(detections){
     // alert(JSON.stringify(this.data))
      if(detections.length==0 && this.data.isFace==false){
        this.data.isFace=false;
        this.data.isLive=false;
        this.data.info='请对准相机'
        return false;
      }
      if(detections.length>1){
        this.data.isFace=false;
        this.data.isLive=false;
        this.data.info='人脸数过多,请检查!'
        return false;
      }
      if(detections.length==1){
        let people=detections[0];
         if(people.detection.score>0.5){
         //  this.photo();//拍照
           this.data.isFace=true;
           if(this.data.isLive==true) return  false;
           if(this.data.neeDo==-1){
             this.sleep(1.5)
             // 随机做表情,
             if( Math.round(Math.random())>0.5){this.data.neeDo=1;this.data.info='活体检测中,请<strong>微笑</strong>!'}else{this.data.neeDo=2;this.data.info='活体检测中,请<strong>张嘴</strong>sa!'};
           }
         }
         if(this.data.isLive==false){
            if(this.data.neeDo==1&&people.expressions.happy>=0.95){
              this.data.isLive=true;
              this.data.info='活体检测通过!';
            }
           if(this.data.neeDo==2&&(people.expressions.surprised>=0.95 ||people.expressions.angry>=0.95 )){
             this.data.isLive=true;
             this.data.info='活体检测通过!';
           }
           this.sleep(1.5)
         }
         // 数据库人脸匹配
         if(this.data.isFinish.finish==false && this.data.isLive==true && this.data.isFinish.isRequest==false){
            // 请求开始
            this.data.isFinish.isRequest=true;
            // 发送请求!
             this.$axios({
               method:'post',
               url:'/face',
               data:{
                 'img':this.data.isFinish.img
               }
             }).then(response=>{
               // 返回学生信息[对象]
               if(response.data.success==="true"){
                 // ->检测成功跳转.
               }else{
                 this.$confirm('你的信息并不存在,请注册!或者再试一次.', '提示', {
                   confirmButtonText: '注册',
                   cancelButtonText: '再试一次',
                   type: 'warning'
                 }).then(() => {
                   this.student.img=response.data.img;
                   this.registerDialog=true;
                 }).catch(() => {
                   // 刷新页面.
                   location.reload();
                 });
               }
             })
         }

      }

    },
      // 学生注册
    register(){
      this.$axios({
        method:'post',
        url: 'register',
        data:this.student
      }).then(response=>{
        //-> 注册结果！。
        this.registerDialog=false;
        //-> 跳转.

      }) ;
    },
    startVideo() {
    navigator.getUserMedia(
      { video: {width:450,height:450} },
      stream => this.video.srcObject = stream,
      err => console.error(err)
    )
  },
      photo () {
        if(this.data.isFinish.img===''){
          let canvas = document.getElementById("overlay")
          let context = canvas.getContext("2d")
          let video = document.getElementById("video")
          context.drawImage(video, 0, 0, 450, 450)
          this.data.isFinish.img = canvas.toDataURL("image/png")
        }
      //  console.log(this.data.isFinish.img)   --- base64
      },

      sleep(time) {
        let startTime = new Date().getTime() + parseInt(time, 10);
        while(new Date().getTime() < startTime) {}
      },

  // ///////////////////////////背景
      backgroundJ(){
        //更新页面用requestAnimationFrame替代setTimeout
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        let canvas2 = document.getElementById('canvas2');
        let ctx = canvas2.getContext('2d');
        let w = canvas2.width = canvas2.offsetWidth;
        let h = canvas2.height = canvas2.offsetHeight;
        let circles = [];
        let current_circle = new currentCirle(0, 0)

        let draw = function() {
          ctx.clearRect(0, 0, w, h);
          for (let i = 0; i < circles.length; i++) {
            circles[i].move(w, h);
            circles[i].drawCircle(ctx);
            for (let j = i + 1; j < circles.length; j++) {
              circles[i].drawLine(ctx, circles[j])
            }
          }
          if (current_circle.x) {
            current_circle.drawCircle(ctx);
            for (let k = 1; k < circles.length; k++) {
              current_circle.drawLine(ctx, circles[k])
            }
          }
          requestAnimationFrame(draw)
        }

        let init = function(num) {
          for (let i = 0; i < num; i++) {
            circles.push(new Circle(Math.random() * w, Math.random() * h));
          }
          draw();
        }

        window.addEventListener('load', init(60));

        window.onmousemove = function(e) {
          e = e || window.event;
          current_circle.x = e.clientX;
          current_circle.y = e.clientY;
        }

        window.onmouseout = function() {
          current_circle.x = null;
          current_circle.y = null;
        }
      }
  }
  }


//----------------------背景

  class Circle {
    //创建对象
    //以一个圆为对象
    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
    //this.r是创建圆的半径，参数越大半径越大
    //this._mx,this._my是移动的距离，参数越大移动
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = Math.random() * 10;
      this._mx = Math.random();
      this._my = Math.random();

    }

    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆
    //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
    drawCircle(ctx) {
      ctx.beginPath();
      //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
      ctx.arc(this.x, this.y, this.r, 0, 360)
      ctx.closePath();
      ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
      ctx.fill();
    }

    drawLine(ctx, _circle) {
      let dx = this.x - _circle.x;
      let dy = this.y - _circle.y;
      let d = Math.sqrt(dx * dx + dy * dy)
      if (d < 150) {
        ctx.beginPath();
        //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
        ctx.moveTo(this.x, this.y); //起始点
        ctx.lineTo(_circle.x, _circle.y); //终点
        ctx.closePath();
        ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.stroke();
      }
    }

    // 圆圈移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
      this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
      this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
      this.x += this._mx / 2;
      this.y += this._my / 2;
    }
  }

  //鼠标点画圆闪烁变动
  class currentCirle extends Circle {
    constructor(x, y) {
      super(x, y)
    }

    drawCircle(ctx) {
      ctx.beginPath();
      //注释内容为鼠标焦点的地方圆圈半径变化
      //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
      this.r = 8;
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath();
      //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
      ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
      ctx.fill();

    }
  }



</script>
<style scoped>


  #canvas2 {
    width: 99%;
    height: 94%;
    z-index: -100;
    position: absolute;
  }
</style>
