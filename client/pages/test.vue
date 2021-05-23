<template>
    <div>
      <v-date-picker
          mode="dateTime"
          v-model="dates"
          :timezone="timezone"
          color="red"
          is-dark
          is-expanded
      />
      <div class="w-full mt-4">
          <div class="flex justify-between w-full">
          <span class="text-sm font-bold text-white">-11:00</span>
          <span class="text-sm font-bold text-white">UTC</span>
          <span class="text-sm font-bold text-white">+11:00</span>
          </div>
          <input
          class="w-full"
          type="range"
          min="0"
          :max="timezones.length - 1"
          v-model="timezoneIndex"
          />
          <div class="flex">
            <span class="font-semibold text-gray-600 mr-2">Timezone:</span>
            <span class="text-white">{{ timezone }}</span>
          </div>
          <div class="flex">
            <span class="font-semibold text-gray-600 mr-2">GMT Zone:</span>
            <span class="text-white">{{ gmtzone }}</span>
          </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        dates: new Date(),
        timezoneIndex: 11,
        timezones: [
          'Pacific/Niue', // -11
          'US/Hawaii', // -10
          'America/Anchorage', // -9
          'America/Los_Angeles', // -8
          'America/Boise', // -7
          'America/Chicago', // -6
          'America/New_York', // -5
          'America/Aruba', // -4
          'America/Buenos_Aires', // -3
          'Brazil/DeNoronha', // -2,
          'Atlantic/Azores', // -1
          'UTC', // 0
          'Europe/Amsterdam', // +1
          'Europe/Athens', // +2
          'Europe/Moscow', // +3
          'Indian/Mahe', // +4
          'Asia/Ashgabat', // +5
          'Asia/Dhaka', // +6
          'Asia/Bangkok', // +7
          'Asia/Hong_Kong', // +8
          'Asia/Seoul', // +9
          'Australia/Sydney', // +10
          'Asia/Magadan', // +11
        ],
        gmtzones: [
          'GMT-11',
          'GMT-10',
          'GMT-9',
          'GMT-8',
          'GMT-7',
          'GMT-6',
          'GMT-5',
          'GMT-4',
          'GMT-3',
          'GMT-2',
          'GMT-1',
          'GMT+0',
          'GMT+1',
          'GMT+2',
          'GMT+3',
          'GMT+4',
          'GMT+5',
          'GMT+6',
          'GMT+7',
          'GMT+8',
          'GMT+9',
          'GMT+10',
          'GMT+11',
        ],
      };
    },

    computed: {
      timezone() {
        return this.timezones[this.timezoneIndex];
      },
      gmtzone() {
        return this.gmtzones[this.timezoneIndex];
      },
    },
  };
</script>