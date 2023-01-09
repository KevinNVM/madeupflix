<template>
  <div
    class="min-h-screen hero"
    :style="`background-image: url('${heroContent.image}'); background-size: cover; background-position: center top`"
  >
    <div
      class=" hero-overlay bg-opacity-60 bg-gradient-to-t from-primary to-black/0"
    ></div>
    <div class="hero-content">
      <figure class="max-w-screen-md mx-auto text-center">
        <svg
          aria-hidden="true"
          class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p class="text-2xl italic font-medium text-white">
            "{{ heroContent.quotes.english }}"
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center mt-6 space-x-3">
          <div
            class="flex items-center divide-x-2 divide-gray-500  dark:divide-gray-700"
          >
            <cite class="pr-3 font-medium text-white">{{
              heroContent.quotes.character
            }}</cite>
            <cite
              class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"
            >
              <a
                target="_blank"
                :href="`https://myanimelist.net/anime.php?q=${heroContent.quotes.anime}&cat=anime`"
                >{{ heroContent.quotes.anime }}</a
              >
            </cite>
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
// import { toObject } from "@/modules/toObject";
import {
  deleteHeroSection,
  getHeroSection,
  setHeroSection,
} from "@/store/heroSection";

export default {
  name: "HeroSection",
  // props: {
  //   animeName: {
  //     type: String,
  //     default: "bleach",
  //   },
  // },
  data() {
    return {
      heroContent: {
        image: "",
        quotes: {},
      },
    };
  },
  methods: {
    async getHeroImage() {
      let res = await fetch(`https://api.waifu.pics/sfw/waifu`);
      let data = await res.json();
      return data.url;
    },
    async getHeroQuotes() {
      let res = await fetch(`https://katanime.vercel.app/api/getrandom`);
      let data = await res.json();
      if (!data.sukses) return false;
      return data.result;
    },
    async updateHeroContent() {
      let exist = await getHeroSection();
      if (
        JSON.stringify(exist) == "{}" ||
        this.heroContent.expired_at > new Date()
      )
        setHeroSection({
          image: await this.getHeroImage(),
          quotes: (await this.getHeroQuotes())[0],
        });
      this.heroContent = await getHeroSection();
    },
  },
  async mounted() {
    await this.updateHeroContent();
  },
};
</script>

<style>
</style>