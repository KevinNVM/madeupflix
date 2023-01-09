<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { clear } from "idb-keyval";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import { getSettings } from "./modules/userSettings";

export default {
  name: "App",
  data() {
    return {
      userSettings: getSettings() || {},
    };
  },
  components: { Navbar, Footer },
  mounted() {
    window.clearCache = () => {
      clear();
    };
  },
};
</script>