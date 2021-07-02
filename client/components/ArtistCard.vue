<template>
  <div id="artist-card" class="text-white animate__fadeInDown-2s">
    <div id="artist-image" class="h-20 md:h-40 w-20 md:w-40 mx-auto">
      <NuxtLink :to="`/artist/${artist.id}`">
        <img class="rounded-full h-20 md:h-40 w-20 md:w-40 object-cover" :src="artist.image ? artist.image : defaultArtistImage" :alt="artist.name"/>
      </NuxtLink>
    </div>
    <NuxtLink id="artist-name" :to="`/artist/${artist.id}`" :class=" groupSize > 0 ? 'flex flex-col justify-center space-x-1':''">
    <h2 class="font-semibold text-center hover:underline">{{artist.name}}</h2>
    <h3 class="text-center" v-if="groupSize > 0 && artist.type != 'GROUP'">[{{artist.groups[0].name}}]</h3>
    </NuxtLink>
  </div>
</template>

<script>
  export default {
    name: "artistCard",

    props: ['artist'],

    data(){
      return {
        groupSize:0,
      }
    },

    created(){
      if(this.artist.groups?.length) this.groupSize = this.artist.groups.length
    },
    
    computed: {
      userData(){
        let utmp = this.$store.state.dataUser
        return utmp
      },
      
      defaultArtistImage(){
        return this.$store.state.imageArtistDefault
      },
    }
  }
</script>