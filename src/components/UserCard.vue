<template>
  <el-card class="user-card" @click.native="goUser(cardInfo.user)">
    <img v-if="cardInfo.avatar.length !== 0" class="poster-avatar" :src="cardInfo.avatar">
    <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
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
          this.$router.push({name: 'User', params: {id: user.id}});
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
