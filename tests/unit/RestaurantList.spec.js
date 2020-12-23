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

  const mountWithStore = (state = {records, loading: false}) => {
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

  it('displays the loading indicator while loading', () => {
    mountWithStore({loading: true});
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
      true,
    );
  });

  describe('when loading succeds', () => {
    beforeEach(() => {
      mountWithStore();
    });
    it('loads the restaurants', () => {
      expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
      expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
    });

    it('does not display the loading indicator while not loading', () => {
      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
        false,
      );
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      mountWithStore({loadError: true});
    });

    it('displays the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(true);
    });
  });
});
