<template>
  <el-header class="my-header">
    <div class="brand">ECourse</div>
    <div class="header-item">
      <router-link to="/">课程首页</router-link>
    </div>
    <div class="header-item">
      <router-link to="/CreateCourse">创建课程</router-link>
    </div>
    <div class="header-item">
      <router-link to="/UserCourse">个人课程</router-link>
    </div>
    <div class="user-info">
      <user-controller></user-controller>
    </div>
  </el-header>
</template>

<script>
  import UserController from './UserController'
  export default {
    name: "TopNav",
    components: {
      'user-controller': UserController
    },
  }
</script>

<style scoped>
  .my-header {
    position: fixed;
    top: 0;
    background-color: #263959;
    height: 55px !important;
    width: 100%;
    /*overflow-x: auto;*/
    padding: 0;
    z-index: 99;
    text-align: left;
    font-size: 16px;
  }
  .header-item {
    display: inline-block;
    width: 90px;
    color: white;
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 14px;
  }
  .header-item a {
    color: white;
    text-decoration-line: none;
  }
  .header-item a:hover {
    color: #55967e;
  }
  .brand {
    width: 80px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    display: inline-block;
    color: #e4e7ec;
  }
  .user-info {
    /*display: inline-block;*/
    float: right;
    height: 55px;
  }
</style>
