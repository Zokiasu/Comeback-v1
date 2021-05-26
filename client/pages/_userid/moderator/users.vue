<template>
    <div class="m-5">
        <ModeratorMenu/>
        <section id="page-body" class="p-5 space-y-3">
            <div></div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'LastUpdate',

        data() {
            return {
                artists: [],
                releases: [],
                lastUpdate: [],
            }
        },

        async asyncData({ $axios }){
            let artists = await $axios.$get(`https://comeback-api.herokuapp.com/artists`)
            let releases = await $axios.$get(`https://comeback-api.herokuapp.com/releases`)
            return {artists, releases}
        },

        mounted(){
            this.lastUpdate = this.artists.concat(this.releases)
            this.lastUpdate.sort(function(a,b){
                if(a.updatedAt.toLowerCase() > b.updatedAt.toLowerCase()) {return -1}
                if(a.updatedAt.toLowerCase() < b.updatedAt.toLowerCase()) {return 1}
                return 0;
            })
        },
    }
</script>