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
                <img v-if="props.option.image" loading="lazy" class="option__image w-14 h-14 object-cover" :src="props.option.image" :alt="props.option.name">
                <div class="option__desc flex flex-col space-y-1">
                    <span class="option__title">{{ props.option.name }}</span>
                    <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                </div>
            </div>
        </template>
        <template slot="option" slot-scope="props">
            <div class="flex space-x-1">
                <img v-if="props.option.image" loading="lazy" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                <div class="option__desc flex flex-col space-y-1">
                    <span class="option__title">{{ props.option.name }}</span>
                    <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                </div>
            </div>
        </template>
    </multiselect>
    <t-input v-else type="text" v-model="newsArtistName" placeholder="Your Artist Name" name="Artist Name"></t-input>
    <span v-if="!newArtist" class="text-sm">You can't find your artist ? <button @click="newArtist = !newArtist" class="focus:outline-none text-red-500">Please click here to suggest him with your news</button></span>
    <span v-else class="text-sm"><button @click="newArtist = !newArtist" class="focus:outline-none text-red-700">Back to artist list</button></span>
    <t-datepicker
        class="text-black"
        v-model="newsDate"
        placeholder="Date"
        initial-view="month" dateFormat='Y-m-d' clearable>
    </t-datepicker>
    <t-textarea type="text" v-model="newsMessage" placeholder="Your News*" name="News"></t-textarea>
    <t-textarea type="text" v-model="newsSource" placeholder="Source*" name="Source"></t-textarea>
    <button v-if="!newArtist" @click="sendNews()" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Send the news</button>
    <button v-else @click="sendNewsToValidated()" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Suggest Artist and News</button>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  name: "NewsCreation",

  data() {
    return {
      artistList: [],
      artistSelected: null,
      newArtist: false,
      
      newsDate: null,
      newsMessage: null,
      newsSource: null,
      newsArtistName: null,
      newsArtistId: null,
      user: null
    };
  },

  async mounted() {
      const{data: response} = await this.$axios.get('https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc')
      this.artistList = response
  },

  watch: {
    newsDate: {
      immediate: true,
      handler(newsDate) {
        if (process.client) {
          if(newsDate) this.newsMessage = `${this.artistSelected.name} is coming back on ${this.dateFormat(new Date(newsDate))}`
        }
      }
    },
  },

  methods:{
    ...mapGetters([
      'GET_DATA_USER',
    ]),

    dateFormat(d){
      let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      return `${da}/${mo}/${ye}`
    },

    async sendNews(){
      this.user = this.GET_DATA_USER()
      if(!this.newsMessage) {
          this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
      } else if(!this.artistSelected) {
          this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
      } else {
        this.newsArtistId = this.artistSelected.id
        await this.$axios.post(`https://comeback-api.herokuapp.com/infos`, 
        { 
          message : this.newsMessage, 
          date: this.newsDate, 
          source: this.newsSource, 
          userId: this.user.id,
          artistId: this.newsArtistId 
        })
        .then(response => {
          this.newsMessage = null,
          this.newsArtistId = null,
          this.newsDate = null,
          this.newsSource = null,
          this.newArtist = false
          this.closeModal()
        }).catch(function (error) {
            console.log(error);
        });
      }
    },

    async sendNewsToValidated() {
      this.user = this.GET_DATA_USER()
      if(!this.newsMessage) {
          this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
      } else if(!this.newsArtistName) {
          this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
      } else {
        await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
          state:'PENDING',
          method:'POST',
          endpoint:`/infos`,
          body: this.news,
          currentData: [],
          userId: this.user.id,
          source: null
        }).then(response=>{
          this.newsMessage = null,
          this.newsArtistName = null,
          this.newsDate = null,
          this.newsSource = null,
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