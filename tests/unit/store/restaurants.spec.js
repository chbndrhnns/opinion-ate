import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store;

  beforeEach(() => {
    const api = {loadRestaurants: () => Promise.resolve(records)};
    store = new Vuex.Store({
      modules: {
        restaurants: restaurants(api),
      },
    });
    return store.dispatch('restaurants/load');
  });

  describe('when loading succeeds', () => {
    it('stores the restaurant', () => {
      expect(store.state.restaurants.records).toEqual(records);
    });
  });

  describe('while loading', () => {
    it('sets a loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(true);
    });
  });
});
