<template>
  <div id="app">
    <canvas id="canvas" ref="canvas" width="600" height="300">抱歉，您的浏览器不支持canvas元素</canvas>
    <audio :src="file" ref="audio" controls="controls" crossorigin="anonymous">    </audio>
  </div>
</template>

<script>

  export default {
  name: 'AudioShower',

  props:{
    file:'',
  },

  data(){
    return {
      vueCtx:'',
      particles :[],
      //获取input元素的变量
      audioCtx:'',
      //创建audio元素并付给audio变量
      audio: '',
      //声明各个需要的节点
      musicSourceNode : '',
      gainNode: '',
      analyser: '',
      bufferLength:0,
      dataArray:[],

      Particle:function (x,y,r,c,vx,vy,type) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.ratio = 1;
        this.radius = r;
        this.color = c;
        this.vx = vx;
        this.vy = vy;

        //粒子的移动
        this.move = function (sum) {
          if (this.isOutOfLeft()){
            this.x = 0;
            this.vx = -this.vx;
          }
          if (this.isOutOfRight()){
            this.x = 600;
            this.vx = -this.vx;
          }
          if (this.isOutOfTop()){
            this.y = 0;
            this.vy = -this.vy;
          }
          if (this.isOutOfBottom()){
            this.y = 300;
            this.vy = -this.vy;
          }
          this.x += this.vx * sum;
          this.y += this.vy * sum;
        };

        //根据音频改变粒子的状态
        this.changeState = function () {

        };

      //越界判断
        this.isOutOfRight = function () {
          return this.x + this.vx > 600 ;
        };
        this.isOutOfLeft = function () {
          return  this.x + this.vx < 0;
        };

        this.isOutOfTop = function () {
          return this.y + this.vy < 0;
        };
        this.isOutOfBottom = function () {
          return this.y + this.vy > 300;
        }
      },
    }
  },
  mounted() {
    this.init();
  },

  methods:{


    init(){
      let c = document.getElementById("canvas");
      let ctx = c.getContext("2d");
      this.vueCtx = ctx;

      //音频接口相关
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.audio = this.$refs.audio;
      this.musicSourceNode = this.audioCtx.createMediaElementSource(this.audio);
      this.gainNode = this.audioCtx.createGain();
      this.analyser = this.audioCtx.createAnalyser();
      //一些参数设置

      this.gainNode.gain.value =0.5;
      this.analyser.fftSize = 1024;
      //结点的连接
      this.musicSourceNode.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
      //定义音频数据的容器
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);



      for(let i = 0; i < 60; i++){

        this.particles[i] =new this.Particle(
          this.randomInt(0,600),
          this.randomInt(0,300),
          this.randomInt(10,16),
          this.colorRgb(this.randomInt(0,255),this.randomInt(0,255),this.randomInt(0,255)),
          this.randomFloat(-1,1),
          this.randomFloat(-1,1),
          this.randomType());
      }

      this.draw();
    },


    draw(){
      this.vueCtx.clearRect(0,0,600,300);
      for(let i = 0; i < this.particles.length; i++){
        // 画粒子
        this.vueCtx.beginPath();
        this.vueCtx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].radius * this.particles[i].ratio,0,
          Math.PI * 2,true);
        this.vueCtx.closePath();
        this.vueCtx.fillStyle = this.particles[i].color;
        this.vueCtx.fill();

        //根据频域数据修改粒子状态
        this.analyser.getByteFrequencyData(this.dataArray);
        let arr = this.dataArray.slice(0, 2);
        let sum = arr.reduce(function (a, b) {return a + b}, 0) / arr.length / 130;

        sum = sum*sum;
        if(!sum || sum < 0.7) {
          sum = 0.2;
        }
        this.particles[i].move(sum);
        switch (this.particles[i].type) {
          case "low":
            arr = this.dataArray.slice(0,20);
            sum = arr.reduce(function(a,b){return a+b},0) / arr.length * 0.02  ;
            break;
          case "mid":
            arr = this.dataArray.slice(57,67);
            sum = arr.reduce(function(a,b){return a+b},0) / arr.length * 0.02 ;
            break;
          case "high":
            arr = this.dataArray.slice(104,118);
            sum = arr.reduce(function(a,b){return a+b},0) / arr.length * 0.02 ;
            break;
        }

        sum = (1+ sum)*(1+ sum/2)/4;
        if(!sum || sum < 0.5) {
          sum = 0.5;
        }
        this.particles[i].ratio = sum;

      }
      requestAnimationFrame(this.draw);
    },




    //定义颜色
    colorRgb(r,g,b) {
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    //生成随机整数函数
     randomInt(from, to){
      return parseInt(Math.random() * (to - from + 1) + from);
    },
    //生成随机浮点数函数
    randomFloat(from, to){
      return Math.random() * (to - from + 1) + from;
    },
    randomType(){
      var value = this.randomInt(0,2);
      switch (value) {
        case 0:return "low";
        case 1:return "mid";
        case 2:return "high";
      }
    }

  }
}




</script>

<style>

</style>
