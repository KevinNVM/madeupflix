<template>
  <router-link
    to="#"
    class="relative inline-block mx-2 mb-6 bg-black w-80 sm:w-96 group rounded-xl snap-center"
    v-for="(row, i) in items"
    :key="i"
    :title="row.title"
  >

    <object :data="row.image" type="image/jpg" class="absolute inset-0 w-full h-full transition-opacity opacity-75 sm:group-hover:opacity-50 group-focus:opacity-50 rounded-xl">
      <img src="https://w0.peakpx.com/wallpaper/750/903/HD-wallpaper-anime-error.jpg" class="object-fill"  />
    </object>


    <div class="relative p-8">
      <p
        class="flex items-center gap-1 text-sm font-semibold tracking-widest text-transparent uppercase bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-400"
      >
        <svg
          v-show="row.status == 'COMPLETED'"
          class="w-6 h-6 stroke-teal-300"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>

        {{ row.status }}
      </p>

      <p class="text-xl font-bold text-white line-clamp-2">
        {{ row.title }}
      </p>
      <p class="text-sm font-bold text-gray-300 line-clamp-1">
        {{
          row.altTitles
            ? row.altTitles
                .map((el) => el["ja"] || el["ko"] || el["ja-ro"] || el["en"])
                .join(" ")
            : ""
        }}
      </p>

      <div class="mt-64">
        <div
          class="flex flex-col gap-2 transition-all transform sm:group-hover:opacity-100 sm:translate-y-8 sm:opacity-0 group-hover:translate-y-0"
        >
          <p>
            <span class="kbd kbd-sm">{{ row.releaseDate }}</span>
          </p>
          <p
            class="text-sm text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-indigo-200"
          >
            <span class="block font-bold">Description</span>
            <pre>{{ row.description }}</pre>
          </p>

          <slot></slot>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "MangaRows",
  props: {
    items: Array,
  },
};
</script>

<style>
</style>