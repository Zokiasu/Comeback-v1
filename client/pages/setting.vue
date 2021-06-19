<template>
  <div class="p-10">
      <div class="text-white text-lg space-y-7 p-5 bg-gray-500 bg-opacity-20 relative">
        <Modal v-model="disableAccount" title="Disable Account" wrapper-class="modal-wrapper">
          <div class="flex flex-col justify-center space-y-3">
            <span>Are you sure you want to disable your account?</span>
            <div class="flex text-white space-x-5 justify-start">
              <button @click="disableUser()" class="px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-green-500 hover:bg-green-700 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10">Yes, disable</button>
              <button @click="disableAccount=false" class="px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10">No, cancel</button>
            </div>
          </div>
        </Modal>
        <div id="image" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5">
          <span class="font-semibold">Profile Picture</span>
          <img class="w-40 h-40 rounded-full object-cover" :src="userData.avatar ? userData.avatar : require(`~/assets/image/profile.png`)">
          <div>
              <button 
                  class="px-3 py-1 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-900 hover:bg-red-700 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10"
                  @click="launchImageFile"
                  :disabled="isUploadingImage"
                  type="button">
                  {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
              </button>
              <input
                  ref="imageFile"
                  @change.prevent="uploadImageFile($event.target.files)"
                  type="file"
                  accept="image/png, image/jpeg"
                  class="hidden">
          </div>
        </div>
        <div id="user_id" class="flex flex-col">
          <span class="font-semibold">User ID</span>
          <span>{{userData.id}}</span>
        </div>
        <div id="display_name" class="flex flex-col">
          <span class="font-semibold">Display Name</span>
          <t-input @change="newObjectToApi('username', userData.username)" autocomplete="false" type="text" v-model="userData.username" :value="userData.username"/>
        </div>
        <div id="email" class="flex flex-col">
          <span class="font-semibold">Email</span>
          <t-input @change="newObjectToApi('email', userData.email)" autocomplete="false" type="text" v-model="userData.email" :value="userData.email"/>
        </div>
        <div id="birthday" class="flex flex-col">
          <span class="font-semibold">Date of Birth</span>
          <t-datepicker
            class="text-black"
            v-model="userData.birthday"
            @change="newObjectToApi('birthday', userData.birthday)"
            placeholder="Release Date"
            initial-view="month" dateFormat='Y-m-d' clearable>
          </t-datepicker>
        </div>
        <div id="country" class="flex flex-col">
          <span class="font-semibold">Country</span>
          <t-input @change="newObjectToApi('country', userData.country)" autocomplete="false" type="text" v-model="userData.country" :value="userData.country"/>
        </div>
        <div id="disabled_account" class="flex flex-row">
          <span class="font-semibold">Desactive your account ?</span>
          <div class="mx-2">
            <button @click="disableAccount=true" class="rounded-sm flex justify-center transition duration-500 ease-in-out transform hover:font-bold text-red-900 hover:text-red-500">Yes, desactive my account</button>
          </div>
        </div>
        <div id="confirm_changes" class="w-full flex justify-end">
          <button @click="editUser()" class="px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold focus:outline-none">Save Changes</button>
        </div>
      </div>
  </div>
</template>

<script>
  export default {

    head() {
      return {
        title: 'Comeback - Setting',
      }
    },

    data(){
      return {
        userData:{},
        editToApi:{},
        isUploadingImage: false,
        disableAccount: false,
      }
    },

    created(){
      const that = this
      this.$fire.auth.onAuthStateChanged(function (user) {
        if (user != null) {
          that.$axios.get(`https://comeback-api.herokuapp.com/users/${user.uid}`).then(res => {
            that.userData = res.data
          })
        }
      })
    },

    methods: {
      newObjectToApi(key, value){
        this.editToApi[key] = value
      },

      async editUser() {
        let that = this;
        await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.userData.id}`, this.editToApi)
        .then(response=>{
          that.$store.commit('SET_DATA_USER', response.data)
          that.$toast.success('Your account has been edited', {duration:3000, position:'top-center', fullWidth:true})
        })
        .catch((error) => {
          console.log(error)
        })
      },

      async disableUser(){
        this.userData.username = null
        this.userData.email = null
        await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.userData.id}`, this.user)
        .then(response=>{
          this.$fire.auth.currentUser.delete().then(
            this.$toast.success('Your account has been deleted', {duration:3000, position:'top', fullWidth:true})
          )
        })
        .catch((error) => {
          console.log(error)
        })
        
        this.$fire.auth.signOut().then(() => {
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
        })
      },

      launchImageFile () {
        this.$refs.imageFile.click()
      },

      uploadImageFile (files) {
        if (!files.length) {
          return
        }
        let file = files[0]

        if (!file.type.match('image.*')) {
          alert('Please upload an image.')
          return
        }

        let metadata = {
          contentType: file.type
        }

        this.isUploadingImage = true

        let imageRef = this.$fire.storage.ref(`images/user-${this.userData.id}`)

        let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            return url
          })
        }).catch((error) => {
          console.error(error)
        })
        uploadTask.then((url) => {
          this.newObjectToApi("avatar", url)
          this.userData.avatar = url
          this.isUploadingImage = false
        })
      },
    },
  }
</script>

<style>
  .modal-wrapper {
    display: flex;
    align-items: center;
  }
  .modal-wrapper .vm {
    top: auto;
  }
</style>