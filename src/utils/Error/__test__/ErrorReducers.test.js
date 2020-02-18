import ErrorTypes from '../ErrorTypes';

describe(('ErrorTypes'), () => {
  it('should have a business error', () => {
    expect(ErrorTypes.BUSINESS_ERROR).not.toBeNull();
  });
});
