<template>
  <div class="p-6">
      <div id="top" class="flex text-white mb-6" >
        <div id="profile-picture">
            <img class="h-48 w-48 object-cover" :src="img" alt="Artist Picture"/>
        </div>
        <div id="general" class="flex flex-col px-3 justify-between">
            <span class="text-6xl">Profile Name</span>
            <nav>
                <ul class="flex space-x-5 list-none text-2xl">
                    <li>
                        <div @click="changetab('artist')" class="cursor-pointer" :class="actualtab == 'artist' ? 'border-red-700 border-b-2' : ''">
                            <span>Artist</span>
                        </div>
                    </li>
                    <li>
                        <div @click="changetab('music')" class="cursor-pointer" :class="actualtab == 'music' ? 'border-red-700 border-b-2' : ''">
                            <span>Music</span>
                        </div>
                    </li>
                    <!--<li>
                        <div @click="changetab('stat')" class="cursor-pointer" :class="actualtab == 'stat' ? 'border-red-700 border-b-2' : ''">
                            <span>Stat</span>
                        </div>
                    </li>-->
                </ul>
            </nav>
        </div>
      </div>
      <div id="middle">
        <div id="artist-following" v-if="actualtab == 'artist'">
            <h1 class="text-white text-xl">Artist Followed</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-y-5 mt-10 my-5 w-full justify-center">
                <ArtistCard 
                    v-for="(artist, index) in this.artists"
                    :key="index"
                    :artist="artist"
                    :index="index"/>
            </div>
        </div>
        <div id="music-following" v-if="actualtab == 'music'">
            <h1 class="text-white text-xl">Releases Followed</h1>
            <div id="divider" class="border-b border-red-700 border-1 my-2 mb-2 w-96"></div>
            <div class="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-x-5 gap-y-10 gap-3 py-5 justify-center texts text-white">
                <ReleaseCard
                    class="w-40"
                    v-for="(release, index) in this.releaseList"
                    :release="release"
                    :key="index"/>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {

    data(){
        return {
            img: 'https://foot44.fff.fr/wp-content/uploads/sites/35/2019/10/Silhouette-Homme.jpg',
            actualtab:'artist',
            artists: [],
            releaseList: [
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
                {
                    releaseID:2,
                    releaseName:'Yellow',
                    releaseType:'Album',
                    releaseArtist:'Kang Daniel',
                    releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                    releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                },
            ],
        }
    },

    created(){
      this.artists = JSON.parse(JSON.stringify(this.$store.state.artistList))
    },

    methods:{
        changetab(newtab){
            this.actualtab = newtab
        },
    },

  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
