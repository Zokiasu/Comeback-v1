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
          if(res){
            const token = that.$fire.auth.currentUser.getIdToken();
            const {data: response} = await that.$axios.get(`https://comeback-api.herokuapp.com/users/${res.user.uid}`)
            that.$store.commit('SET_DATA_USER', response)
            that.$store.commit('SET_TOKEN_USER', token.i)
            that.login = false
            that.$router.push({ path: `/calendar`})
            that.$toast.success('You are login', {duration:3000, position:'top-right'})
          }
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
  html {
    font-family:
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background-color: #1F1D1D;
  }
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

<style>
  fieldset[disabled] .multiselect {
    pointer-events: none;
  }
  .multiselect__spinner {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 48px;
    height: 35px;
    background: #fff;
    display: block;
  }
  .multiselect__spinner:before,
  .multiselect__spinner:after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    margin: -8px 0 0 -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border-color: #b91c1c transparent transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px transparent;
  }
  .multiselect__spinner:before {
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
    animation-iteration-count: infinite;
  }
  .multiselect__spinner:after {
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite;
  }
  .multiselect__loading-enter-active,
  .multiselect__loading-leave-active {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
  }
  .multiselect__loading-enter,
  .multiselect__loading-leave-active {
    opacity: 0;
  }
  .multiselect,
  .multiselect__input,
  .multiselect__single {
    font-family: inherit;
    font-size: 16px;
    touch-action: manipulation;
  }
  .multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
    min-height: 40px;
    text-align: left;
    color: #35495e;
  }
  .multiselect * {
    box-sizing: border-box;
  }
  .multiselect:focus {
    outline: none;
  }
  .multiselect--disabled {
    background: #ededed;
    pointer-events: none;
    opacity: 0.6;
  }
  .multiselect--active {
    z-index: 50;
  }
  .multiselect--active:not(.multiselect--above) .multiselect__current,
  .multiselect--active:not(.multiselect--above) .multiselect__input,
  .multiselect--active:not(.multiselect--above) .multiselect__tags {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .multiselect--active .multiselect__select {
    transform: rotateZ(180deg);
  }
  .multiselect--above.multiselect--active .multiselect__current,
  .multiselect--above.multiselect--active .multiselect__input,
  .multiselect--above.multiselect--active .multiselect__tags {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .multiselect__input,
  .multiselect__single {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    padding: 0 0 0 5px;
    width: calc(100%);
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
  }
  .multiselect__input::placeholder {
    color: #35495e;
  }
  .multiselect__tag ~ .multiselect__input,
  .multiselect__tag ~ .multiselect__single {
    width: auto;
  }
  .multiselect__input:hover,
  .multiselect__single:hover {
    border-color: #cfcfcf;
  }
  .multiselect__input:focus,
  .multiselect__single:focus {
    border-color: #a8a8a8;
    outline: none;
  }
  .multiselect__single {
    padding-left: 5px;
    margin-bottom: 8px;
  }
  .multiselect__tags-wrap {
    display: inline;
  }
  .multiselect__tags {
    min-height: 40px;
    display: block;
    padding: 8px 40px 0 8px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 14px;
  }
  .multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #b91c1c;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
  }
  .multiselect__tag-icon {
    cursor: pointer;
    margin-left: 7px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-weight: 700;
    font-style: initial;
    width: 22px;
    text-align: center;
    line-height: 22px;
    transition: all 0.2s ease;
    border-radius: 5px;
  }
  .multiselect__tag-icon:after {
    content: "×";
    color: #ffffff;
    font-size: 14px;
  }
  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
    background: #b91c1c;
  }
  .multiselect__tag-icon:focus:after,
  .multiselect__tag-icon:hover:after {
    color: white;
  }
  .multiselect__current {
    line-height: 16px;
    min-height: 40px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    padding: 8px 12px 0;
    padding-right: 30px;
    white-space: nowrap;
    margin: 0;
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    cursor: pointer;
  }
  .multiselect__select {
    line-height: 16px;
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 40px;
    height: 38px;
    right: 1px;
    top: 1px;
    padding: 4px 8px;
    margin: 0;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .multiselect__select:before {
    position: relative;
    right: 0;
    top: 65%;
    color: #999;
    margin-top: 4px;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #999999 transparent transparent transparent;
    content: "";
  }
  .multiselect__placeholder {
    color: #adadad;
    display: inline-block;
    margin-bottom: 10px;
    padding-top: 2px;
  }
  .multiselect--active .multiselect__placeholder {
    display: none;
  }
  .multiselect__content-wrapper {
    position: absolute;
    display: block;
    background: #fff;
    width: 100%;
    max-height: 240px;
    overflow: auto;
    border: 1px solid #e8e8e8;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 50;
    -webkit-overflow-scrolling: touch;
  }
  .multiselect__content {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
    min-width: 100%;
    vertical-align: top;
  }
  .multiselect--above .multiselect__content-wrapper {
    bottom: 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: none;
    border-top: 1px solid #e8e8e8;
  }
  .multiselect__content::webkit-scrollbar {
    display: none;
  }
  .multiselect__element {
    display: block;
  }
  .multiselect__option {
    display: block;
    padding: 12px;
    min-height: 40px;
    line-height: 16px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  }
  .multiselect__option:after {
    top: 0;
    right: 0;
    position: absolute;
    line-height: 40px;
    padding-right: 12px;
    padding-left: 20px;
    font-size: 13px;
  }
  .multiselect__option--highlight {
    background: #b91c1c;
    outline: none;
    color: white;
  }
  .multiselect__option--highlight:after {
    content: attr(data-select);
    background: #b91c1c;
    color: white;
  }
  .multiselect__option--selected {
    background: #f3f3f3;
    color: #35495e;
    font-weight: bold;
  }
  .multiselect__option--selected:after {
    content: attr(data-selected);
    color: silver;
  }
  .multiselect__option--selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: #fff;
  }
  .multiselect__option--selected.multiselect__option--highlight:after {
    background: #ff6a6a;
    content: attr(data-deselect);
    color: #fff;
  }
  .multiselect--disabled .multiselect__current,
  .multiselect--disabled .multiselect__select {
    background: #ededed;
    color: #a6a6a6;
  }
  .multiselect__option--disabled {
    background: #ededed !important;
    color: #a6a6a6 !important;
    cursor: text;
    pointer-events: none;
  }
  .multiselect__option--group {
    background: #ededed;
    color: #35495e;
  }
  .multiselect__option--group.multiselect__option--highlight {
    background: #35495e;
    color: #fff;
  }
  .multiselect__option--group.multiselect__option--highlight:after {
    background: #35495e;
  }
  .multiselect__option--disabled.multiselect__option--highlight {
    background: #dedede;
  }
  .multiselect__option--group-selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: #fff;
  }
  .multiselect__option--group-selected.multiselect__option--highlight:after {
    background: #ff6a6a;
    content: attr(data-deselect);
    color: #fff;
  }
  .multiselect-enter-active,
  .multiselect-leave-active {
    transition: all 0.15s ease;
  }
  .multiselect-enter,
  .multiselect-leave-active {
    opacity: 0;
  }
  .multiselect__strong {
    margin-bottom: 8px;
    line-height: 20px;
    display: inline-block;
    vertical-align: top;
  }
  *[dir="rtl"] .multiselect {
    text-align: right;
  }
  *[dir="rtl"] .multiselect__select {
    right: auto;
    left: 1px;
  }
  *[dir="rtl"] .multiselect__tags {
    padding: 8px 8px 0px 40px;
  }
  *[dir="rtl"] .multiselect__content {
    text-align: right;
  }
  *[dir="rtl"] .multiselect__option:after {
    right: auto;
    left: 0;
  }
  *[dir="rtl"] .multiselect__clear {
    right: auto;
    left: 12px;
  }
  *[dir="rtl"] .multiselect__spinner {
    right: auto;
    left: 1px;
  }
  @keyframes spinning {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(2turn);
    }
  }
</style>