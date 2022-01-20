<template>
<div>
    <div class="flex flex-col p-5 md:px-20 lg:px-40 text-white">
        <div class="space-y-5">
            <div>
                <div class="flex gap-5">
                    <p class="text-3xl">
                        {{ currentYear }}
                    </p>
                    <div class="grid grid-cols-2">
                        <button @click="changeYear(currentYear-1)" class="bg-red-500 px-1">H</button>
                        <button @click="changeYear(currentYear+1)" class="bg-green-500 px-1">B</button>
                    </div>
                </div>
                <div class="flex gap-5">
                    <h1 class="text-7xl font-semibold">
                        {{ month[currentMonth] }} 
                    </h1>
                    <div class="grid grid-cols-1">
                        <button @click="changeMonth(currentMonth-1)" class="bg-red-500 p-2">H</button>
                        <button @click="changeMonth(currentMonth+1)" class="bg-green-500 p-2">B</button>
                    </div>
                </div>
            </div>
            <div>
                <ul class="flex flex-wrap gap-5">
                    <li>
                        <button @click="onlyAlbums=!onlyAlbums;onlyEps=false;onlySingles=false;" class="px-3 py-2 border rounded" :class="onlyAlbums ? 'border-red-500 text-red-500 font-semibold border-2':''">
                            Album
                        </button>
                    </li>
                    <li>
                        <button @click="onlyEps=!onlyEps;onlyAlbums=false;onlySingles=false;" class="px-3 py-2 border rounded" :class="onlyEps ? 'border-red-500 text-red-500 font-semibold border-2':''">
                            EP
                        </button>
                    </li>
                    <li>
                        <button @click="onlySingles=!onlySingles;onlyAlbums=false;onlyEps=false;" class="px-3 py-2 border rounded" :class="onlySingles ? 'border-red-500 text-red-500 font-semibold border-2':''">
                            Single
                        </button>
                    </li>
                </ul>
            </div>
            <div class="flex flex-wrap gap-7 max-w-[110rem]">
                <LazyReleaseCard
                    v-for="release in filteredList"
                    :release="release"
                    :key="release.id"
                    displayDate
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {

        head() {
            return {
                title: "Comeback - Calendar",
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: "Find all the artists' releases by day and according to your preferences.",
                    }
                ]
            }
        },

        data(){
            return {
                startDate: null,
                endDate: null,
                releaseList: [],
                onlyAlbums: false,
                onlyEps: false,
                onlySingles: false,
                currentYear: new Date().getFullYear(),
                currentMonth: new Date().getMonth(),
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            }
        },
        

        created(){
            this.startDate = new Date(this.currentYear, this.currentMonth, 1);
            this.endDate = new Date(this.currentYear, this.currentMonth + 1, 0);
            this.fetchData()
        },
        
        computed: {
            filteredList() {
                return this.releaseList.filter(element => {
                    if(this.onlyAlbums && element.type.toLowerCase() !== 'album') return false
                    if(this.onlyEps && element.type.toLowerCase() !== 'ep') return false
                    if(this.onlySingles && element.type.toLowerCase() !== 'single') return false
                    return true
                })
            }
        },

        methods:{

            dateFormat(d){
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
                return `${mo}/${da}/${ye}`
            },

            async fetchData() {
                this.releaseList = []
                this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
                    if(Object.entries(response.data).length) {
                        for(let [key, value] of Object.entries(response.data)) {
                            if(value.releases) {
                                this.releaseList = this.releaseList.concat(value.releases)
                                this.releaseList = [...new Set(this.releaseList, value.releases)]
                                this.releaseList.sort(function(a,b){
                                    if(a.date?.toLowerCase() > b.date?.toLowerCase()) {return -1}
                                    if(a.date?.toLowerCase() < b.date?.toLowerCase()) {return 1}
                                    return 0;
                                })
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },

            changeMonth(month) {
                if(month < 0) {
                    this.currentMonth = 11
                    this.currentYear--
                } else if(month > 11) {
                    this.currentMonth = 0
                    this.currentYear++
                } else {
                    this.currentMonth = month
                }
                this.startDate = new Date(this.currentYear, this.currentMonth, 1);
                this.endDate = new Date(this.currentYear, this.currentMonth + 1, 0);
                this.fetchData()
            },

            changeYear(year) {
                this.startDate = new Date(year, this.currentMonth, 1);
                this.endDate = new Date(year, this.currentMonth + 1, 0);
                this.currentYear = year
                this.fetchData()
            },
        },
    }
</script>