<template>
  <div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      data-testid="loading-indicator"
    ></v-progress-circular>
    <v-list-item-content
      data-testid="restaurant"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      ><v-list-item-title>{{
        restaurant.name
      }}</v-list-item-title></v-list-item-content
    >
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'RestaurantList',
  methods: mapActions({
    loadRestaurants: 'restaurants/load',
  }),
  computed: mapState({
    restaurants: state => state.restaurants.records,
    loading: state => state.restaurants.loading,
  }),
  mounted() {
    this.loadRestaurants();
  },
};
</script>
