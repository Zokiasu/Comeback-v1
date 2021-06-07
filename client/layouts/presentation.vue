<template>
  <div>
    <div class="text-white flex space-x-3 justify-end m-5">
      <button @click="login=true" class="focus:outline-none px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-gray-600 hover:bg-gray-500 transform hover:font-bold">Login</button>
      <button @click="signup=true" class="focus:outline-none px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-900 hover:bg-red-700 transform hover:font-bold">Sign Up</button>
    </div>
    <Modal 
      v-model="login" 
      title="Login"
      wrapper-class="animate__animated modal-wrapper"
      :in-class="`animate__fadeInDown`"
      :out-class="`animate__bounceOut`"
      bg-class="animate__animated"
      :bg-in-class="`animate__fadeInUp`"
      :bg-out-class="`animate__fadeOutDown`">
      <div class="flex flex-col justify-center">
        <t-input type="email" v-model="auth.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input type="password" v-model="auth.password" placeholder="Password" name="password" class="my-2"></t-input>
        <button @click="logIn(auth)" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Login</button>
      </div>
    </Modal>
    <Modal 
      v-model="signup" 
      title="Signup"
      wrapper-class="animate__animated modal-wrapper"
      :in-class="`animate__fadeInDown`"
      :out-class="`animate__bounceOut`"
      bg-class="animate__animated"
      :bg-in-class="`animate__fadeInUp`"
      :bg-out-class="`animate__fadeOutDown`">
      <div class="flex flex-col justify-center">
        <t-input id="username" type="text" v-model="sign.username" placeholder="Username" name="username" class="my-2"></t-input>
        <t-input id="email" type="email" v-model="sign.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input id="password" type="password" v-model="sign.password" placeholder="Password" name="password" class="my-2"></t-input>
        <t-input id="confirm_password" type="password" v-model="passwordCheck" placeholder="Confirm Password" name="confirm_password" class="my-2"></t-input>
        <button @click="signUpUser()" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Sign Up</button>
      </div>
    </Modal>
    <Nuxt class="animate__bounceIn" />
  </div>
</template>

<script>
  import 'firebase/auth'
  import { mapActions } from 'vuex'
  import { duration } from 'moment-timezone'

  export default {
    data(){
      return{
        login: false,
        signup: false,
        
        auth: {
          email: '',
          password: '',
        },

        sign: {
          username: '',
          email: '',
          password: '',
        },

        passwordCheck: null,
        data: null,
      }
    },

    beforeCreate(){
      let that = this
      this.$fire.auth.onAuthStateChanged(function (user) {
        if (user != null) {
          if(that.$route.path === '/') {
            that.$router.push(`/calendar`)
          }
        } else {
          if(that.$route.path !== '/') {
            that.$router.push('/')
          }
        }
      })
    },

    methods: {
      async logIn(user){
        let that = this
        await this.$fire.auth.signInWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          console.error('Oops...connection error', error) 
          that.$toast.error('Error while authenticating', {duration:3000, position:'top-right'})
          that.$toast.error('Email/Password incorrect', {duration:3000, position:'top-right'})
        })
        .then(async (res)=>{
          const token = that.$fire.auth.currentUser.getIdToken();
          const {data: response} = await that.$axios.get(`https://comeback-api.herokuapp.com/users/${res.user.uid}`)
          that.$store.commit('SET_DATA_USER', response)
          that.$store.commit('SET_TOKEN_USER', token.i)
          /*let x = this.$store.state.dataUser
          let y = this.$store.state.tokenUser
          console.log(x)
          console.log(y)*/
          that.login = false
          that.$router.push({ path: `/calendar`})
          that.$toast.success('You are login', {duration:3000, position:'top-right'})
        })
      },

      forgotPassword(){
        
      },

      async signUpUser(){
        if(this.sign.password === this.passwordCheck){
          await this.$axios.post('https://comeback-api.herokuapp.com/users/auth/signup', this.sign)
          .catch((error) => {
            this.$toast.error('Oops...Something went wrong', {duration:3000, position:'top-right'})
            console.error('Oops...connection error', error) 
            console.log(error.response)
            this.$toast.error(error.response.data.message, {duration:3000, position:'top-right'})
          })
          .then((res) => {
            if(res){
              this.signup = false
              this.logIn(this.sign)
            }
          })
        } else {
          this.$toast.error('Your passwords is not the same', {duration:3000, position:'top-right'})
        }
      }
    },
  }
</script>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
  .modal-wrapper {
    display: flex;
    align-items: center;
  }
  .modal-wrapper .vm {
    top: auto;
  }
  .fullscreen-modal {
    width: 100%;
    max-width: 100%;
    top: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .fullscreen-modal .vm-titlebar {
    flex-shrink: 0;
  }
  .fullscreen-modal .vm-content {
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; 
  }
  .fullscreen-modal .vm-content .scrollable-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 15px 10px 15px;
    flex-grow: 1;
  }
  .fullscreen-modal .fullscreen-modal-footer {
    border-top: 1px solid #e5e5e5;
    padding: 15px;
  }
</style>