import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import NewRestaurantForm from '@/components/NewRestaurantForm';
import flushPromises from 'flush-promises';

Vue.use(Vuetify);

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  const components = {
    serverError: 'new-restaurant-server-error',
    nameError: 'new-restaurant-name-error',
    nameField: 'new-restaurant-name-field',
    submitButton: 'new-restaurant-submit-button',
  };

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  beforeEach(() => {
    restaurantsModule = {
      namespaced: true,
      actions: {
        create: jest.fn().mockName('create'),
      },
    };

    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    const div = document.createElement('div');
    document.body.appendChild(div);
    wrapper = mount(NewRestaurantForm, {
      localVue,
      store,
      attachTo: div,
    });

    afterEach(() => {
      wrapper.destroy();
    });
  });

  describe('initially', () => {
    it('does not display a validation error', () => {
      expect(
        wrapper.find(`[data-testid=${components.nameError}]`).exists(),
      ).toBe(false);
    });

    it('does not display a server error', () => {
      expect(
        wrapper.find(`[data-testid=${components.serverError}]`).exists(),
      ).toBe(false);
    });
  });

  describe('when filled in', () => {
    beforeEach(() => {
      wrapper
        .find(`[data-testid=${components.nameField}]`)
        .setValue(restaurantName);
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
    });
    it('dispatches the create action', () => {
      expect(restaurantsModule.actions.create).toHaveBeenCalledWith(
        expect.anything(),
        restaurantName,
      );
    });
    it('clears the name', () => {
      expect(
        wrapper.find(`[data-testid=${components.nameField}]`).element.value,
      ).toEqual('');
    });
    it('does not display a validation error', () => {
      expect(
        wrapper.find(`[data-testid=${components.nameError}]`).exists(),
      ).toBe(false);
    });

    it('does not display a server error', () => {
      expect(
        wrapper.find(`[data-testid=${components.serverError}]`).exists(),
      ).toBe(false);
    });
  });

  describe('when correcting a validation error', () => {
    beforeEach(() => {
      wrapper.find(`[data-testid=${components.nameField}]`).setValue('');
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
      wrapper
        .find(`[data-testid=${components.nameField}]`)
        .setValue(restaurantName);
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
    });

    it('clears the validation error', () => {
      expect(
        wrapper.find(`[data-testid=${components.nameError}]`).exists(),
      ).toEqual(false);
    });
  });

  describe('when retrying after a server error', () => {
    beforeEach(async () => {
      restaurantsModule.actions.create
        .mockRejectedValueOnce()
        .mockResolvedValueOnce();

      wrapper
        .find(`[data-testid=${components.nameField}]`)
        .setValue('Sushi Place');
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
      await flushPromises();
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
    });

    it('clears the server error', () => {
      expect(
        wrapper.find(`[data-testid=${components.serverError}]`).exists(),
      ).toBe(false);
    });
  });

  describe('when empty', () => {
    beforeEach(() => {
      wrapper.find(`[data-testid=${components.nameField}]`).setValue('');
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
    });

    it('displays a validation error', () => {
      expect(
        wrapper.find(`[data-testid=${components.nameError}]`).text(),
      ).toContain('Name is required');
    });

    it('does not dispatch the create action', () => {
      expect(restaurantsModule.actions.create).not.toHaveBeenCalled();
    });
  });

  describe('when the store action rejects', () => {
    beforeEach(() => {
      restaurantsModule.actions.create.mockRejectedValue();

      wrapper
        .find(`[data-testid=${components.nameField}]`)
        .setValue(restaurantName);
      wrapper.find(`[data-testid=${components.submitButton}]`).trigger('click');
    });

    it('displays a server error', () => {
      expect(
        wrapper.find(`[data-testid=${components.serverError}]`).text(),
      ).toContain('The restaurant could not be saved. Please try again.');
    });

    it('does not clear the name', () => {
      expect(
        wrapper.find(`[data-testid=${components.nameField}]`).element.value,
      ).toEqual(restaurantName);
    });
  });
});
