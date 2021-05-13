<template>
    <youtube :video-id="videoId" :player-vars="playerVars"></youtube>
</template>

<script>
    import Vue from 'vue'
    import VueYoutube from 'vue-youtube'

    Vue.use(VueYoutube)

    export default {

        props: ['videoid'],

        data() {
            return {
                videoId: 'HL1UzIK-flA',
                playerVars: {
                    autoplay: 0
                },
            }
        },

        created(){
            this.videoId = this.videoid
        },
    }
</script>