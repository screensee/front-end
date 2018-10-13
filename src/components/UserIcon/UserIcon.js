import React, { Component } from 'react';
import styled from 'styled-components'

const UserIconWrapper = styled.div`
  display: block;
`;

class UserIcon extends Component {
  render() {
    return (
      <UserIconWrapper>
        UserIcon
      </UserIconWrapper>
    );
  }
}

export default UserIcon;
