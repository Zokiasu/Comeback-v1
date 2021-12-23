<template>
  <div class="flex flex-col justify-center space-y-2 py-3 text-white">
    <multiselect
        v-if="!newArtist"
        v-model="artistSelected"
        placeholder="Please select an artist"
        label="name" 
        track-by="id" 
        :options="artistList"
        :close-on-select="true"
        :clear-on-select="true"
        :preserve-search="false">
        <template slot="singleLabel" slot-scope="props">
            <div class="flex space-x-1">
                <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image" :alt="props.option.name">
                <div class="option__desc flex flex-col space-y-1">
                    <span class="option__title">{{ props.option.name }}</span>
                    <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                </div>
            </div>
        </template>
        <template slot="option" slot-scope="props">
            <div class="flex space-x-1">
                <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                <div class="option__desc flex flex-col space-y-1">
                    <span class="option__title">{{ props.option.name }}</span>
                    <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                </div>
            </div>
        </template>
    </multiselect>
    <t-input v-else type="text" v-model="news.newArtistName" placeholder="Your Artist Name" name="Artist Name"></t-input>
    <span v-if="!newArtist" class="text-sm">You can't find your artist ? <button @click="newArtist = !newArtist" class="focus:outline-none text-red-500">Please click here to suggest him with your news</button></span>
    <span v-else class="text-sm"><button @click="newArtist = !newArtist" class="focus:outline-none text-red-700">Back to artist list</button></span>
    <t-datepicker
        class="text-black"
        v-model="news.date"
        placeholder="Date"
        initial-view="month" dateFormat='Y-m-d' clearable>
    </t-datepicker>
    <t-textarea type="text" v-model="news.message" placeholder="Your News*" name="News"></t-textarea>
    <t-textarea type="text" v-model="news.source" placeholder="Source*" name="Source"></t-textarea>
    <button v-if="!newArtist" @click="sendNews()" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Send the news</button>
    <button v-else @click="sendNewsToValidated()" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Suggest Artist and News</button>
</div>
</template>

<script>
export default {
  name: "NewsCreation",
  data() {
    return {
      artistList: [],
      artistSelected: null,
      newArtist: false,
      news: {
        date: null,
        message: null,
        source: null,
        newArtistName: null,
      },
    };
  },

  async mounted() {
      const{data: response} = await this.$axios.get('https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc')
      this.artistList = response
  },

  methods:{
    async sendNews(){
      if(!this.news.message) {
          this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
      } else if(!this.artistSelected) {
          this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
      } else {
        this.news.artistId = this.artistSelected.id
        await this.$axios.post(`https://comeback-api.herokuapp.com/infos`, this.news)
        .then(response => {
          this.news.message = null,
          this.news.artistId = null,
          this.news.date = null,
          this.news.source = null,
          this.newArtist = false
          this.closeModal()
        }).catch(function (error) {
            console.log(error);
        });
      }
    },

    async sendNewsToValidated() {
      if(!this.news.message) {
          this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
      } else if(!this.news.newArtistName) {
          this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
      } else {
        await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
          state:'PENDING',
          method:'POST',
          endpoint:`/infos`,
          body: this.news,
          currentData: [],
          userId: this.news.userId,
          source: null
        }).then(response=>{
          this.news.message = null,
          this.news.newArtistName = null,
          this.news.date = null,
          this.news.source = null,
          this.newArtist = false
          this.closeModal()
        })
      }
    },

    closeModal(){
      this.$emit('close')
    }
  }
}
</script>