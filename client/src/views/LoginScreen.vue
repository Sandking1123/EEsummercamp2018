<template>
  <div id="wrapper">
    <h1>{{ appTitle }}</h1>
    <br>
    <h2>To continue using this app please log in</h2>
    <br>
    <div id="button-container">
      <button>Login<img src="../assets/google_plus.png" align="right"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login-screen',
  data() {
    return {
      appTitle: 'Test Your Knowledge'
    };
  }
};
</script>
 <style>
 #wrapper {
  padding-top: 200px;
}
 #button-container {
  margin: 0 auto;
  width: 240px;
}
 button{
  background: #F2F2F2;
  padding: 20px;
  width: 70%;
  font-size: 25px;
  border-image-source: none;
}
 img{
  display: block;
  max-width: 35px;
  max-height: 35px;
  width: auto;
  height: auto;
}
 </style>
