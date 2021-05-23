<template>
    <section id="menu">
        <ul class="flex space-x-2 text-white">
            <NuxtLink to="/_userid/moderator/pending" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-pending' ? '' : 'bg-gray-500 bg-opacity-30 rounded-t border-b-2 border-red-700'">
                <span>Pending</span>
            </NuxtLink>
            <NuxtLink to="/_userid/moderator/releaseslist" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-releaseslist' ? '' : 'bg-gray-500 bg-opacity-30 rounded-t border-b-2 border-red-700'">
                <span>Releases</span>
            </NuxtLink>
            <NuxtLink to="/_userid/moderator/artistslist" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-artistslist' ? '' : 'bg-gray-500 bg-opacity-30 rounded-t border-b-2 border-red-700'">
                <span>Artists</span>
            </NuxtLink>
            <NuxtLink to="/_userid/moderator/lastupdated" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-lastupdated' ? '' : 'bg-gray-500 bg-opacity-30 rounded-t border-b-2 border-red-700'">
                <span>Last Updated</span>
            </NuxtLink>
            <NuxtLink to="/_userid/moderator/lastcreated" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-lastcreated' ? '' : 'bg-gray-500 bg-opacity-30 rounded-t border-b-2 border-red-700'">
                <span>Last Created</span>
            </NuxtLink>
            <NuxtLink to="/_userid/moderator/users" class="px-3 py-1.5" :class="$route.name !== 'userid-moderator-users' ? '' : 'bg-gray-500 bg-opacity-30 rounded-t border-b-2 border-red-700'">
                <span>Users</span>
            </NuxtLink>
        </ul>
    </section>
</template>