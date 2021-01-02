<template>
  <v-card>
    <v-card-title>Restaurants</v-card-title>
    <v-card-text>
      <new-restaurant-form></new-restaurant-form>
      <restaurant-list />
    </v-card-text>
  </v-card>
</template>

<script>
import RestaurantList from './RestaurantList.vue';
import NewRestaurantForm from './NewRestaurantForm.vue';
export default {
  name: 'RestaurantScreen',
  components: {
    RestaurantList,
    NewRestaurantForm,
  },
};
</script>
