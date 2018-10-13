import React from 'react';
import ReactDOM from 'react-dom';
import UserIcon from './UserIcon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserIcon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
