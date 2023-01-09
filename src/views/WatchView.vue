<template>
  <div class="pt-16 watch">
    <div class="flex flex-col items-center justify-center gap-8">
      <div class="title">
        <h1 class="font-bold text-center lg:text-3xl">Watch {{ title }}</h1>
      </div>

      <VideoPlayer
        class="w-full lg:w-3/4"
        :title="title"
        :source="source"
        v-if="!loading"
      />
      <div class="flex justify-between">
        <div>
          <a :href="download" target="_blank" rel="noopener noreferrer">
            <button title="download" class="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import _ from "lodash";

export default {
  components: { VideoPlayer },
  data() {
    return {
      title: "",
      download: "",
      loading: true,
    };
  },
  methods: {
    async getStreamingInfo() {
      const response = await fetch(
        `https://api.consumet.org/anime/gogoanime/watch/${this.$route.params.epsId}`
      );
      const result = await response.json();
      this.loading = false;

      let r = result.sources.find((el) => el.quality == "default");
      if (!r) return;
      this.source = [{ src: r.url, resolution: "default" }];

      return result;
    },
  },
  async created() {
    let rawSrc = await this.getStreamingInfo();
    this.download = rawSrc.download;
    this.title = this.$route.params.epsId
      .split("-")
      .join(" ")
      .replace(/\w+/g, _.capitalize);
  },
};
</script>

<style>
</style>