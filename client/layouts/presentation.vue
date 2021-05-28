<template>
  <div>
    <div class="text-white flex space-x-5 justify-end m-5">
      <button @click="login=true" class="focus:outline-none hover:text-red-700">Login</button>
      <button @click="signup=true" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold">Sign Up</button>
    </div>
    <Modal v-model="login" title="Login">
      <div class="flex flex-col justify-center">
        <t-input type="email" v-model="auth.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input type="password" v-model="auth.password" placeholder="Password" name="password" class="my-2"></t-input>
        <button @click="logIn()" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Login</button>
      </div>
    </Modal>
    <Modal v-model="signup" title="Signup">
      <div class="flex flex-col justify-center">
        <t-input id="email" type="email" v-model="sign.email" placeholder="Email" name="email" class="my-2"></t-input>
        <t-input id="password" type="password" v-model="sign.password" placeholder="Password" name="password" class="my-2"></t-input>
        <t-input id="username" type="text" v-model="sign.username" placeholder="Username" name="username" class="my-2"></t-input>
        <t-input id="confirm_password" type="password" v-model="sign.passwordCheck" placeholder="Confirm Password" name="confirm_password" class="my-2"></t-input>
        <button @click="signUp()" class="focus:outline-none texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 text-white hover:bg-red-900 transform hover:-translate-y-0.5 hover:scale-110 hover:font-bold my-2">Sign Up</button>
      </div>
    </Modal>
    <Nuxt />
  </div>
</template>

<script>
  import 'firebase/auth'
  
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
          console.log("user")
          that.$router.push({ path: `/${user.uid}/calendar`})
          that.$store.commit('addUserID', user.uid)
        } else {
          console.log("not user")
          that.$router.push({ path: `/`})
        }
      });
    },

    methods: {
      async logIn(){
        let that = this
        await this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password).then((res)=>{
          const token = that.$fire.auth.currentUser.getIdToken();
          that.$store.commit('addToken', token)
          that.$router.push({ path: `/${res.user.uid}/calendar`})
          that.$store.commit('addUserID', res.user.uid)
        })
      },

      forgotPassword(){
        
      },

      async signUp(){
        await this.$axios.post('http://comeback-api.herokuapp.com/users/auth/signup', this.sign)
      }
    },
  }
</script>