import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('load action', () => {
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('initially', () => {
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurants(),
      },
    });

    it('does not have a loading flag set', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });

    it('is not in a error state', () => {
      expect(store.state.restaurants.loadError).toEqual(false);
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

  describe('when loading fails', () => {
    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.reject(),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });
      return store.dispatch('restaurants/load');
    });

    it('sets an error flag', () => {
      expect(store.state.restaurants.loadError).toEqual(true);
    });

    it('clears the loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });

  describe('while loading', () => {
    let store;

    beforeEach(() => {
      const api = {loadRestaurants: () => new Promise(() => {})};
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api, {loadError: true}),
        },
      });
      return store.dispatch('restaurants/load');
    });

    it('sets a loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(true);
    });

    it('clears an error flag', () => {
      expect(store.state.restaurants.loadError).toEqual(false);
    });
  });
});

describe('create action', () => {
  const newRestaurantName = 'Sushi Place';

  let api;
  let store;

  beforeEach(() => {
    api = {
      createRestaurant: jest.fn().mockName('createRestaurant'),
    };
    store = new Vuex.Store({
      modules: {
        restaurants: restaurants(api),
      },
    });
  });
  it('saves the restaurant to the server', () => {
    store.dispatch('restaurants/create', newRestaurantName);
    expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
  });
});
