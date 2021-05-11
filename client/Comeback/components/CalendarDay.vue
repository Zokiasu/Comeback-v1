<template>
  <div class="p-10 justify-center texts text-white">
    <div class="col-start-1 col-end-7 border-b-2 border-red-700 pb-2">
        <h1 class="font-semibold text-4xl"> {{dates}} </h1>
    </div>
    <div class="grid gap-3 py-10 justify-center texts text-white" :class="width ? 'grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-x-5 gap-y-10' : 'grid-cols-1 gap-3'">
    <ReleaseCard 
        v-for="(release, index) in this.releaseList"
        :release="release"
        :key="index"/>
    </div>
  </div>
</template>

<script>
    export default {

        props: ['date', 'width'],

        data(){
            return {
              releaseList:[],
              dates:''
            }
        },

        mounted(){
            this.findDay(this.date)
            this.dates = (new Date(this.date)).toLocaleDateString('en-US', { day:'numeric', month: 'long' })
        },

        methods: {
            findDay(day){
                var days = (new Date(day)).toLocaleDateString('en-US', { day:'numeric', month: 'long' })
                switch(days){
                    case 'May 8':
                        this.releaseList = [
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/70/in_the_name_of_love_99207.jpg?1618076031',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;
                    case 'May 18':
                        this.releaseList = [
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 18, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 18, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 18, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 18, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 18, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;                    
                    case 'May 28':
                        this.releaseList = [
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 28, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 28, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 28, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 28, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('May 28, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;                    
                    case 'June 8':
                        this.releaseList = [
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 8, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;                    
                    case 'June 12':
                        this.releaseList = [
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 12, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;                    
                    case 'June 30':
                        this.releaseList = [
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('June 30, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;                    
                    case 'July 8':
                        this.releaseList = [
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/70/in_the_name_of_love_99207.jpg?1618076031',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/70/in_the_name_of_love_99207.jpg?1618076031',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/70/in_the_name_of_love_99207.jpg?1618076031',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'In The Name Of Love',
                            releaseType:'EP',
                            releaseArtist:'CL',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/70/in_the_name_of_love_99207.jpg?1618076031',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Follow Me',
                            releaseType:'Single',
                            releaseArtist:'Kim Hee Jae',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
                            releaseDate: new Date('July 8, 12:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Yellow',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
                            releaseDate: new Date('July 8, 18:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Cyan',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                            {
                            releaseName:'Magenta',
                            releaseType:'Album',
                            releaseArtist:'Kang Daniel',
                            releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
                            releaseDate: new Date('July 8, 20:30:00 GMT+07:00'),
                            },
                        ]
                        break;                                       
                }
            },
        },
    }
</script>

<style>
.texts {
  font-family:
    'Sarala'
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  letter-spacing: 1px;
}
</style>