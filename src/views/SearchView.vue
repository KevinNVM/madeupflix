<template>
  <div class="details">
    <section class="overflow-hidden text-gray-400 body-font">
      <div class="container px-5 py-24 mx-auto">
        <form
          @submit.prevent="searchAnime"
          class="relative pt-2 mx-auto mb-4 text-gray-600"
          ref="formSearch"
        >
          <input
            class="w-full h-10 px-5 pr-16 bg-white rounded-lg  lg:mx-6 focus:outline-none focus:ring-4 ring-indigo-500/50 caret-indigo-400"
            type="search"
            autocomplete="off"
            name="search"
            placeholder="Search"
            @input="debounceSearchAnime"
            v-model="searchParameter"
          />
          <button type="submit" class="absolute top-0 right-0 mt-5 mr-4">
            <svg
              class="w-4 h-4 text-gray-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style="enable-background: new 0 0 56.966 56.966"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </form>
        <div id="search-results" class="py-2 md:px-8">
          <TransitionGroup name="nested">
            <div v-if="searchParameter">
              <p class="px-4 font-semibold text-gray-600">
                Showing
                {{ search_results.results ? search_results.results.length : 0 }}
                result(s) for: "{{ searchParameter }}"
              </p>
              <button
                @click="resetSearch"
                class="px-4 pb-4 font-semibold text-gray-600 underline transition-all duration-300  underline-offset-2 hover:text-white/60 hover:no-underline"
              >
                Clear Search
              </button>
            </div>
          </TransitionGroup>

          <AnimeGrids
            :items="search_results.results"
            :showDetails="!!searchParameter"
          />

          <div class="grid w-full my-4 place-items-center pagination">
            <button
              class="btn btn-outline"
              @click="search_results_load_more"
              :disabled="!search_results.hasNextPage"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AnimeGrids from "@/components/AnimeGrids.vue";
import { toObject } from "@/modules/toObject";

export default {
  data() {
    return {
      search_results: {},
      searchParameter: "",
    };
  },
  components: { AnimeGrids },
  methods: {
    async search_results_load_more() {
      if (!this.search_results.hasNextPage) return false;
      let res = await this.getSearchAnime(
        parseInt(this.search_results.currentPage) + 1
      );
      let oldResults = [...this.search_results.results];
      this.search_results = {
        ...res,
        results: [...oldResults, ...res.results],
      };

      console.log(toObject(res), toObject(this.recently_updated));
    },
    async getSearchAnime(page = 1) {
      console.log(
        "searched anime with param:",
        this.searchParameter,
        "on page:",
        page
      );
      try {
        const response = await fetch(
          `https://api.consumet.org/anime/gogoanime/${
            this.searchParameter || '" a "'
          }?page=${page}`
        );
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    debounceSearchAnime() {
      this.typing = "You are typing";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchAnime();
      }, 600);
    },
    async searchAnime(page = 1) {
      this.search_results = await this.getSearchAnime(page);
    },
  },
  async created() {
    this.search_results = await this.getSearchAnime();
  },
};
</script>


<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>