import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';

const Avatar = styled.img`
  background: #50a882;
  padding: 3px;
  border-radius: 25px;
  width: 25px;
  height: 25px;
`

export default class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100vh',
      latitude: 25,
      longitude: 15,
      zoom: 2
    }
  };

  async componentDidMount() {
    fetch("/.netlify/functions/list")
      .then(response => response.json())
      .then(members => this.setState({ members }))
  }

  render() {
    console.log(this.state.members)
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapStyle='mapbox://styles/nunsie/cjus6i33e1ndx1fs4sngl6l0w'
      >
        {
          this.state.members && this.state.members.map(member => (
            <Marker latitude={parseFloat(member.location.lat)} longitude={parseFloat(member.location.lon)} offsetLeft={-20} offsetTop={-10}>
              <Avatar src={member.avatar && member.avatar !== '' ? `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png` : 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png'} />
           </Marker>
          ))
        }
      </ReactMapGL>
    );
  }
}