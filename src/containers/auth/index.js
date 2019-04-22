import React, { Component } from 'react';
import styled from 'styled-components';
import querystring from 'querystring';

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

const Header = styled.h3`
  color: #fff;
`

export default class Auth extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100vh',
      latitude: 25,
      longitude: 15,
      zoom: 1.5
    }
  };

  async componentDidMount() {
    let { hash } = this.props.location
    hash = hash.trim('#')
    const { access_token } = querystring.parse(hash)

    const ipinfo = await fetch('https://ipinfo.io/json', { headers: {'Authorization': `Bearer ${process.env.REACT_APP_IPINFO_TOKEN}`, 'Accept': 'application/json'} }).then(response => response.json())

    fetch("/.netlify/functions/update", {
        method: 'post',
        body:    JSON.stringify({ access_token, ipinfo }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(json => this.props.history.push('/map'))

  }

  render() {
    console.log(this.props.location)
    return (
      <Layout>
        <Header>Checking credentials, you will be redirected in a moment.</Header>
        <Header>{JSON.stringify(this.state.json)}</Header>
      </Layout>
    );
  }
}
