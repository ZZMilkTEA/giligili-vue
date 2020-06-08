<template>
  <div class="DailyRankShower">
    <h3><slot></slot></h3>
    <span class="score">点击量</span>
        <span v-for="item in items" class="rank-item" @click="goMediaPage(item.id)">
          {{item.title}}
          <el-progress :stroke-width="10"
                       :percentage="item.daily_view / maxView *100"
                       :format="format"
                       :color="customColorMethod"
        ></el-progress>
        </span>


  </div>
</template>

<script>
  import * as API from '../api/rank'

    export default {
        name: "DailyRankShower",

      props:{
        type:'',
      },

      data(){
          return{
            items:[],
            maxView:0,
          }
      },

      methods:{
          load(){
            if (this.type === 'video'){
              API.videoDailyRank().then((res) =>{
                this.items = res.data;
                this.items.sort(this.sortView);
                this.maxView = this.items[0].daily_view;
                console.log(this.maxView)
              })
            }
            if (this.type === 'audio'){
              API.audioDailyRank().then((res) =>{
                this.items = res.data;
                this.items.sort(this.sortView);
                this.maxView = this.items[0].daily_view;
              })
            }
          },

        goMediaPage(id) {
          if(this.type === 'video') {
            let routeData = this.$router.resolve({name: 'ShowVideo', params: {id: id}});
            window.open(routeData.href, '_blank');
            }
          if(this.type === 'audio') {
            let routeData = this.$router.push({name: 'ShowAudio', params: {id: id}});
            window.open(routeData.href, '_blank');
          }
        },

        customColorMethod(percentage){
            let number = percentage/100 ;
            return this.colorRgb(255*number,130 - 130*number, 255 - 255*number);
        },

        format(percentage) {
          return Math.round(this.maxView * percentage / 100);
        },

        sortView(a, b){
          return b.daily_view - a.daily_view;
        },

        colorRgb(r,g,b) {
          r = Math.round(r).toString(16)
          g = Math.round(g).toString(16)
          b = Math.round(b).toString(16)
          if (r.length === 1) r = '0' + r;
          if (g.length === 1) g = '0' + g;
          if (b.length === 1) b = '0' + b;
          let rgbStr = "#" + r + g + b
          return rgbStr;
        },
      },

      created() {
          this.load();
      }
    }
</script>

<style scoped>
  .rank-item:hover {
    color: #00a1d6;
    cursor: pointer;
  }

  .score{
    float: right;
    position: relative;
    top: -0.5em;
    left: -20px;
    font-size: 0.7em;
    color: #555555;

  }


</style>
