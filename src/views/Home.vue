<template lang="pug">
v-app#inspire
  v-navigation-drawer(v-model='drawer' app='' clipped='')
    v-list(dense='')
      v-list-item
        v-list-item-action
          v-icon mdi-view-dashboard
        v-list-item-content
          v-list-item-title Dashboard
      v-list-item
        v-list-item-action
          v-icon mdi-settings
        v-list-item-content
          v-list-item-title Settings
  v-app-bar(app='' clipped-left='')
    v-app-bar-nav-icon(@click.stop='drawer = !drawer')
    v-toolbar-title Application
  v-content
    v-container.fill-height(fluid='')
      v-row(align='center' justify='center')
        v-col
          .home
            CityWeather
  v-footer(app='')
    span &copy; 2019
</template>

<script>
import CityWeather from "@/components/CityWeather.vue";

export default {
  components: {
    CityWeather
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
