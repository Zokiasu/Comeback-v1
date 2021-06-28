const YoutubeMusicApi = require('youtube-music-api')

const api = new YoutubeMusicApi();
const axios = require('axios');
let artistExist = false;
let releaseExist = false;
let artistList = []
let releaseList = []
process.argv.shift()  // skip node.exe
process.argv.shift()  // skip name of js file
const entry = process.argv.join(" ")

// Retrieves Innertube Config
api.initalize().then(async info => {
    await axios.get(`https://comeback-api.herokuapp.com/artists?sortby=id:asc`).then(res => {
        artistList = [...new Set(res.data)]
    })
    await axios.get(`https://comeback-api.herokuapp.com/releases?sortby=id:asc`).then(res => {
        releaseList = res.data
    })

    if(entry == "") {
        for (let index = 0; index < artistList.length; index++) {
            //console.log(index, artistList[index].name)
            getArtist(artistList[index].idyoutubemusic, undefined, artistList, releaseList)
        }
        //api.getArtist("UC6tU41SuJUDVHKnl48-Yrhw").then(result => //console.log(result))
    } else {
        addNewArtists(entry, artistList, releaseList)
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const addNewArtists = function(entry, artistList, releaseList) {
    api.search(entry, "artist").then(result => {
        if(result) {
            result?.content?.forEach(element => {
                if(element.name != undefined && element.browseId != undefined) {
                    if(element.name.toLowerCase() == entry.toLowerCase()){
                        if(element.browseId) {
                            getArtist(element.browseId, element, artistList, releaseList)
                        }
                    }
                }
            });
        }
    })
}

const getArtist = function (idToGet, element, artistList, releaseList) {
    if(idToGet != null) {
        api.getArtist(idToGet).then(result2 => {
            if(result2.name) {
                //console.log(result2)
                let artist = {
                    image: null,
                    type: "SOLO",
                    website: null,
                    description: null,
                    socials: null,
                    platforms: null,
                    styles: null,
                    idyoutubemusic: null,
                }

                artist.name = result2.name
                artist.description = result2.description
                if(element) artist.image = element.thumbnails[element.thumbnails.length-1].url.replace('w120-h120', 'w250-h250')
                artist.idyoutubemusic = idToGet

                //verification si l'artiste trouver existe chez youtube
                if(artist.name) {
                    console.log('CHECK ARTIST : ', artist.name)
                    artistList.forEach(elem => {
                        if (elem.name == artist.name && elem.idyoutubemusic == artist.idyoutubemusic) {
                            artistExist = true
                            artist['id'] = elem.id
                        }
                    })
                    
                    //Si l'artiste n'est pas déjà dans la base de donnée
                    if(!artistExist) {
                        console.log("-- ARTIST NOT EXIST")
                        axios.post(`https://comeback-api.herokuapp.com/artists`, artist).then(res => {
                            artist['id'] = res.data.id
                            //console.log("ID ARTIST", artist.id)
                            axios.get(`https://comeback-api.herokuapp.com/artists`)
                            .catch(res => console.log('error', res))
                            .then(res => {
                                //artistList = res.data
                                addAlbum(result2, artist, artistList, releaseList)
                                addSingle(result2, artist, artistList, releaseList)
                            })
                        })
                        .catch(res => console.log('error', res))
                    } 
                    //Si l'artiste est déjà dans la base de donnée
                    else {
                        //console.log("-- ARTIST EXIST")
                        addAlbum(result2, artist, artistList, releaseList)
                        addSingle(result2, artist, artistList, releaseList)
                        artistExist = false
                    }
                }
            }
        })
    }
}

const addAlbum = function(result2, artist, artistList, releaseList) {
    //ajout des albums de l'artiste
    result2?.products?.albums?.content?.forEach(el => {
        if(el.browseId) {
            api.getAlbum(el.browseId).then(result3 => {
                if(result3.title) {
                    let release = {
                        name: null,
                        type: "SINGLE",
                        image: null,
                        date: null,
                        idyoutubemusic: null,
                        musics:[],
                        artists:[],
                    }

                    release.name = result3.title
                    release.type = el.type.toUpperCase()
                    release.image = result3.thumbnails[result3.thumbnails.length-1].url
                    release.date = new Date(result3.date.year+'-'+result3.date.month+'-'+result3.date.day + ' 02:00:00')
                    release.idyoutubemusic = el.browseId                                                

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
                        //console.log(release.name, elem.idyoutubemusic, release.idyoutubemusic)
                        if (elem.idyoutubemusic == release.idyoutubemusic) {
                            releaseExist = true
                        }
                    })

                    if(!releaseExist && result3.date.year >= 2021){
                        console.log("-- RELEASE NOT EXIST : ", release.name)
                        //console.log("ADD ALBUMS : ", release.name)
                        axios.post(`https://comeback-api.herokuapp.com/releases`, release)
                        .then(res => {
                            //console.log('success', res.data.name)
                        })
                        .catch(res => console.log('error', res))
                    } else {
                        //console.log("RELEASE EXIST OR TOO OLD")
                        releaseExist = false
                    }
                }
            })
        }
    })
}

const addSingle = function(result2, artist, artistList, releaseList) {
    //ajout des singles de l'artiste
    result2?.products?.singles?.content?.forEach(el => {
        if(el.browseId) {
            api.getAlbum(el.browseId).then(result3 => {
                if(result3.title) {
                    let release = {
                        name: null,
                        type: "SINGLE",
                        image: null,
                        date: null,
                        idyoutubemusic: null,
                        musics:[],
                        artists:[],
                    }

                    release.name = result3.title
                    release.image = result3.thumbnails[result3.thumbnails.length-1].url
                    release.date = new Date(result3.date.year+'-'+result3.date.month+'-'+result3.date.day + ' 02:00:00')
                    release.idyoutubemusic = el.browseId                                                
                    
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
                        if (elem.idyoutubemusic == release.idyoutubemusic) {
                            releaseExist = true
                        }
                    })

                    if(!releaseExist && result3.date.year >= 2021){
                        console.log("-- RELEASE NOT EXIST", release.name)
                        axios.post(`https://comeback-api.herokuapp.com/releases`, release)
                        .then(res => {
                            //console.log('success', res.data.name)
                        })
                        .catch(res => console.log('error', res))
                    } else {
                        //console.log("RELEASE EXIST OR TOO OLD")
                        releaseExist = false
                    }
                }
            })
        }
    })
}