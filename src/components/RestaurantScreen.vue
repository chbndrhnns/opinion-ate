<template>
  <v-card>
    <v-card-title>Restaurants</v-card-title>
    <v-card-text>
      <restaurant-list />
    </v-card-text>
  </v-card>
</template>

<script>
import RestaurantList from './RestaurantList.vue';
export default {
  name: 'RestaurantScreen',
  components: {
    RestaurantList,
  },
};
</script>
