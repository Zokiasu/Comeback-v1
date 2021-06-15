const YoutubeMusicApi = require('youtube-music-api')

const api = new YoutubeMusicApi();
const axios = require('axios');
let artistExist = false;
let releaseExist = false;
process.argv.shift()  // skip node.exe
process.argv.shift()  // skip name of js file
const entry = process.argv.join(" ")

// Retrieves Innertube Config
api.initalize().then(async info => {
    let artistList = []
    await axios.get(`https://comeback-api.herokuapp.com/artists`).then(res => {
        artistList = res.data
    })
    let releaseList = []
    await axios.get(`https://comeback-api.herokuapp.com/releases`).then(res => {
        releaseList = res.data
    })
    
    api.search(entry, "artist").then(result => {
        result.content.forEach(element => {
            console.log('element', element.name)
            if(element.name.toLowerCase() == entry.toLowerCase()){
                //console.log(element.browseId)
                api.getArtist(element.browseId).then(result2 => {
                    //console.log(result2)
                    let artist = {
                        id: null,
                        name: null,
                        image: null,
                        type: "SOLO",
                        website: null,
                        description: null,
                        socials: null,
                        platforms: null,
                        styles: null
                    }
                    artist.name = result2.name
                    artist.description = result2.description
                    artist.image = element.thumbnails[element.thumbnails.length-1].url.replace('w120-h120', 'w250-h250')
                    //verification si l'artiste trouver existe chez youtube
                    if(artist.name) {
                        console.log('ADD ARTIST : ', artist.name)
                        artistList.forEach(elem => {
                            if (elem.name == artist.name && elem.image == artist.image) {
                                artistExist = true
                                artist.id = elem.id
                            }
                        })
                        //Si l'artiste n'est pas déjà dans la base de donnée
                        if(!artistExist) {
                            console.log("-- ARTIST NOT EXIST")
                            axios.post(`https://comeback-api.herokuapp.com/artists`, artist)
                            .then(res => {
                                artist.id = res.data.id
                                console.log("ID ARTIST", artist.id)
                                axios.get(`https://comeback-api.herokuapp.com/artists`).then(res => {
                                    artistList = res.data
                                    console.log("ALBUMS", result2.products?.albums?.content?.length)
                                    //ajout des albums de l'artiste
                                    result2.products?.albums?.content?.forEach(el => {
                                        api.getAlbum(el.browseId).then(result3 => {
                                            let release = {
                                                name: null,
                                                image: null,
                                                type: "ALBUM",
                                                date: new Date(),
                                                platforms: [],
                                                styles: [],
                                                artists: [],
                                                events: [],
                                                musics: [],
                                                followers: []
                                            }
                                            release.name = result3.title
                                            release.image = result3.thumbnails[result3.thumbnails.length-1].url
                                            release.date = new Date(result3.date.year+'-'+result3.date.month+'-'+result3.date.day + ' 02:00:00')
                                            result3.tracks.forEach(element => {
                                                release.musics.push({
                                                    name: element.name,
                                                    clip: 'https://youtu.be/'+element.videoId
                                                })
                                            })
                                            artistList.forEach(elem => {
                                                if (elem.id == artist.id) {
                                                    release.artists.push(elem)
                                                }
                                            })

                                            //vérifier si la release n'existe pas déjà
                                            
                                            releaseList.forEach(elem => {
                                                elem.artists.forEach(elem2 => {
                                                    if (elem.name == release.name && elem2.id == release.artists[0].id) {
                                                        releaseExist = true
                                                    }
                                                })
                                            })
                                            if(!releaseExist){
                                                console.log("-- RELEASE NOT EXIST")
                                                console.log("ADD ALBUMS : ", release.name)
                                                axios.post(`https://comeback-api.herokuapp.com/releases`, release)
                                                .then(res => {
                                                    console.log('success', res.data.name)
                                                })
                                                .catch(res => console.log('error', res))
                                            } else {
                                                //console.log("RELEASE EXIST")
                                                releaseExist = false
                                            }
                                        })
                                    })
                                    console.log("SINGLES", result2.products?.singles?.content?.length)
                                    //ajout des singles de l'artiste
                                    result2.products?.singles?.content?.forEach(el => {
                                        api.getAlbum(el.browseId).then(result3 => {
                                            let release = {
                                                name: null,
                                                image: null,
                                                type: "SINGLE",
                                                date: null,
                                                platforms: [],
                                                styles: [],
                                                artists: [],
                                                events: [],
                                                musics: [],
                                                followers: []
                                            }
                                            release.name = result3.title
                                            release.image = result3.thumbnails[result3.thumbnails.length-1].url
                                            release.date = new Date(result3.date.year+'-'+result3.date.month+'-'+result3.date.day + ' 02:00:00')
                                            result3.tracks.forEach(element => {
                                                release.musics.push({
                                                    name: element.name,
                                                    clip: 'https://youtu.be/'+element.videoId
                                                })
                                            })
                                            artistList.forEach(elem => {
                                                if (elem.id == artist.id) {
                                                    release.artists.push(elem)
                                                }
                                            })

                                            //vérifier si la release n'existe pas déjà
                                            
                                            releaseList.forEach(elem => {
                                                elem.artists.forEach(elem2 => {
                                                    if (elem.name == release.name && elem2.id == release.artists[0].id) {
                                                        releaseExist = true
                                                    }
                                                })
                                            })
                                            if(!releaseExist){
                                                console.log("-- RELEASE NOT EXIST")
                                                console.log("ADD SINGLE : ", release.name)
                                                axios.post(`https://comeback-api.herokuapp.com/releases`, release)
                                                .then(res => {
                                                    console.log('success', res.data.name)
                                                })
                                                .catch(res => console.log('error', res))
                                            } else {
                                                //console.log("RELEASE EXIST")
                                                releaseExist = false
                                            }
                                        })
                                    })
                                })
                            })
                            .catch(res => console.log('error', res))
                        } 
                        //Si l'artiste est déjà dans la base de donnée
                        else {
                            console.log("-- ARTIST EXIST")
                            console.log("ALBUMS", result2.products?.albums?.content?.length)
                            //ajout des albums de l'artiste
                            result2.products?.albums?.content?.forEach(el => {
                                api.getAlbum(el.browseId).then(result3 => {
                                    let release = {
                                        name: null,
                                        image: null,
                                        type: "ALBUM",
                                        date: new Date(),
                                        platforms: [],
                                        styles: [],
                                        artists: [],
                                        events: [],
                                        musics: [],
                                        followers: []
                                    }
                                    release.name = result3.title
                                    release.image = result3.thumbnails[result3.thumbnails.length-1].url
                                    release.date = new Date(result3.date.year+'-'+result3.date.month+'-'+result3.date.day + ' 02:00:00')
                                    result3.tracks.forEach(element => {
                                        release.musics.push({
                                            name: element.name,
                                            clip: 'https://youtu.be/'+element.videoId
                                        })
                                    })
                                    artistList.forEach(elem => {
                                        if (elem.id == artist.id) {
                                            release.artists.push(elem)
                                        }
                                    })

                                    //vérifier si la release n'existe pas déjà
                                    releaseList.forEach(elem => {
                                        elem.artists.forEach(elem2 => {
                                            if (elem.name == release.name && elem2.id == release.artists[0]?.id) {
                                                releaseExist = true
                                            }
                                            if(release.artists.length < 1) releaseExist = true
                                        })
                                    })
                                    if(!releaseExist){
                                        console.log("-- RELEASE NOT EXIST")
                                        console.log("ADD ALBUMS : ", release.name)
                                        axios.post(`https://comeback-api.herokuapp.com/releases`, release)
                                        .then(res => {
                                            console.log('success', res.data.name)
                                        })
                                        .catch(res => console.log('error', res))
                                    } else {
                                        //console.log("RELEASE EXIST")
                                        releaseExist = false
                                    }
                                })
                            })
                            console.log("SINGLES", result2.products?.singles?.content?.length)
                            //ajout des singles de l'artiste
                            result2.products?.singles?.content?.forEach(el => {
                                api.getAlbum(el.browseId).then(result3 => {
                                    let release = {
                                        name: null,
                                        image: null,
                                        type: "SINGLE",
                                        date: null,
                                        platforms: [],
                                        styles: [],
                                        artists: [],
                                        events: [],
                                        musics: [],
                                        followers: []
                                    }
                                    release.name = result3.title
                                    release.image = result3.thumbnails[result3.thumbnails.length-1].url
                                    release.date = new Date(result3.date.year+'-'+result3.date.month+'-'+result3.date.day + ' 02:00:00')
                                    result3.tracks.forEach(element => {
                                        release.musics.push({
                                            name: element.name,
                                            clip: 'https://youtu.be/'+element.videoId
                                        })
                                    })
                                    
                                    artistList.forEach(elem => {
                                        if (elem.id == artist.id) {
                                            release.artists.push(elem)
                                        }
                                    })

                                    //vérifier si la release n'existe pas déjà
                                    releaseList.forEach(elem => {
                                        elem.artists.forEach(elem2 => {
                                            if (elem.name == release.name && elem2.id == release.artists[0].id) {
                                                releaseExist = true
                                            }
                                        })
                                    })
                                    if(!releaseExist){
                                        console.log("-- RELEASE NOT EXIST")
                                        console.log("ADD SINGLE : ", release.name)
                                        axios.post(`https://comeback-api.herokuapp.com/releases`, release)
                                        .then(res => {
                                            console.log('success', res.data.name)
                                        })
                                        .catch(res => console.log('error', res))
                                    } else {
                                        //console.log("RELEASE EXIST")
                                        releaseExist = false
                                    }
                                })
                            })
                            artistExist = false
                        }
                    }
                })
            }
        });
    })
})
