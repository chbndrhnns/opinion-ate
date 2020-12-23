<template>
  <form>
    <v-text-field
      placeholder="Add restaurant"
      filled
      type="text"
    ></v-text-field>
    <v-btn color="primary" class="black--text">Add</v-btn>
  </form>
</template>

<script>
export default {
  name: 'NewRestaurantForm',
};
</script>
