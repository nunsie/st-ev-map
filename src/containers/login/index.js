import React, { Component } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: #282A2F;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  align-items: center;
  justify-content: center;
`

const Button = styled.a`
  background: #7289da;
  border-radius: 3px;
  padding: 15px 20px;
  border: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  text-decoration: none;
`

const Header = styled.h3`
  color: #fff;
`
export default class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100vh',
      latitude: 25,
      longitude: 15,
      zoom: 1.5
    }
  };

  render() {
    return (
      <Layout>
        <Header>Login with</Header>
        <Button href={`https://discordapp.com/api/oauth2/authorize?client_id=569815298304376832&redirect_uri=${window.location.hostname}OAuth2&response_type=token&scope=guilds%20identify`}>
          <img height='36px' width='130px' src='https://discordapp.com/assets/4f004ac9be168ac6ee18fc442a52ab53.svg' />
        </Button>
      </Layout>
    );
  }
}
