<template>
  <HeroSection />
  <section class="home">
    <div id="top-airing" class="py-2 pl-4 md:px-8">
      <div class="my-8 text-xl font-semibold text-indigo-400 divider">
        Top Airing
      </div>
      <div class="overflow-x-auto whitespace-nowrap">
        <div
          class="inline-block w-48 mr-8 card"
          v-for="(anime, i) in top_airing.results"
          :key="i"
        >
          <div>
            <div class="card-image-container">
              <router-link to="/" class="transition duration-300 origin-center">
                <img :src="anime.image" class="w-full card-image" />
              </router-link>
            </div>
            <div class="py-1 card-content">
              <h1
                class="h-16 py-1 text-lg font-semibold text-center line-clamp-2"
                :title="anime.title"
              >
                <router-link
                  to="/"
                  class="transition duration-300 hover:text-indigo-500"
                  >{{ anime.title }}</router-link
                >
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="grid md:grid-cols-[80%_20%] w-full h-64">
        <div class="p-4 bg-red-300">
          <!-- Card -->

          <div class="w-64 card">
            <div class="card-image-container">
              <img
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx106918-4T0AdnCg8d64.jpg"
                class="card-image"
                width="250"
              />
            </div>
            <div class="px-2 py-1 card-content">
              <h1
                class="py-1 text-lg font-semibold text-center line-clamp-3"
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
                ipsam molestias. Iste maiores, sint alias, quasi, ullam animi
                excepturi distinctio ipsam iure deleniti reiciendis placeat
                cumque soluta modi aliquid similique!"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
                ipsam molestias. Iste maiores, sint alias, quasi, ullam animi
                excepturi distinctio ipsam iure deleniti reiciendis placeat
                cumque soluta modi aliquid similique!
              </h1>
            </div>
          </div>

          <!-- Card -->
        </div>
        <div class="bg-amber-300"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { toObject } from "@/modules/toObject";

import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "HomeView",
  data() {
    return {
      top_airing: {},
    };
  },
  components: { HeroSection },
  methods: {
    async getTopAiring() {
      try {
        const response = await fetch(
          "https://api.consumet.org/anime/gogoanime/top-airing"
        );
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    this.top_airing = await this.getTopAiring();
    console.log(toObject(this.top_airing));
  },
};
</script>
