<template>
  <Navbar />
  <main>
    <router-view />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { getSettings } from "./modules/userSettings";

export default {
  name: "App",
  data() {
    return {
      userSettings: getSettings() || {},
    };
  },
  components: { Navbar },
  mounted() {
    console.log(this.userSettings);
  },
};
</script>