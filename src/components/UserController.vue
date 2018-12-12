<template>
  <div class="user-container">
    <div class="avatar-container">
      <img :src="user.account.avatar" alt="头像" class="user-avatar">
    </div>
    <el-dropdown @command="handleCommand" props="isEnable">
      <div class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a" v-if="user.loginState && user.registerState">个人主页</el-dropdown-item>
        <el-dropdown-item command="b" v-if="!user.loginState && !user.registerState">注册</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        isEnable: true
      }
    },
    computed: mapState({
      contractInstance: state => state.contractInstance,
      user: state => state.authUser
    }),
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'a': this.$router.push({path: '/UserInfo'});break;
          case 'b':  this.$router.push({path: '/Register'});break;
          default : break;
        }
      }
    }
  }
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .user-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .avatar-container {
    width: 55px;
    height: 55px;
    display: inline-block;
    padding: 10px;
  }
  .user-container {
    width: 90px;
    padding: auto 0 auto 0;
  }
</style>

