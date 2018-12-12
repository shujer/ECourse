<template>
  <div>
    <div class="hello" v-if="$store.state.authUser.loginState">
      <el-row class="info-card" :gutter="20">
        <el-col :span="6"><img :src="user.avatar" alt=""></el-col>
        <el-col :span="18">
          <ul>
            <li>
              昵称：{{user.name}}
            </li>
            <li>
              钱包余额：{{user.balance}}（inWei）
            </li>
            <li>
              <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="">
                  <el-input v-model.number="formInline.balance" placeholder="取款数量(inWei)"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">取款</el-button>
                </el-form-item>
              </el-form>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      你还未登陆！无法查看个人信息，请先在我们的社区创建账号！<router-link to="/Register">注册页面</router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import state from "../store/state";
export default {
  name: 'UserInfo',
  computed: mapState({
    user: state => state.authUser.account
  }),
  data () {
    return {
      msg: 'Hello to UserInfo!',
      formInline: {
        balance: 0
      }
    }
  },
  methods: {
    onSubmit() {
      if(this.formInline.balance > this.user.balance) {
        this.$message.error('输入金额过大，取款失败');
        this.formInline.balance = this.user.balance;
        return false;
      } else if(this.formInline.balance <= 0) {
        this.$message.error('输入金额不能小于0');
        this.formInline.balance = this.user.balance;
        return false;
      } else {
        this.$store.state.contractInstance().methods.withdraw(this.formInline.balance)
          .send({from:this.$store.state.web3.coinbase, gas: 300000})
          .on('receipt', receipt => {
            this.$message('取款成功');
            this.formInline.balance = 0;
            this.$store.dispatch('checkLoginState');
          })
          .on('error', error => {
            this.$message('取款失败');
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 100%;
    height: 220px;
  }
  .info-card {
    height: 240px;
    text-align: left;
    font-size: 18px;
  }
</style>
