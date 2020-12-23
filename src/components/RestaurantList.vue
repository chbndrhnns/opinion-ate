<template>
  <ul>
    <li
      data-testid="restaurant"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
    >
      {{ restaurant.name }}
    </li>
  </ul>
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
  }),
  mounted() {
    this.loadRestaurants();
  },
};
</script>
