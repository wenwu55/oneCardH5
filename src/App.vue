<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f2f2f2;
  min-height: 100%;
}
html, body {
	height: 100%;
	overflow: auto;
}
body {
  margin: 0;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.flex2 {
  flex: 2;
}
.font14 {
  font-size: 14px;
}
.picker-slot {
  font-size: 4px !important
}
.nothing{
  text-align: center;
  padding-top: 40%;
  background-color: #f2f2f2;
}
.nothing > img {
  width: 134px;
}
.nothing > div {
  margin-top: 20px;
  font-size: 15px;
  color: #666666;
}
</style>
