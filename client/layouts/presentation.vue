<template>
  <div v-if="display">
    <div class="text-white flex space-x-3 justify-end m-5">
      <button @click="login=true" class="focus:outline-none px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-gray-600 hover:bg-gray-500 transform hover:font-bold">Login</button>
      <button @click="signup=true" class="focus:outline-none px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-900 hover:bg-red-700 transform hover:font-bold">Sign Up</button>
    </div>
    <Modal 
      v-model="login" 
      title="Login"
      wrapper-class="animate__animated"
      :in-class="`animate__fadeInDown`"
      :out-class="`animate__bounceOut`"
      bg-class="animate__animated"
      :bg-in-class="`animate__fadeInUp`"
      :bg-out-class="`animate__fadeOutDown`">
      <div class="flex flex-col justify-center">
        <t-input type="email" v-model="auth.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input type="password" v-model="auth.password" placeholder="Password" name="password" class="my-2"></t-input>
        <button @click="logIn()" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Login</button>
      </div>
    </Modal>
    <Modal 
      v-model="signup" 
      title="Signup"
      wrapper-class="animate__animated"
      :in-class="`animate__fadeInDown`"
      :out-class="`animate__bounceOut`"
      bg-class="animate__animated"
      :bg-in-class="`animate__fadeInUp`"
      :bg-out-class="`animate__fadeOutDown`">
      <div class="flex flex-col justify-center">
        <t-input id="username" type="text" v-model="sign.username" placeholder="Username" name="username" class="my-2"></t-input>
        <t-input id="email" type="email" v-model="sign.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input id="password" type="password" v-model="sign.password" placeholder="Password" name="password" class="my-2"></t-input>
        <t-input id="confirm_password" type="password" v-model="sign.passwordCheck" placeholder="Confirm Password" name="confirm_password" class="my-2"></t-input>
        <button @click="signUp()" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Sign Up</button>
      </div>
    </Modal>
    <Nuxt class="animate__bounceIn" />
  </div>
</template>

<script>
  import 'firebase/auth'
  import { mapActions } from 'vuex'

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
        display: false,
      }
    },

    beforeCreate(){
      let that = this
      this.$fire.auth.onAuthStateChanged(function (user) {
        if (user != null) {
          if(that.$route.path === '/') {
            that.$router.push(`/${user.uid}/calendar`)
          }
        } else {
          if(that.$route.path !== '/') {
            that.$router.push('/')
          }
        }
      })
    },

    mounted() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.displayPresentation(), 3300)
      })
    },

    methods: {
      ...mapActions([ // spread operator so that other methods can still be added.
        'updateToken',
        'updateUserId',
      ]),

      displayPresentation(){
        this.display = true
        this.$nuxt.$loading.finish()
      },

      async logIn(){
        let that = this
        await this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(error => { 
          console.error('Oops...connection error', error) 
          this.$toast.global.my_error() //Using custom toast
          this.$toast.error('Error while authenticating')
          this.$toast.error('Email/Password incorrect')
        })
        .then((res)=>{
          const token = that.$fire.auth.currentUser.getIdToken();
          //that.updateToken(token)
          //console.log(that.$store.state.tokenUser)
          that.$router.push({ path: `/${res.user.uid}/calendar`})
          //that.updateUserId(res.user.uid)
          //console.log(that.$store.state.userUID)
        })
      },

      forgotPassword(){
        
      },

      async signUp(){
        await this.$axios.post('http://comeback-api.herokuapp.com/users/auth/signup', this.sign)
        this.signup = false
        this.$toast.success('You can login with your account')
      }
    },
  }
</script>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
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