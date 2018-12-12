<template>
  <div class="hello">
    <div class="course-sort">
      <el-checkbox-group v-model="typeChose">
        <el-checkbox
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.value">
          {{item.label}}
        </el-checkbox>
      </el-checkbox-group>
      <br>
      <el-checkbox-group v-model="feeChose">
        <el-checkbox
          v-for="item in feeOptions"
          :key="item.value"
          :label="item.value">
          {{item.label}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="course-list">
      <el-row>
        <el-col :span="6" v-for="(item, index) in courseList" :key="index" v-show="typeChose.indexOf(Number(item.courseType))>=0&&feeChose.indexOf(Number(item.feeType))>=0">
          <el-card class="course-card">
            <img :src="item.coverImage" class="image">
            <div style="padding-top: 10px;">
              <h2>{{item.name}}</h2>
              <div class="bottom clearfix">
                <time class="time">作者：{{item.author}}</time>
                <el-button type="text" class="link"><router-link :to="{path:'/Detail',query:{id: item.id}}">READ MORE</router-link></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import state from "../store/state";
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello to ECourse!',
      currentDate: new Date(),
      courseList: [],
      typeChose: [0,1,2,3,4,5,6,7],
      feeChose: [0,1,2],
      feeOptions: [{
        value: 0,
        label: '免费'
      },{
        value: 1,
        label: '付费'
      },{
        value: 2,
        label:'奖励式付费'
      }
      ],
      typeOptions: [{
        value: 0,
        label: '区块链'
      }, {
        value: 1,
        label: '计算机科学'
      }, {
        value: 2,
        label: '数据库'
      }, {
        value: 3,
        label: '前端开发'
      }, {
        value: 4,
        label: '后端开发'
      },
        {
          value: 5,
          label: '编程语言'
        },
        {
          value: 6,
          label: '技术经验'
        },
        {
          value: 7,
          label: '其他'
        }],
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
      let num = await this.$store.state.contractInstance().methods.getCourseLength().call({from: this.$store.state.web3.coinbase});
      console.log('course nums: ' + num);
      for(let i = 0; i < num; i++) {
        this.$store.state.contractInstance().methods.getCourseById(i).call({from: this.$store.state.web3.coinbase})
          .then(result => {
            result.id = i;
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
.course-sort {
  padding: 10px;
  background-color: #e4e7ec;
}
.el-checkbox,
.el-checkbox.is-checked > .el-checkbox__label{
  color: #55967e;
  border: #55967e;
}
.el-checkbox__input.is-checked > .el-checkbox__inner{
  color: #55967e;
  border: #55967e;
  background-color: #55967e;
}
.course-list {
  margin-top: 10px;
}
.course-card {
  background-color: #eeeeee;
  color: #55967e;
  margin: 5px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.link {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 230px;
  display: block;
}
</style>
