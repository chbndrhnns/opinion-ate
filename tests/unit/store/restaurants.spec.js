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

  describe('initially', () => {
    it('does not have a loading flag set', () => {
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(),
        },
      });
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });

  describe('when loading succeeds', () => {
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

    it('stores the restaurant', () => {
      expect(store.state.restaurants.records).toEqual(records);
    });

    it('clears the loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });

  describe('while loading', () => {
    it('sets a loading flag', async () => {
      const api = {loadRestaurants: () => new Promise(() => {})};
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });
      store.dispatch('restaurants/load');
      expect(store.state.restaurants.loading).toEqual(true);
    });
  });
});
