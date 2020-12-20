<template>
  <div>RestaurantList</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'RestaurantList',
  methods: mapActions({
    loadRestaurants: 'restaurants/load',
  }),
  mounted() {
    this.loadRestaurants();
  },
};
</script>
