<template>
  <div class="hello" v-if="$store.state.authUser.loginState">
    <el-row class="info-card" :gutter="20">
      <el-col :span="5">
        <img :src="$store.state.authUser.account.avatar" alt="">
      </el-col>
      <el-col :span="18">
        <h1>{{$store.state.authUser.account.name}}! 欢迎来到你的ECourse个人空间</h1>
      </el-col>
    </el-row>
    <el-row>
      <div class="timeline-container">
        <el-row class="timeline-card" v-for="(item, index) in courseList" :key="index" :gutter="10">
          <el-col :span="5">
            <el-row class="line"></el-row>
            <el-row class="tag">已订阅课程{{item.id}}<div class="circle"></div></el-row>
            <el-row  class="line"></el-row>
          </el-col>
          <el-col :span="19">
            <el-row>
              <el-col :span="8">
                <img v-if="item.coverImage" :src="item.coverImage" alt="">
                <div v-else class="padding-img"></div>
              </el-col>
              <el-col :span="10"><span class="title">{{item.name}}</span></el-col>
              <el-col :span="6">
                <el-button class="button--green learn-button">
                  <router-link :to="{path:'/Detail',query:{id: item.id}}">开始学习</router-link>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
  <div v-else>
    你还未登陆！无法查看个人信息，请先在我们的社区创建账号！<router-link to="/Register">注册页面</router-link>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'UserCourse',
    data () {
      return {
        courseList: [],
      }
    },
    mounted() {
      try {
        this.getAllCourse()
      } catch (e) {
        console.log('load course failed.')
      }
    },
    methods: {
      getAllCourse: async function () {
        if(typeof this.$store.state.contractInstance !== "function") {
          await this.$store.dispatch('getContractInstance');
        }
        let courses = await this.$store.state.contractInstance().methods.getBookCourseLength().call({from: this.$store.state.web3.coinbase});
        console.log('booked course nums: ' + courses.length);
        for(let i = 0; i < courses.length; i++) {
          this.$store.state.contractInstance().methods.getCourseById(courses[i]).call({from: this.$store.state.web3.coinbase})
            .then(result => {
              result.id = courses[i];
              this.courseList.push(result);
            })
            .catch(err => {
              console.log('no course.')
            })
        }
      }
    }
  }
</script>
<style>
  .line {
    border-right: solid 4px #55967e;
    height: 80px;
    overflow-y: auto;
  }
  .timeline-card {
    height: 180px;
    text-align: left;
    margin-top: 5px;
  }
  .timeline-card img {
    width: 280px;
    margin: 10px;
    height: 160px;
  }
  .learn-button {
    margin-top: 70px;
  }
  .tag {
    font-size: 18px;
    color: #55967e;
    font-weight: bold;
    height: 20px;
    text-align: center;
  }
  .title {
    font-size: 16px;
    height: 120px;
    line-height: 120px;
    color: #263959;
    font-weight: bolder;
  }
  .tag > .circle {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    float: right;
    margin-right: -8px;
    border: #55967e solid 3px;
  }

  .info-card  img {
    width: 100%;
    height: 180px;
  }
  .info-card {
    height: 200px;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    background-color: #eeeeee;
  }
  .info-card h1 {
    line-height: 180px;
    font-size: 30px;
  }
</style>
