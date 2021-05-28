// your-project/store/index.js

export const state = () => ({
    loremipsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac lectus urna. Aliquam lobortis vulputate risus, quis tempor arcu pharetra vel. Sed semper vel magna vel pulvinar. Duis et lacus augue. Duis eget diam urna. Pellentesque convallis nisl vel justo auctor commodo. Maecenas id luctus ante, et aliquam mauris. Donec auctor turpis sed odio facilisis sollicitudin. Morbi cursus mattis lorem quis dapibus. Proin tellus orci, pretium a lorem at, porta porta neque. Donec mi justo, scelerisque eget semper quis, aliquam id neque. Phasellus imperdiet id felis in volutpat.",
    authUser: '',
    tokenUser: '',
    userUID: '',
})

export const getters = {
    
}

export const actions = {

    async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
        if (!authUser) {
            //await dispatch('cleanupAction')
            return
        } else {
            const { uid, email, emailVerified, displayName, photoURL } = authUser

            commit('SET_USER', {
              uid,
              email,
              emailVerified,
              displayName,
              photoURL,
              isAdmin: claims.custom_claim
            })
        }
    },

    async nuxtServerInit({ dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user) {
            const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
        
            await dispatch('onAuthStateChangedAction', {
                authUser,
                claims,
                token
            })
        
            // or
        
            commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
        }
    }
}

export const mutations = {
    SET_USER: (state, payload) => {
        state.authUser = payload;
    },

    ON_AUTH_STATE_CHANGED_MUTATION (state, { authUser, claims }) {
        const { uid, email, emailVerified, displayName, photoURL } = authUser
        
        state.authUser = {
            uid,
            displayName,
            email,
            emailVerified,
            photoURL: photoURL || null,
            isAdmin: claims.custom_claim
        }
    },

    addToken(state, value){
        state.tokenUser = value
    },

    addUserID(state, value){
        state.userUID = value
    },

    SET_VAR_2 (state, value) {
        state.var2 = value
    },

    async addArtist(){
        await this.$axios.post(`https://comeback-api.herokuapp.com/artists`, {
            name: 'NCT',
            image: 'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827',
            type: 'GROUP',
            website: null,
            description:'NCT is a South Korean boy band created by the label SM Entertainment that debuted in 2016. The groups name is short for Neo Culture Technology, a term coined by Lee Soo Man, the founder of SM Entertainment. The concept of the group is to have an unlimited number of members divided into several sub-units around the world. Members are free to stay or leave the group and other members can be added at any time. The long-term goal for the agency is to have active sub-units in several countries such as China, Japan etc...',
            socials:["https://www.facebook.com/2NE1/"],
            platforms:["https://music.youtube.com/channel/UCwPKPUAWE8ah0lkOcvNh8_Q"],
            styles:["KPOP"],
            newGroups:[
            ],
            newMembers:[
                {
                    name: "WayV",
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2F1621573352818?alt=media&token=8de52e50-8996-45e0-9faf-fadb277f1415",
                    type: "GROUP",
                    website: null,
                    description: "WayV (Chinese: 威神V, pinyin: Wēi Shén V) is a Chinese boy band, more precisely it is the fourth sub-unit of the South Korean boy band NCT, so it is considered the Chinese unit of NCT, grouping most of NCTs members of Chinese origin. The group is composed of seven members: Kun, Ten, Winwin, Lucas, Xiaojun, Hendery, and Yangyang.",
                    socials: [
                        "https://www.instagram.com/WayVofficial/"
                    ],
                    platforms: [
                        "https://music.youtube.com/channel/UC5qKojRk3tgoWJZTSVCE9HQ"
                    ],
                    styles: [
                        "KPOP"
                    ]
                },
                {
                    name: "NCT 127",
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2F1621540985155?alt=media&token=3ff50857-9581-4500-b2f9-17bc81634fed",
                    type: "GROUP",
                    website: null,
                    description: "NCT 127 is the second sub-unit revealed and the first sub-unit with an official formation of SM Entertainment's new project, NCT (Neo Culture Technology). The sub-unit consists of Hae Chan, Yuta, Tae Yong, Win Win, Jae Hyun, Mark, Tae Il, Do Young, Johnny and Jung Woo.\n\nThe name of this subunit comes from the fact that Seoul is located on the geographical coordinate of the 127th meridian east (longitude 127°).",
                    socials: [
                        "https://www.facebook.com/NCT127.smtown",
                        "https://twitter.com/NCTsmtown_127",
                        "https://www.instagram.com/nct127/",
                        "https://www.youtube.com/c/nct127",
                        "https://www.vlive.tv/channel/F3C16D",
                        "https://www.snapchat.com/add/nct127_official"
                    ],
                    platforms: [
                        "https://www.deezer.com/fr/artist/50306442",
                        "https://open.spotify.com/artist/7f4ignuCJhLXfZ9giKT7rH",
                        "https://music.youtube.com/channel/UCjqYTQjO-JG-8vLlt6-4iyQ",
                        "https://music.apple.com/fr/artist/nct-127/1235849306"
                    ],
                    styles: [
                        "KPOP"
                    ]
                },
                {
                    name: "NCT DREAM",
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2F1621542931154?alt=media&token=c1143b24-d6de-4308-9e62-6dd4a9729ecc",
                    type: "GROUP",
                    website: null,
                    description: "NCT Dream is the third sub-unit of South Korean boy band NCT, formed by SM Entertainment in 2016 and then as a teen unit of NCT, later evolved away from their youthful image and was renamed in 2020 adults.",
                    socials: [
                        "https://www.facebook.com/NCTDREAM.smtown/",
                        "https://twitter.com/NCTsmtown_DREAM",
                        "https://www.instagram.com/nct_dream/",
                        "https://www.youtube.com/c/nctdream",
                        "https://www.vlive.tv/channel/DB547B"
                    ],
                    platforms: [
                        "https://music.youtube.com/channel/UCuKdaTsJ9Jv94hVV_I9aRxQ",
                        "https://www.deezer.com/fr/artist/11999322",
                        "https://open.spotify.com/artist/1gBUSTR3TyDdTVFIaQnc02",
                        "https://music.apple.com/us/artist/nct-dream/1208839599"
                    ],
                    styles: [
                        "KPOP"
                    ]
                },
            ],
        })
    }
}