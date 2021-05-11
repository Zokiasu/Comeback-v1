// your-project/store/index.js

export const state = () => ({
    var1: null,
    var2: null,
    artistList:[
      {
        name: 'Rihanna',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/450px-Rihanna_Fenty_2018.png',
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