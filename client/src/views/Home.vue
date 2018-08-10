<template>
  <div class="wrapper">

    <h1 class="title">{{ msg }}</h1>
    <br> <br>
    <h2 class="continue">To continue using this app please log in</h2>
    <br> <br>
    <div class="button-container">
      <button>Login<img width="50" height="50" src="./assets/google_plus.png" align="right"> </button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Test Your Knowledge'
    };
  }
};
</script>

<style>

.wrapper {
  padding-top: 200px;
}

.button-container {
  margin: 0 auto;
  width: 240px;
}

button{
  background: #F2F2F2;
  padding: 20px;
  width: 70%;
  color: black;
  font-family: Segoe UI;
  font-style: Regular;
  text-align: center;
  font-size: 25px;
  border-image-source: none;
}

.title{
  color: black;
  font-family: Segoe UI;
  font-style: Regular;
  text-align: center;
}

.continue{
  color: black;
  font-family: Segoe UI;
  font-style: Regular;
  text-align: center;
}

img{
  display: block;
  max-width: 35px;
  max-height: 35px;
  width: auto;
  height: auto;
}

</style>
