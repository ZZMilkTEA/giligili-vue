<template>
  <div id="app">
    <canvas id="canvas" ref="canvas">抱歉，您的浏览器不支持canvas元素</canvas>
  </div>
</template>

<script>

export default {
  name: 'AudioShower',

  data(){
    return {
      vueCtx:'',
    }
  },
  mounted() {
    var c = document.getElementById("canvas");
    this.vueCtx = c.getContext("2d");
    this.vueCtx = this.vueCtx;
    var particles = [];

    for(var i = 0; i < 65; i++){
      particles[i] = new createParticle(randomInt(0,600), randomInt(0,300), randomInt(5,15)
        , colorRgb(randomInt(0,255), randomInt(0,255), randomInt(0,255)), randomFloat(-1,1), randomFloat(-1,1),
        randomType());
    }
    draw();
  },
}
function draw() {
  this.vueCtx.clearRect(0,0,600,300);
  for(var i = 0; i < particles.length; i++){
    particles[i].changeState();
    particles[i].draw();
  }

  //开启循环动画播放模式用的代码
  requestAnimationFrame(draw);
}

function createParticle(x,y,r,c,vx,vy,type) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.ratio = 1;
  this.radius = r;
  this.color = c;
  this.vx = vx;
  this.vy = vy;

  this.draw = function (){
    this.vueCtx.beginPath();
    this.vueCtx.arc(this.x, this.y, this.radius * this.ratio,0,
      Math.PI * 2,true);
    this.vueCtx.closePath();
    this.vueCtx.fillStyle = this.color;
    this.vueCtx.fill();
  };

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
    analyser.getByteFrequencyData(dataArray);
    let arr = dataArray.slice(0, 2);
    let sum = arr.reduce(function (a, b) {return a + b}, 0) / arr.length / 200;
    if(!sum || sum < 0.2) {
      sum = 0.2;
    }
    sum = Math.min(sum, 2);
    this.move(sum);

    switch (this.type) {
      case "low":arr = dataArray.slice(0,40);
        sum = arr.reduce(function(a,b){return a+b},0)*0.1;
        break;
      case "mid":
        arr = dataArray.slice(41,65);
        sum = arr.reduce(function(a,b){return a+b},0)*0.1;
        break;
      case "high":
        arr = dataArray.slice(66,128);
        sum = arr.reduce(function(a,b){return a+b},0)*0.1;
        break;
    }
    sum = sum / 300
    if(!sum || sum < 0.3) {
      sum = 0.3;
    }
    sum = Math.min(sum, 2);
    this.ratio = 1+ sum;
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
}


//定义颜色
function colorRgb(r,g,b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}
//生成随机整数函数
function randomInt(from, to){
  return parseInt(Math.random() * (to - from + 1) + from);
}
//生成随机浮点数函数
function randomFloat(from, to){
  return Math.random() * (to - from + 1) + from;
}

function randomType(){
  var value = randomInt(0,2);
  switch (value) {
    case 0:return "low";
    case 1:return "mid";
    case 2:return "high";
  }
}

</script>

<style>

</style>
