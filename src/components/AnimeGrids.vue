<template>
  <div
    class="grid grid-cols-2 align-middle  sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 place-items-center gap-x-4"
  >
    <TransitionGroup name="nested">
      <div
        class="w-36 sm:w-40 md:w-48 card"
        v-for="(anime, i) in items"
        :key="i"
      >
        <div>
          <div class="card-image-container">
            <router-link
              :to="`/${anime.id}`"
              class="transition duration-300 origin-center"
            >
              <img
                :src="anime.image"
                :title="anime.title"
                class="w-full card-image"
              />
            </router-link>
          </div>
          <div class="relative pb-4 card-content">
            <div v-if="showDetails">
              <span class="text-sm text-center text-gray-500 line-clamp-1">{{
                anime.id
              }}</span>
              <p class="font-semibold text-center text-gray-400 latest-eps">
                Episode {{ anime.episodeNumber }}
              </p>
            </div>
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
          <span
            v-if="anime.title.toLowerCase().includes('dub')"
            class="
              small-info
              bg-indigo-100
              text-indigo-800 text-xs
              font-medium
              mr-2
              px-2.5
              py-0.5
              rounded-tl-xl rounded-br-xl
              dark:bg-indigo-900 dark:text-indigo-300
              bg-opacity-60
              dark:bg-opacity-60
              backdrop-blur-sm
              uppercase
              absolute
              top-0
              left-0
              z-50
            "
          >
            {{ anime.title.toLowerCase().includes("dub") ? "DUB" : "" }}
          </span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: "AnimeGrids",
  props: ["items", "showDetails"],
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