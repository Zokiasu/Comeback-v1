<template>
  <div id="bod" class="grid grid-cols-7">
    <SideBar v-if="width" class="leftbar col-start-1 col-end-3 xl:col-end-2 relative min-h-screen max-h-screen overflow-hidden overflow-y-visible"/>
    <div id="test2" class="leftbar xl:col-start-2 col-end-8 overflow-hidden overflow-y-visible relative max-h-screen"  :class="width == true ? 'col-start-3' : 'col-start-1'">
      <Nuxt id="exist" :width="width"/>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          width:false,
          actualHeight:0,
        }
      },

      beforeCreate(){
        let that = this
        this.$fire.auth.onAuthStateChanged(function (user) {
          console.log(user)
          if (user != null) {
            console.log("user")
            that.$router.push({ path: `/${user.uid}/calendar`})
            that.$store.commit('addUserID', user.uid)
            //console.log(that.$store.state.userUID)
          } else {
            console.log("not user")
            this.$router.push('/')
          }
        })
      },

      mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        document.getElementById("test2").addEventListener('scroll', this.scroll, {passive: true});
        this.scroll();
        this.actualHeight = window.innerHeight
      },

      methods: {
        scroll(){
          var b = document.getElementById("test2").scrollTop
          if((b === this.actualHeight || b > this.actualHeight) && this.actualHeight != 0) {
            this.actualHeight = this.actualHeight + window.innerHeight/**Math.round(document.getElementById("test2").scrollTop/window.innerHeight)*/
          }

        },

        handleResize() {
          if(window.innerWidth > 768) {
            this.width = true
          } else {
            this.width = false
          }
        },
      }
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
</style>
