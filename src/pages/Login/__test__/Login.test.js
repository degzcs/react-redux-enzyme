import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import { StoreContext } from '../../../store';
import { baseState } from '../../../utils/TestUtilities/mockObjects';

it('renders without crashing', () => {
  const dispatch = () => {};
  render(
    <StoreContext.Provider value={{ state: baseState, dispatch }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </StoreContext.Provider>,
  );
});
