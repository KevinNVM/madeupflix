<template>
  <div class="details">
    <section class="overflow-hidden text-gray-400 body-font">
      <div class="container flex flex-col justify-center px-5 py-24 mx-auto">
        <div class="flex flex-wrap justify-between mx-auto lg:w-4/5">
          <div class="order-2 w-full mb-6 lg:order-1 lg:w-1/2 lg:py-6 lg:mb-0">
            <h2
              class="text-sm tracking-widest text-gray-500 uppercase  title-font line-clamp-1"
            >
              {{ anime.id }}
            </h2>
            <h1 class="mb-4 text-3xl font-medium text-white title-font">
              {{ anime.title }}
            </h1>
            <div class="flex mb-4" id="tabs">
              <button
                @click="changeTab"
                name="btn-tab-description"
                class="flex justify-center flex-grow px-1 py-2 text-lg text-indigo-400 border-b-2 border-indigo-500 "
              >
                Description
              </button>
              <label
                type="button"
                for="reviews-modal"
                class="flex justify-center flex-grow px-1 py-2 text-lg border-b-2 border-gray-800 cursor-pointer "
              >
                Reviews
              </label>
            </div>
            <div class="tabs-content">
              <div class="tab-description">
                <div class="flex flex-col gap-4 mb-4 leading-relaxed">
                  <p>{{ anime.description }}</p>

                  <p class="text-sm" v-if="anime.otherName">
                    Other Name : <br />{{ anime.otherName }}
                  </p>
                </div>
                <div class="flex flex-wrap py-2 border-t border-gray-800">
                  <span class="text-gray-500">Genre</span>
                  <span class="ml-auto text-white line-clamp-1">{{
                    anime.genres ? anime.genres.join(", ") : ""
                  }}</span>
                </div>
                <div class="flex py-2 border-t border-gray-800">
                  <span class="text-gray-500">Type</span>
                  <span class="ml-auto text-white">{{ anime.type }}</span>
                </div>
                <div class="flex py-2 mb-6 border-t border-b border-gray-800">
                  <span class="text-gray-500">Status</span>
                  <span class="ml-auto text-white">{{ anime.status }}</span>
                </div>
              </div>
            </div>
            <div class="flex">
              <span class="text-2xl font-medium text-white title-font">{{
                anime.releaseDate
              }}</span>
              <button
                class="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded  focus:outline-none hover:bg-indigo-600"
              >
                {{ anime.totalEpisodes }} Episodes
              </button>
              <button
                class="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-800 border-0 rounded-full "
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <img
            alt="Anime Thumbnail"
            class="order-1 object-contain w-full max-w-sm mx-auto mt-4  rounded-xl lg:mx-0 lg:order-2 lg:rounded-xl lg:mt-0"
            :src="anime.image"
          />
        </div>
        <div>
          <div class="divider">Episodes List</div>
          <small class="text-gray-700"
            >Showing
            {{ anime.episodes ? anime.episodes.length : 0 }} episodes</small
          >

          <div class="flex justify-center w-full">
            <ul
              class="w-full max-w-xl p-2 overflow-y-auto  h-80 menu bg-base-100 rounded-box scrollbar"
            >
              <li>
                <router-link
                  :to="`/watch/${episode.id}`"
                  v-for="episode in anime.episodes"
                  :key="episode.id"
                  class="font-semibold text-md"
                >
                  Episodes {{ episode.number }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- Reviews Modal -->
    <input type="checkbox" id="reviews-modal" class="modal-toggle" />
    <label for="reviews-modal" class="modal modal-bottom sm:modal-middle">
      <label for="" class="relative modal-box">
        <label
          for="reviews-modal"
          class="absolute btn btn-sm btn-circle right-2 top-2"
          >✕</label
        >
        <h3 class="text-lg font-bold">Reviews</h3>
        <div class="py-4 modal-content">
          <p class="italic reviews-empty">
            There are currently no reviews for this anime
          </p>
        </div>
      </label>
    </label>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // components data
      anime: {},

      // element data
    };
  },
  methods: {
    async getAnimeDetails() {
      const response = await fetch(
        `https://api.consumet.org/anime/gogoanime/info/${this.$route.params.animeId}`
      );
      const data = await response.json();
      return data;
    },
  },
  async created() {
    this.anime = await this.getAnimeDetails();
  },
};
</script>

<style>
</style>