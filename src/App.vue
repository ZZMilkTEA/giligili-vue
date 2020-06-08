<template>
  <div id="app" class="main-contianer">
    <NavBar v-if="isNavAlive"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  data(){
    return{
      isNavAlive: true,
      isPostAlive:true,
    }
  },
  components: {
    NavBar,
  },
  methods:{
    navReload(){
      this.isNavAlive = false;
      this.$nextTick(() => (this.isNavAlive = true))
    },
    postReload(){
      this.isPostAlive = false;
      this.$nextTick(() => (this.isPostAlive = true))
    },
  }
};
</script>

<style>
</style>
