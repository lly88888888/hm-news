<template>
  <div class="compile">
    <div class="header">
      <Hmheader name="编辑资料" @click="back"></Hmheader>
    </div>
    <div class="avatar">
      <img :src="avatar" alt="" v-show="loading">
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="name" @click="updateName">
      <Hmnav name="昵称" :describe="profile.nickname"></Hmnav>
    </div>
    <div class="password" @click="updatePwd">
      <Hmnav name="密码" describe="*******"></Hmnav>
    </div>
    <div class="sex" @click="updateGender">
      <Hmnav name="性别" :describe="sex"></Hmnav>
    </div>
    <!-- 修改昵称弹出框 -->
    <van-dialog v-model="isNameShow" title="修改昵称" show-cancel-button @confirm="editName">
      <van-cell-group>
        <van-field v-model="nickName" placeholder="请输入新昵称" />
      </van-cell-group>
    </van-dialog>
    <!-- 修改密码弹出框 -->
    <van-dialog v-model="isPwdShow" title="修改密码" show-cancel-button @confirm="editPwd">
      <van-cell-group>
        <van-field v-model="password" placeholder="请输入新密码" />
      </van-cell-group>
    </van-dialog>
    <!-- 修改性别弹出框 -->
    <van-dialog v-model="isGenderShow" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import Hmheader from '../components/Hmheader'
import Hmnav from '../components/Hmnav'
import img from '../assets/1564924597807792.jpg'
export default {
  data () {
    return {
      loading: false,
      profile: {},
      isNameShow: false,
      nickName: '',
      isPwdShow: false,
      password: '',
      isGenderShow: false,
      gender: 0
    }
  },
  components: {
    Hmheader,
    Hmnav
  },
  created () {
    this.getCompile()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    updateName () {
      this.nickName = this.profile.nickname
      this.isNameShow = true
    },
    updatePwd () {
      this.password = this.profile.password
      this.isPwdShow = true
    },
    updateGender () {
      this.gender = this.profile.gender
      this.isGenderShow = true
    },
    editName () {
      this.sendAxios({ nickname: this.nickName })
    },
    editPwd () {
      this.sendAxios({ password: this.password })
    },
    editGender () {
      this.sendAxios({ gender: this.gender })
    },
    // 文件上传
    async afterRead (file) {
      console.log(file.file)
      const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd)
      if (res.data.statusCode === 200) {
        this.sendAxios({ head_img: res.data.data.url })
      }
    },
    async getCompile () {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${id}`)
      this.profile = res.data.data
      this.loading = true
    },
    async sendAxios (data) {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.$toast.success('修改成功')
        this.getCompile()
      }
    }
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    },
    sex () {
      return this.profile.gender === 1 ? '男' : '女'
    }
  }
}
</script>

<style lang="scss" scoped>
.compile{
  .avatar{
     width: 70px;
     height: 70px;
     margin: 0 auto;
     margin-bottom: 15px;
     position: relative;
     img{
       width: 100%;
       border-radius: 50%;
     }
     .van-uploader{
       position: absolute;
       top: 0;
       opacity: 0;
     }
   }
   .van-dialog{
     padding:0 10px;
     .van-cell-group{
       margin-top: 10px;
     }
   }
}
</style>
