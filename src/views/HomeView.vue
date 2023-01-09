<template>
  <HeroSection />
  <section class="home">
    <div id="top-airing" class="py-2 pl-4 md:px-8">
      <div class="my-8 text-xl font-semibold text-teal-400 divider">
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
              <router-link
                :to="`/${anime.id}`"
                class="transition duration-300 origin-center"
              >
                <img :src="anime.image" class="w-full card-image" />
              </router-link>
            </div>
            <div class="py-1 card-content">
              <h1
                class="h-16 py-1 text-lg font-semibold text-center line-clamp-2"
                :title="anime.title"
              >
                <router-link
                  :to="`/${anime.id}`"
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
      <div class="grid lg:grid-cols-[80%_20%_100%] w-full h-64">
        <div class="p-4">
          <!-- Card -->

          <div class="my-8 text-xl font-semibold text-teal-400 divider">
            <form
              @submit.prevent="searchAnime"
              class="relative pt-2 mx-auto text-gray-600"
              ref="formSearch"
            >
              <input
                class="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg  focus:outline-none"
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
          </div>
          <div id="search-results" class="py-2 md:px-8">
            <TransitionGroup name="nested">
              <div v-if="searchParameter">
                <p class="px-4 font-semibold text-gray-600">
                  Showing
                  {{
                    search_results.results ? search_results.results.length : 0
                  }}
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

          <!-- Section's Divider -->

          <div class="my-8 text-xl font-semibold text-teal-400 divider">
            Recently Updated
          </div>
          <div id="recently-updated" class="py-2 md:px-8">
            <AnimeGrids :items="recently_updated.results" :showDetails="true" />

            <div class="grid w-full my-4 place-items-center pagination">
              <button
                class="btn btn-outline"
                @click="recently_updated_load_more"
                :disabled="!recently_updated.hasNextPage"
              >
                Load More
              </button>
            </div>
          </div>

          <!-- Card -->
        </div>
        <div
          class="p-4 border-t border-l  lg:rounded-tl-xl border-slate-700 border-spacing-y-12"
        >
          <Footer />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * @todo:
 * - fix search anime input // DONE
 * - fix load more search results // DONE
 * - add "showing result to %query%" text // DONE
 */

import AnimeGrids from "@/components/AnimeGrids.vue";
import Footer from "@/components/Footer.vue";
import HeroSection from "@/components/HeroSection.vue";
import { toObject } from "@/modules/toObject";
import { getHomeData, setHomeData } from "@/store/homeSection";

export default {
  data() {
    return {
      // components data

      top_airing: {},
      recently_updated: {},
      search_results: {},

      // element data
      typing: null,
      debounce: null,
      searchParameter: "",
    };
  },
  components: { HeroSection, AnimeGrids, Footer },
  methods: {
    async recently_updated_load_more() {
      if (!this.recently_updated.hasNextPage) return false;
      let res = await this.getRecentlyUpdated({
        page: parseInt(this.recently_updated.currentPage) + 1,
      });
      let oldResults = [...this.recently_updated.results];
      this.recently_updated = {
        ...res,
        results: [...oldResults, ...res.results],
      };

      console.log(toObject(res), toObject(this.recently_updated));
    },
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
    async getTopAiring() {
      try {
        const response = await fetch(
          `https://api.consumet.org/anime/gogoanime/top-airing`
        );
        const result = await response.json();
        if (result.results.length)
          result.results.sort(() => (Math.random() > 0.65 ? 1 : -1));
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    async getRecentlyUpdated(opts = {}) {
      try {
        const response = await fetch(
          `https://api.consumet.org/anime/gogoanime/recent-episodes?page=${
            opts.page || 1
          }`
        );
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
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

        if (result.results.length && !this.searchParameter)
          result.results = this.shuffleArray(result.results);
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    async searchAnime(page = 1) {
      this.search_results = await this.getSearchAnime(page);
    },
    // Helper Methods
    debounceSearchAnime() {
      this.typing = "You are typing";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchAnime();
      }, 600);
    },
    shuffleArray: (arr = []) =>
      [...arr].reduceRight(
        (res, _, __, s) => (
          res.push(s.splice(0 | (Math.random() * s.length), 1)[0]), res
        ),
        []
      ),
    async getPopularAnime(limit = 1) {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?limit=${limit}`
      );
      const data = await response.json();

      return { ...data.data };
    },
    resetSearch() {
      localStorage.setItem("searchParam", "");
      this.searchParameter = "";
      this.searchAnime();
    },
    async updatePage() {
      this.top_airing = await this.getTopAiring();
      this.recently_updated = await this.getRecentlyUpdated();
      this.searchParameter = localStorage.getItem("searchParam") || "";
      this.search_results = await this.getSearchAnime(1);
      await setHomeData({
        top_airing: toObject(this.top_airing),
        recently_updated: toObject(this.recently_updated),
        search_results: toObject(this.search_results),
      });
      return await getHomeData();
    },
  },
  async mounted() {
    const exist = await getHomeData(); // @return = {} or undefined
    if (!exist) {
      this.updatePage();
    } else {
      this.search_results = exist.search_results;
      this.top_airing = exist.top_airing;
      this.recently_updated = exist.recently_updated;
    }
  },

  watch: {
    searchParameter(val) {
      localStorage.setItem("searchParam", val);
      console.log(localStorage.searchParam);
    },
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