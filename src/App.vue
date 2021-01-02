<template>
  <v-app>
    <v-app-bar color="primary" fixed app>
      <v-toolbar-title>Opinion Ate</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <RestaurantScreen />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RestaurantScreen from '@/components/RestaurantScreen';
export default {
  name: 'App',
  components: {
    RestaurantScreen,
  },
};
</script>
