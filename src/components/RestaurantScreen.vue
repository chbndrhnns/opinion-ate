<template>
  <div>
    <h1>RestaurantScreen</h1>
    <restaurant-list />
  </div>
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
