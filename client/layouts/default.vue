<template>
  <div class="grid grid-cols-7">
    <SideBar class=" leftbar col-start-1 col-end-3 2xl:col-end-2 relative min-h-screen max-h-screen overflow-hidden overflow-y-visible"/>
    <div class="leftbar col-start-3 2xl:col-start-2 col-end-8 overflow-hidden overflow-y-visible relative max-h-screen">
      <Nuxt />
    </div>
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #1F1D1D;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track-piece {
  background-color: #000000; /* color of the scroll thumb */
  opacity: 50%;
}

::-webkit-scrollbar-thumb {
  background-color: #E1E1E1; /* color of the scroll thumb */
  border-radius: 50px; /* roundness of the scroll thumb */
}
</style>
