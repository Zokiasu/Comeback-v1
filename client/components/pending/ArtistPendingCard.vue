<template>
    <div style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden space-y-2">
        <div>
            <span v-if="pending.method == 'POST'">Creation</span>
            <span v-if="pending.method == 'PUT'">Edition</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-500 flex flex-col p-2 space-y-2">
                <span class="text-lg font-semibold">New Data</span>
                <div class="flex space-x-2">
                    <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
                    <div class="flex flex-col space-y-1.5 -mt-1">
                        <span v-if="pending.body.name">Name : {{pending.body.name}} </span>
                        <span v-if="pending.body.type">Type : {{pending.body.type}} </span>
                        <div v-if="pending.body.styles">
                            <span>Styles : </span><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style}} </span>
                        </div>
                    </div>
                </div>
                <div v-if="pending.body.description">
                    <span>Description : {{pending.body.description}} </span>
                </div>
                <div v-if="pending.body.groups">
                    <span>Groups : </span><span v-for="(group, index) in pending.body.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{group}} </span>
                </div>
                <div v-if="pending.body.members">
                    <span>Members : </span><span v-for="(member, index) in pending.body.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{member}} </span>
                </div>
                <div v-if="pending.body.socials" class="flex flex-col">
                    <span>Social :</span>
                    <span v-for="(social, index) in pending.body.socials" :key="index"> {{social}} </span>
                </div>
                <div v-if="pending.body.platforms" class="flex flex-col">
                    <span>Platforms :</span>
                    <span v-for="(platform, index) in pending.body.platforms" :key="index"> {{platform}} </span>
                </div>
            </div>
            <div class="bg-gray-500 flex flex-col p-2 space-y-2">
                <span class="text-lg font-semibold">Old Data</span>
                <div class="flex space-x-2">
                    <img :src="pending.body.image" class="w-20 h-20">
                    <div class="flex flex-col space-y-1.5 -mt-1">
                        <span>Name : {{pending.body.name}} </span>
                        <span>Type : {{pending.body.type}} </span>
                        <div>
                            <span>Styles : </span><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style}} </span>
                        </div>
                    </div>
                </div>
                <span>Description : {{pending.body.description}} </span>
                <span>Groups : </span><span v-for="(group, index) in pending.body.groups" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{group}} </span>
                <span>Members : </span><span v-for="(member, index) in pending.body.members" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{member}} </span>
                <div class="flex flex-col">
                    <span>Social :</span>
                    <span v-for="(social, index) in pending.body.socials" :key="index"> {{social}} </span>
                </div>
                <div class="flex flex-col">
                    <span>Platforms :</span>
                    <span v-for="(platform, index) in pending.body.platforms" :key="index"> {{platform}} </span>
                </div>
            </div>
        </div>
        <div class="flex space-x-3 justify-end">
            <button>Refused</button>
            <button>Accepted</button>
        </div>
    </div>
</template>