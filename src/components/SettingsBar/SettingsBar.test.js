import React from 'react';
import ReactDOM from 'react-dom';
import SettingsBar from './SettingsBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SettingsBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
