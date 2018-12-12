<template>
  <div class="form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  v-if="$store.state.authUser.loginState">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="付费类型" prop="feeType" required>
        <el-radio
          v-model.number="ruleForm.feeType"
          v-for="item in feetypes"
          :key="item.value"
          :label="item.value">
          {{item.label}}
         </el-radio>
      </el-form-item>
      <el-form-item  label="课程类型" prop="courseType" required>
        <el-select v-model.number="ruleForm.courseType"  placeholder="请选择课程类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程描述" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="课程天数" prop="courseDays">
        <el-input v-model.number="ruleForm.courseDays"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.feeType !== 0" label="课程费用" prop="courseFee" required>
        <el-input v-model.number="ruleForm.courseFee" placeholder="inWei"></el-input>
      </el-form-item>
      <UploadAvatarPicture ref="uploader" :label="label"></UploadAvatarPicture>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-else>
      你还未登陆！无法创建课程，请先在我们的社区创建账号！<router-link to="/Register">注册页面</router-link>
    </div>
  </div>
</template>

<script>
  import UploadAvatarPicture from '../components/UploadAvatarPicture'
  export default {
    components: {
      'UploadAvatarPicture': UploadAvatarPicture
    },
    data() {
      return {
        'label':'封面图片',
        feetypes: [{
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
        options: [{
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
        ruleForm: {
          name: '',
          description: '',
          courseDays: 1,
          courseFee: 0,
          courseType:0,
          feeType: 0,
        },
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入课程描述', trigger: 'blur' }
          ],
          courseDays: [
            { required: true, message: '请输入课程天数', trigger: 'blur' },
            { type: 'number', message: '课程天数必须为数字值'}
          ],
          courseFee: [
            { required: true, message: '请输入课程费用', trigger: 'blur' },
            { type: 'number', message: '课程费用必须为数字值'}
          ],
          feeType: [
            { required: true, message: '请选择课程付费类型', trigger: 'change' }
          ],
          courseType: [
            { required: true, message: '请选择课程类型', trigger: 'change' }
          ],
        }
      };
    },
    watch: {
      ruleForm: function (val) {
        console.log(val)
      },
      imageUrl: function (val) {
        console.log(val)
      }
    },
    methods: {
      handle(){
        console.log(this.ruleForm.feeType)
      },
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.uploader.submitUpload().then(res=>{
              let author = this.$store.state.authUser.account.name;
              this.$store.state.contractInstance().methods.createCourse(author, this.ruleForm.name, this.ruleForm.description, this.ruleForm.courseDays, this.ruleForm.courseFee,res,this.ruleForm.courseType, this.ruleForm.feeType)
                .send({
                  from: this.$store.state.web3.coinbase,
                  gas: 400000
                })
                .on('receipt', (receipt) => {
                  this.$message.success('创建课程成功')
                })
                .on('error', (error) => {
                  this.$message.error('创建课程失败')
                })
            }).catch(err =>{
              this.$message.error('创建课程失败')
            });
          } else {
            console.log('error submit!!');
            return false;
          }
          // this.resetForm(formName);
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  .form-container {
    width: 80%;
    box-shadow: 1px 1px 5px silver;
    border-radius: 5px;
    padding: 10px;
    margin: auto auto;
    text-align: left;
  }
</style>
