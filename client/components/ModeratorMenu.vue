<template>
    <section id="menu">
        <ul class="flex space-x-2 text-white">
            <NuxtLink :to="`/${this.userId}/moderator/pending`" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-pending' ? '' : 'border-b-2 border-red-700'">
                <span>Pending</span>
            </NuxtLink>
            <NuxtLink :to="`/${this.userId}/moderator/releaseslist`" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-releaseslist' ? '' : 'border-b-2 border-red-700'">
                <span>Releases</span>
            </NuxtLink>
            <NuxtLink :to="`/${this.userId}/moderator/artistslist`" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-artistslist' ? '' : 'border-b-2 border-red-700'">
                <span>Artists</span>
            </NuxtLink>
            <NuxtLink :to="`/${this.userId}/moderator/lastupdated`" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-lastupdated' ? '' : 'border-b-2 border-red-700'">
                <span>Last Updated</span>
            </NuxtLink>
            <NuxtLink :to="`/${this.userId}/moderator/lastcreated`" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-lastcreated' ? '' : 'border-b-2 border-red-700'">
                <span>Last Created</span>
            </NuxtLink>
            <NuxtLink :to="`/${this.userId}/moderator/users`" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-users' ? '' : 'border-b-2 border-red-700'">
                <span>Users</span>
            </NuxtLink>
        </ul>
    </section>
</template>

<script>
    export default {
        computed: {
            userId(){
                return this.$route.params.userid
            },
        },
    }
</script>