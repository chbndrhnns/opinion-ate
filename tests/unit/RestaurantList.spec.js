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
});
