<template>
  <div class="player-container">
    <vue3-video-player
      @play="onPlay"
      :title="title"
      :src="source"
      :core="HLSCore"
      resolution="default"
    ></vue3-video-player>
  </div>
</template>

<script>
import HLSCore from "@cloudgeek/playcore-hls";

export default {
  name: "VideoPlayer",
  props: ["source", "title"],
  data() {
    return {
      HLSCore,
    };
  },
  methods: {
    onPlay() {
      console.log("Playing Video Player");
    },
  },
  created() {
    console.log(this.source);
  },
};
</script>

<style>
</style>