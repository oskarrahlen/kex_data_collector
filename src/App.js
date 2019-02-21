import React, { Component } from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import logo from './logo.svg';
import './App.css';
import ImageComponent from './components/ImageComponent';
const uuidv4 = require('uuid/v4');


class App extends Component {

  state = {
    hash:""
  }


  makeid() {
   return uuidv4();
  }

  componentDidMount(){
    this.setState({hash:this.makeid()})
  }
 
  
  render() {
    return (
      <div className="App">
        <ImageComponent folder="oskarsbilder/" filename="bad1" hash={this.state.hash} />
      </div>
    );
  }
}

export default App;
