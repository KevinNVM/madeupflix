<template>
  <router-link
    to="#"
    class="relative inline-block mx-2 mb-6 bg-black  w-80 sm:w-96 group rounded-xl snap-center"
    v-for="(row, i) in items"
    :key="i"
    :title="row.title"
  >
    <img
      alt="Developer"
      :src="row.image"
      class="absolute inset-0 object-fill w-full h-full transition-opacity opacity-75  sm:group-hover:opacity-50 group-focus:opacity-50 rounded-xl"
    />

    <div class="relative p-8">
      <p
        class="flex items-center gap-1 text-sm font-semibold tracking-widest text-transparent uppercase  bg-clip-text bg-gradient-to-r"
        :class="
          row.status == 'FINISHED'
            ? 'from-teal-500 to-indigo-400'
            : 'from-indigo-400 to-teal-500'
        "
      >
        <svg
          v-show="row.status == 'FINISHED'"
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
        {{ row.title }}
      </p>

      <div class="mt-64">
        <div
          class="flex flex-col gap-2 transition-all transform  sm:group-hover:opacity-100 sm:translate-y-8 sm:opacity-0 group-hover:translate-y-0"
        >
          <p>
            <span class="kbd kbd-sm">{{ row.type }}</span>
          </p>
          <p
            class="text-sm text-transparent  bg-clip-text bg-gradient-to-r from-teal-200 to-indigo-200"
          >
            <span class="block font-bold">Genre</span>
            {{ row.genres.join(", ") }}
          </p>

          <p
            class="text-sm text-transparent  bg-clip-text bg-gradient-to-r from-teal-200 to-indigo-200"
          >
            <span class="block font-bold">Description</span>
            <span class="line-clamp-3"> {{ row.description }} </span>
          </p>

          <slot></slot>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "AnimeRows",
  props: {
    items: Array,
  },
};
</script>

<style>
</style>