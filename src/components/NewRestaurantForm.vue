<template>
  <form @submit.prevent="handleSave">
    <v-alert
      type="error"
      v-if="validationError"
      data-testid="new-restaurant-name-error"
      :icon="false"
      >Name is required.</v-alert
    >
    <v-alert
      type="error"
      v-if="serverError"
      data-testid="new-restaurant-server-error"
      :icon="false"
      >The restaurant could not be saved. Please try again.</v-alert
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
      validationError: false,
      serverError: false,
    };
  },
  methods: {
    ...mapActions({
      createRestaurant: 'restaurants/create',
    }),
    handleSave() {
      if (this.name) {
        this.serverError = false;
        this.validationError = false;
        this.createRestaurant(this.name)
          .then(() => {
            this.name = '';
          })
          .catch(() => {
            this.serverError = true;
          });
      } else {
        this.validationError = true;
      }
    },
  },
};
</script>
