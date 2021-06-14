<template>
    <section id="menu">
        <ul class="flex space-x-2 text-white text-xs md:text-sm lg:text-base">
            <NuxtLink :to="`/moderator/pending`" class="px-3 py-1.5" :class="$route.name !== 'moderator-pending' ? '' : 'border-b-2 border-red-700'">
                <span>Pending</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/releaseslist`" class="px-3 py-1.5" :class="$route.name !== 'moderator-releaseslist' ? '' : 'border-b-2 border-red-700'">
                <span>Releases</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/artistslist`" class="px-3 py-1.5" :class="$route.name !== 'moderator-artistslist' ? '' : 'border-b-2 border-red-700'">
                <span>Artists</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/lastupdated`" class="px-3 py-1.5" :class="$route.name !== 'moderator-lastupdated' ? '' : 'border-b-2 border-red-700'">
                <span>Last Updated</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/lastcreated`" class="px-3 py-1.5" :class="$route.name !== 'moderator-lastcreated' ? '' : 'border-b-2 border-red-700'">
                <span>Last Created</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/users`" class="px-3 py-1.5" :class="$route.name !== 'moderator-users' ? '' : 'border-b-2 border-red-700'">
                <span>Users</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/oldpending`" class="px-3 py-1.5" :class="$route.name !== 'moderator-oldpending' ? '' : 'border-b-2 border-red-700'">
                <span>Old Pending</span>
            </NuxtLink>
        </ul>
    </section>
</template>

<script>
    export default {
        computed: {
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },
        },
    }
</script>