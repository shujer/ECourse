<template>
  <div class="detail">
    <el-row class="course-card" :gutter="20">
      <el-col :span="7"><img :src="course.coverImage" alt=""></el-col>
      <el-col :span="11">
        <h1>{{course.name}}</h1>
        <ul class="course-detail">
          <li>作者：{{course.author}}</li>
          <li>课程分类：{{course.courseType}}</li>
          <li>课程付费类型：{{course.feeType}}</li>
          <li v-show="course.feeType!='免费'">费用：{{course.courseFee}}（inWei）</li>
          <li>课程天数：{{course.courseDays}}</li>
          <li v-if="course.isbook">已订阅</li>
          <li v-else><el-button class="button--green"  @click="dialogVisible = true" :disabled="$store.state.authUser.loginState === false">订阅</el-button></li>
        </ul>
      </el-col>
      <el-col :span="6">
        <div v-if="course.isbook" class="punchBlock">
          <p><span>上次打卡时间：</span>{{punchDate}}</p>
          <p><span>已打卡 </span>{{punchState.days}} <span>天</span></p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="timeline-container">
        <el-row class="timeline-card" v-for="(item, index) in sections" :key="index" v-if="index < course.courseDays">
          <el-col :span="4">
            <el-row class="line"></el-row>
            <el-row class="tag">第{{item.id}}节 <div class="circle"></div></el-row>
            <el-row  class="line"></el-row>
          </el-col>
          <el-col :span="19">
            <el-row :gutter="10">
              <el-col :span="8">
                <img v-if="item.coverImage" :src="item.coverImage" alt="">
                <div v-else class="padding-img"></div>
              </el-col>
              <el-col :span="11"><span class="title">{{item.name}}</span></el-col>
              <el-col :span="5">
                <el-button class="button--green" @click="dialogVisible2 = true" v-if="course.isbook&&punchState.days === item.id-1">
                  打卡
                </el-button>
                <el-button v-else-if="course.isbook&&punchState.days >= item.id" :disabled="true">已打卡</el-button>
                <el-button v-else :disabled="true">打卡</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-dialog
      style="text-align: left"
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <p>确认打卡？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="punchDayClock()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      style="text-align: left"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <p>确认订阅本课程？</p>
      <small>订阅后即开始课程学习。免费课程无需付费，付费课程需要支付费用，奖励式付费课程坚持打卡到指定天数即可退回费用。</small>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subscribeCourse()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {feeOptions, typeOptions} from '../util/constant/options'
  export default {
    name: "Detail",
    computed: {
      punchDate: function () {
        let time = new Date(Number(this.punchState.lastTime + '000'));
        return time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()+ ' ' + time.getHours() + ':' +time.getMinutes();
      }
    },
    watch: {
      course: function (val) {
        if(val.isbook===true) {
          this.getPunchClock();
        }
      }
    },
    data() {
      return{
        days: 1,
        punchState: {
          lastTime: 0,
          days: 0
        },
        course: {},
        id: 0,
        dialogVisible: false,
        dialogVisible2: false,
        sections: [{
          id: 1,
          name: '编写Solidity智能合约',
          coverImage: ''
        },
          {
            id: 2,
            name: '部署合约到私有节点',
            coverImage: ''
          },
          {
            id: 3,
            name: 'Truffle Vue 框架搭建',
            coverImage: ''
          },
          {
            id: 4,
            name: 'Truffle Vue + Ganache + MetaMask',
            coverImage: ''
          },
          {
            id: 5,
            name: '难点与坑',
            coverImage: ''
          },
        ]
      }
    },
    async mounted() {
      await this.getCourse();
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      subscribeCourse() {
        this.dialogVisible = false;
        this.$store.state.contractInstance().methods.bookCourse(this.id)
          .send({from: this.$store.state.web3.coinbase, gas: 300000, value: this.course.courseFee})
          .on('receipt',receipt => {
            console.log(receipt);
            this.$message.success('订阅成功')
            this.getCourse()
          })
          .on('error', error => {
            this.$message.error('订阅失败')
          })
      },
     async getCourse() {
        if(typeof this.$store.state.contractInstance !== "function") {
          await this.$store.dispatch('getContractInstance');
        }
        this.id = this.$route.query.id;
        this.$store.state.contractInstance().methods.getCourseById(this.id).call({from: this.$store.state.web3.coinbase})
          .then(result => {
            result.feeType = feeOptions[result.feeType];
            result.courseType = typeOptions[result.courseType];
            this.course = result;
            if(this.course.isbook) {
              this.getPunchClock();
            }
          })
          .catch(err => {
            console.log(err);
            console.log('no course.')
          })
      },
      punchDayClock() {
        this.dialogVisible2 = false;
        this.$store.state.contractInstance().methods.punchClock(this.id)
          .send({from:this.$store.state.web3.coinbase, gas: 300000})
          .on('receipt', receipt => {
            this.$message('已成功打卡' + res + '天');
            this.getPunchClock();
          })
          .on('error', error => {
            this.$message('打卡失败，每天只能打卡一次');
          })
      },
      getPunchClock() {
        this.$store.state.contractInstance().methods.getCourseRecordById(this.id).call({from: this.$store.state.web3.coinbase})
          .then(res => {
            this.punchState.lastTime = res.lastPunchTime;
            this.punchState.days = Number(res.punchDays);
          })
          .catch(err => {
            console.log('get punch state failed.');
          })
      }
    }
  }
</script>

<style scoped>
  .timeline-card .el-button {
    margin-top: 30px;
  }
  h1{
    font-size: 24px;
  }
  .detail {
    width: 95%;
    margin: auto auto;
  }
  .course-card {
    text-align: left;
    padding: 10px;
    height: 250px;
    background-color: #eeeeee;
  }
  img{
    width: 100%;
    height: 230px;
  }
  .line {
    border-right: solid 4px #55967e;
    height: 50px;
    overflow-y: auto;
  }
  .timeline-card {
    height: 120px;
    text-align: left;
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
  .padding-img {
    background-color: #e4e7ec;
    margin: 5px 10px 5px 10px;
    height: 110px;
  }
  .punchBlock {
    font-size: 18px;
    font-weight: bold;
  }
  .punchBlock > p > span {
    font-weight: normal;
  }
</style>
