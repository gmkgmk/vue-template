<script>
export default {
  name: 'app',
  render() {
    return (
      <main id="app">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </main>
    );
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
