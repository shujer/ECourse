<template>
  <el-form-item :label="label" required>
    <el-upload
      v-loading="loading"
      class="avatar-uploader"
      ref="uploader"
      :action="domain"
      :show-file-list="true"
      list-type="picture-card"
      :on-change="handleAvatarSuccess"
      :on-remove="handleRemove"
      :auto-upload="false"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload">
      <i class="el-icon-plus" slot="trigger"></i>
    </el-upload>
  </el-form-item>

</template>

<script>
  import axios from 'axios'
  export default {
    props:['label'],
    data() {
      return {
        imageFile: null,
        imgUrl: '',
        bucket: 'sysu-geokg',
        domain: 'https://upload-z2.qiniup.com/',
        qiniuaddr: 'pkcgzrfnc.bkt.clouddn.com',
        loading: false,
        fileList: []
      }
    },
    methods: {
      async submitUpload() {
        if(!this.imageFile) {
          this.$message.error('图片不能为空');
          return false;
        }
        this.loading = true;
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        };
        let fileType = '';
        if (this.imageFile.type === 'image/png') {
          fileType = 'png';
        } else {
          fileType = 'jpg';
        }
        // 重命名要上传的文件
        const keyName = this.bucket + new Date() + Math.floor(Math.random() * 100) + '.' + fileType;
        try {
          // 从后端获取上传凭证token
          let uptoken = await this.$store.dispatch('getUploadToken');
          const formdata = new FormData();
          formdata.append('file', this.imageFile.raw);
          formdata.append('token', uptoken);
          formdata.append('key', keyName);
          return new Promise((resolve, reject) => {
            axios.post('/upQiniu', formdata, config).then(res => {
              this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key;
              this.loading = false;
              this.fileList = [];
              this.imageFile = null;
              resolve(this.imageUrl);
            });
          });
        } catch (e) {
          console.log('post failed!' + e.message);
        }
      },
      handleAvatarSuccess(res, files) {
        this.fileList = [];
        let file = files[files.length - 1];
        let name = file.name;
        if(this.beforeAvatarUpload(file.raw)) {
          let imageUrl = window.URL.createObjectURL(file.raw);
          this.imageFile = file;
          this.fileList.push({name: name, url: imageUrl});
        }
      },
      handleRemove(file, fileList) {
        this.fileList = [];
        this.imageFile = null;
        this.loading = false;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.imageFile = null;
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.imageFile = null;
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

