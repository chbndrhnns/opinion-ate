import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

const findByTestId = (wrapper, testId, index) =>
  wrapper.findAll(`[data-testid=${testId}]`).at(index);

describe('RestaurantList', () => {
  // have some dummy records
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let wrapper;
  let restaurantModule;

  beforeEach(() => {
    // mock the store module
    restaurantModule = {
      namespaced: true,
      state: {records},
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
  });

  it('loads restaurants on mount', () => {
    expect(restaurantModule.actions.load).toHaveBeenCalled();
  });

  it('loads the restaurants', () => {
    expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
    expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
  });
});
