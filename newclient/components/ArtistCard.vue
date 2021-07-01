<template>
  <div id="artist-card" class="text-white animate__fadeInDown-2s">
    <div id="artist-image" class="w-32 h-32 lg:h-40 lg:w-40 mx-auto">
      <NuxtLink :to="`/artist/${artist.id}`">
        <img class="rounded-full w-32 h-32 lg:h-40 lg:w-40 object-cover" :src="artist.image ? artist.image : defaultArtistImage" :alt="artist.name"/>
      </NuxtLink>
    </div>
    <NuxtLink id="artist-name" :to="`/artist/${artist.id}`" :class=" groupSize > 0 ? 'flex justify-center space-x-1':''"><h3 class="font-semibold text-center hover:underline">{{artist.name}}</h3><span v-if="groupSize > 0"> [{{artist.groups[0].name}}] </span></NuxtLink>
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