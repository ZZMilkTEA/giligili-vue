<template>
  <el-card class="user-card" @click.native="goUser(cardInfo.user)">
    <el-avatar v-if="cardInfo.avatar" :size="50" class="user-avatar" :src="cardInfo.avatar"></el-avatar>
    <el-avatar v-else :size="50" class="user-avatar" icon="el-icon-user-solid"></el-avatar>
    <div>
      <div class="user-nickname">{{cardInfo.nickname}}</div>
    </div>
  </el-card>
</template>

<script>
    export default {
      name: "UserCard",

      props: {
        cardInfo:{
          type: Object,
          default: () => {}
        }
      },

      data(){
        return {
        }
      },

      methods:{
        goUser(user) {
          let routeData = this.$router.resolve({name: 'User', params: {id: user.id}});
          window.open(routeData.href, '_blank');
        },
      }
    }
</script>

<style scoped>
  .user-avatar {
    width: 100%;
  }
  .user-nickname {
    margin: 4px 0px 4px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    float: left;
  }
  .user-bottom {
    margin-top: 4px;
  }
  .user-info {
    color: #909399;
  }
  .user-card {
    margin-bottom: 14px;
    cursor: pointer;
  }
</style>
