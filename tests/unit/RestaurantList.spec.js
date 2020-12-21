import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  it('loads restaurants on mount', () => {
    // mock the store module
    const restaurantModule = {
      namespaced: true,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };

    /// create a store and pass in the mocked module
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantModule,
      },
    });

    mount(RestaurantList, {localVue, store});

    expect(restaurantModule.actions.load).toHaveBeenCalled();
  });

  it('loads the restaurants', () => {
    const records = [
      {
        id: 1,
        name: 'Sushi Place',
      },
      {
        id: 2,
        name: 'Pizza Place',
      },
    ];

    const restaurantModule = {
      namespaced: true,
      state: {records},
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantModule,
      },
    });

    const wrapper = mount(RestaurantList, {localVue, store});

    const firstRestaurantName = wrapper
      .findAll('[data-testid="restaurant"]')
      .at(0)
      .text();

    expect(firstRestaurantName).toBe('Sushi Place');

    const secondRestaurantName = wrapper
      .findAll('[data-testid="restaurant"]')
      .at(1)
      .text();

    expect(secondRestaurantName).toBe('Pizza Place');
  });
});
