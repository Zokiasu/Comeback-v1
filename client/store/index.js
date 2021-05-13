// your-project/store/index.js

export const state = () => ({
    var1: null,
    var2: null,
    loremipsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac lectus urna. Aliquam lobortis vulputate risus, quis tempor arcu pharetra vel. Sed semper vel magna vel pulvinar. Duis et lacus augue. Duis eget diam urna. Pellentesque convallis nisl vel justo auctor commodo. Maecenas id luctus ante, et aliquam mauris. Donec auctor turpis sed odio facilisis sollicitudin. Morbi cursus mattis lorem quis dapibus. Proin tellus orci, pretium a lorem at, porta porta neque. Donec mi justo, scelerisque eget semper quis, aliquam id neque. Phasellus imperdiet id felis in volutpat.",
    artistList:[
      {
        name: 'Rihanna',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/450px-Rihanna_Fenty_2018.png',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac lectus urna. Aliquam lobortis vulputate risus, quis tempor arcu pharetra vel. Sed semper vel magna vel pulvinar. Duis et lacus augue. Duis eget diam urna. Pellentesque convallis nisl vel justo auctor commodo. Maecenas id luctus ante, et aliquam mauris. Donec auctor turpis sed odio facilisis sollicitudin. Morbi cursus mattis lorem quis dapibus. Proin tellus orci, pretium a lorem at, porta porta neque. Donec mi justo, scelerisque eget semper quis, aliquam id neque. Phasellus imperdiet id felis in volutpat.",
        streaminglink:[
          {
            link: 'https://music.youtube.com/channel/UCvWtix2TtWGe9kffqnwdaMw',
            name: 'Youtube Music',
          },
          {
            link: 'https://open.spotify.com/artist/5pKCCKE2ajJHZ9KAiaK11H',
            name: 'Spotify',
          },
          {
            link: 'https://music.apple.com/fr/artist/rihanna/63346553',
            name: 'Apple Music',
          },
        ],
        sociallink:[
          {
            link: 'https://www.instagram.com/badgalriri/?hl=fr',
            name: 'Instagram',
          },
          {
            link: 'https://www.facebook.com/rihanna',
            name: 'Facebook',
          },
          {
            link: 'https://twitter.com/rihanna',
            name: 'Twitter',
          },
        ],
        releaseList: [
          {
              releaseID:0,
              releaseName:'In The Name Of Love',
              releaseType:'EP',
              releaseArtist:'CL',
              releasePicture:'https://m.media-amazon.com/images/I/71dTubMzPML._SS500_.jpg',
              releaseDate: new Date('July 8 2020, 12:30:00 GMT+07:00'),
          },
          {
              releaseID:1,
              releaseName:'Follow Me',
              releaseType:'Single',
              releaseArtist:'Kim Hee Jae',
              releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
              releaseDate: new Date('July 8 2020, 12:30:00 GMT+07:00'),
          },
          {
              releaseID:2,
              releaseName:'Yellow',
              releaseType:'Album',
              releaseArtist:'Kang Daniel',
              releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
              releaseDate: new Date('July 8 2020, 18:30:00 GMT+07:00'),
          },
          {
              releaseID:3,
              releaseName:'Cyan',
              releaseType:'Album',
              releaseArtist:'Kang Daniel',
              releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
              releaseDate: new Date('July 8 2020, 20:30:00 GMT+07:00'),
          },
          {
              releaseID:4,
              releaseName:'Magenta',
              releaseType:'Album',
              releaseArtist:'Kang Daniel',
              releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
              releaseDate: new Date('July 8 2020, 20:30:00 GMT+07:00'),
          },
        ],
      },
      {
        name: 'Selena Gomez',
        picture: 'https://i.f1g.fr/media/madame/1900x1900_crop/sites/default/files/img/2020/09/selena-gomez.jpg',
      },
      {
        name: 'Kang Daniel',
        picture: 'https://k-gen.fr/wp-content/uploads/2019/01/kang-daniel-4-1600x768.png',
      },
      {
        name: 'ITZY',
        picture: 'https://www.korebu.com/wp-content/uploads/2020/12/ITZY-eng-album-e1609014522883.jpg',
      },
      {
        name: 'Billie Eilish',
        picture: 'https://lofficiel.imgix.net/production/belgium/images/1616058526538653-1616009620-billie-eilish-blonde-hair.jpeg?w=1920&h=800&fit=max&crop=focalpoint&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb',
      },
      {
        name: 'Bruno Mars',
        picture: '',
      },
      {
        name: 'The Weeknd',
        picture: '',
      },
      {
        name: 'Justin Bieber',
        picture: '',
      },
      {
        name: 'BTS',
        picture: '',
      },
      {
        name: 'Dua Lipa',
        picture: '',
      },
      {
        name: 'Doja Cat',
        picture: '',
      },
      {
        name: 'Alka Yahnik',
        picture: '',
      },
    ],
    releaseList: [
      {
          releaseID:0,
          releaseName:'In The Name Of Love',
          releaseType:'EP',
          releaseArtist:'CL',
          releasePicture:'https://m.media-amazon.com/images/I/71dTubMzPML._SS500_.jpg',
          releaseDate: new Date('July 8 2020, 12:30:00 GMT+07:00'),
      },
      {
          releaseID:1,
          releaseName:'Follow Me',
          releaseType:'Single',
          releaseArtist:'Kim Hee Jae',
          releasePicture:'https://www.nautiljon.com/images/cd/01/92/follow_me_119529.jpg?0',
          releaseDate: new Date('July 8 2020, 12:30:00 GMT+07:00'),
      },
      {
          releaseID:2,
          releaseName:'Yellow',
          releaseType:'Album',
          releaseArtist:'Kang Daniel',
          releasePicture:'https://www.taiyou.fr/an_content/_upload/img-prod/45462/4_1.jpg',
          releaseDate: new Date('July 8 2020, 18:30:00 GMT+07:00'),
      },
      {
          releaseID:3,
          releaseName:'Cyan',
          releaseType:'Album',
          releaseArtist:'Kang Daniel',
          releasePicture:'https://www.nautiljon.com/images/cd/01/84/cyan_a_version_103348.jpg?1586887745',
          releaseDate: new Date('July 8 2020, 20:30:00 GMT+07:00'),
      },
      {
          releaseID:4,
          releaseName:'Magenta',
          releaseType:'Album',
          releaseArtist:'Kang Daniel',
          releasePicture:'https://www.asiaworldmusic.fr/72533/kang-daniel-mini-album-vol-2-magenta-edition-coreenne.jpg',
          releaseDate: new Date('July 8 2020, 20:30:00 GMT+07:00'),
      },
    ],
})

export const mutations = {
    SET_VAR_1 (state, value) {
        console.log('SET_VAR_1', value)
        state.var1 = value
    },
    SET_VAR_2 (state, value) {
        console.log('SET_VAR_2', value)
        state.var2 = value
    }
}