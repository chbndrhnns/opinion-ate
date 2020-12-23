const restaurants = (api, stateOverrides) => ({
  namespaced: true,
  state: {
    records: [],
    loading: false,
    loadError: false,
    ...stateOverrides,
  },
  actions: {
    create({commit}, newRestaurantName) {
      api.createRestaurant(newRestaurantName).then(record => {
        commit('addRecord', record);
      });
    },
    load({commit}) {
      commit('startLoading');
      api
        .loadRestaurants()
        .then(records => {
          commit('storeRecords', records);
        })
        .catch(() => {
          commit('recordLoadingError');
        });
    },
  },
  mutations: {
    startLoading(state) {
      state.loadError = false;
      state.loading = true;
    },
    recordLoadingError(state) {
      state.loading = false;
      state.loadError = true;
    },
    storeRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
    addRecord(state, record) {
      state.records.push(record);
    },
  },
});

export default restaurants;
