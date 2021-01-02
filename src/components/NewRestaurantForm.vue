<template>
  <form @submit.prevent="handleSave">
    <v-alert type="error" data-testid="new-restaurant-name-error" :icon="false"
      >Name is required.</v-alert
    >
    <v-text-field
      placeholder="Add restaurant"
      data-testid="new-restaurant-name-field"
      v-model="name"
      filled
      type="text"
    ></v-text-field>
    <v-btn
      color="primary"
      type="submit"
      class="black--text"
      data-testid="new-restaurant-submit-button"
      >Add</v-btn
    >
  </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'NewRestaurantForm',
  data() {
    return {
      name: '',
    };
  },
  methods: {
    ...mapActions({
      createRestaurant: 'restaurants/create',
    }),
    handleSave() {
      this.createRestaurant(this.name).then(() => {
        this.name = '';
      });
    },
  },
};
</script>
