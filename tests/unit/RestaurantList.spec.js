import Vue from 'vue';
import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';
import Vuetify from 'vuetify';

const findByTestId = (wrapper, testId, index) =>
  wrapper.findAll(`[data-testid=${testId}]`).at(index);

describe('RestaurantList', () => {
  // https://github.com/vuetifyjs/vuetify/discussions/4068#discussioncomment-24984
  Vue.use(Vuetify);

  // have some dummy records
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let wrapper;
  let restaurantModule;

  const mountWithStore = (state = {records}) => {
    // mock the store module

    restaurantModule = {
      namespaced: true,
      state,
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

    // create wrapper
    wrapper = mount(RestaurantList, {
      localVue,
      store,
    });
  };

  it('loads restaurants on mount', () => {
    mountWithStore();

    expect(restaurantModule.actions.load).toHaveBeenCalled();
  });

  it('loads the restaurants', () => {
    mountWithStore();

    expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
    expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
  });
});
