import { fromJS } from 'immutable';

export const dispatch = jest.fn();
export const baseState = fromJS({
  loadButton: false,
});
