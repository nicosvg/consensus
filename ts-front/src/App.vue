<template>
  <div id="app">
    <div id="nav">
      <div class="logo" @click="$router.push({ name: 'Home' })">Consensus</div>
      <div class="links">
        <router-link to="/elections/create">Create</router-link>
        <router-link to="/elections/search">Participate</router-link>
      </div>
    </div>
    <router-view class="view" />
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
export default {
  components: { Footer }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#nav {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  #nav {
    display: none;
  }
}

#nav a {
  margin-left: 16px;
  font-weight: bold;
  color: var(--primary);
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  font-family: "Delius Swash Caps", cursive;
  color: var(--primary);
  font-size: 2em;
  cursor: pointer;
}

.view {
  min-height: calc(100vh - 153px);
}
</style>
