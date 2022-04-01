import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch);
};

export default mockFetch;
