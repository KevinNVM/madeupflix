<template>
  <div
    class="fixed z-50 transition-all duration-300 navbar bg-primary"
    :class="
      showNavbar
        ? 'bg-opacity-75 backdrop-blur-sm drop-shadow-sm'
        : 'bg-opacity-0 backdrop-blur-none'
    "
  >
    <div class="navbar-start">
      <button
        @click="$router.push({ name: 'search' })"
        class="btn btn-ghost btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
    <div class="navbar-center">
      <button
        @click="$router.go(-1)"
        class="text-2xl font-extrabold text-transparent normal-case  btn btn-ghost md:text-3xl bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500"
      >
        MadeupFlix
      </button>
    </div>

    <div class="navbar-end">
      <div class="dropdown dropdown-left dropdown-bottom">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="p-2 mt-3 bg-opacity-75 shadow  menu menu-compact dropdown-content bg-base-200 backdrop-blur-sm rounded-box w-52"
        >
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
          <li>
            <a>{{ time }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Navbar",
  data() {
    return {
      showNavbar: false,
      interval: null,
      time: null,
    };
  },
  methods: {
    checkNavbar() {
            window.onscroll = () => {
                var pageOffset = document.documentElement.scrollTop || document.body.scrollTop;
                this.showNavbar = pageOffset > 50;
            };
        },
    // prettier-ignore
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  mounted() {
    this.checkNavbar();
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    });
  },
  components: { router },
};
</script>

<style>
</style>