import * as ReactDOM from 'react-dom';

describe.skip('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.unmountComponentAtNode(div);
  });
});
