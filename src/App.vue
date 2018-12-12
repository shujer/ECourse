<template>
    <el-container id="app">
      <top-nav></top-nav>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'
  import TopNav from './components/TopNav'
  import state from "./store/state";
  export default {
    name: 'App',
    components: {
      'top-nav': TopNav
    },
    async beforeCreate() {
      if(!this.$store.state.web3.web3Instance) {
        await this.$store.dispatch('registerWeb3');
        await this.$store.dispatch('getContractInstance');
      }
    },
    computed: mapState({
      contractInstance: state => state.contractInstance,
      coinbase: state => state.web3.coinbase
    }),
    watch: {
      contractInstance: function (val) {
        this.$store.dispatch('checkLoginState');
      },
      coinbase: function (val) {
        this.$store.dispatch('checkLoginState');
      }
    },
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    text-align: center;
  }

  #content-container {
    position: absolute;
    /*top: 55px;*/
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul > li {
    margin-top: 10px;
    padding: 0;
  }
  .button--green{
    background-color: #55967e;
    color: #eeeeee;
  }
  .button--green:hover {
    background-color: #eeeeee;
    color: #55967e;
    font-weight: bold;
  }
  .button--green  a {
    background-color: #55967e;
    color: #eeeeee;
    text-decoration: none;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
