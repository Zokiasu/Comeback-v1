<template>
  <div v-if="start" class="flex relative overscroll-hidden overflow-y-visible min-h-screen" :class="width ? 'flex-row':'flex-col'">
    <div class="fixed max-w-xs min-h-screen min-w-min">
      <SideBar v-if="width" class="max-w-xs min-h-screen max-h-screen overflow-hidden overflow-y-visible"/>
    </div>
    <span v-if="width" class="max-w-xs min-w-min max-h-screen w-full"></span>
    <TopBar v-if="!width"/>
    <div class="w-full flex flex-col overflow-hidden 2xl:overflow-visible">
      <ModeratorMenu class="p-5" v-if="(this.$route.path).includes('moderator')"/>
      <Nuxt class="w-full"/>
    </div>
  </div>
</template>

<script>
    export default {

      data(){
        return {
          width:false,
          start:false,
        }
      },

      beforeCreate(){
        console.log("Default-beforeCreate")
        let that = this
        this.$fire.auth.onAuthStateChanged(async function (user) {
          if (user != null) {
            const token = that.$fire.auth.currentUser.getIdToken();
            const {data: response} = await that.$axios.get(`https://comeback-api.herokuapp.com/users/${user.uid}`)
            that.$store.commit('SET_DATA_USER', response)
            that.$store.commit('SET_TOKEN_USER', token.i)
            if(response) {
              that.start = true
            }
            console.log(that.$store.state.dataUser)
          }
        })
      },

      created(){
        console.log("Default-Created")
        let that = this
        this.$fire.auth.onAuthStateChanged(async function (user) {
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
        console.log("Default-Mounted")
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      },

      methods: {

        handleResize() {
          if(window.innerWidth > 768) {
            this.width = true
          } else {
            this.width = false
          }
        },
      },
    }
</script>

<style>
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

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track-piece {
  opacity: 50%;
}

::-webkit-scrollbar-thumb {
  background-color: #E1E1E1; /* color of the scroll thumb */
  border-radius: 50px; /* roundness of the scroll thumb */
}

/* Page Transitions - 0.4s Slide/Fade */
.page-enter-active,
.page-leave-active {
  transition-duration: 0.4s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.page-enter {
  opacity: 0;
  transform: translate(2em, 0);
}

.page-leave-active {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
