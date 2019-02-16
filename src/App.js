import React, { Component } from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Webcam from "react-webcam";




class App extends Component {
 
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    fetch("https://8fwdcyf9h2.execute-api.eu-central-1.amazonaws.com/default/uploadToS3", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json",
      },
      body: {
        data: imageSrc
      }
    }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  
  };
 
  
  render() {
    const videoConstraints = {
      width: 1280,
      height: 800,
      facingMode: "user"
    };

    return (
      <div className="App">
        <header className="App-header">
          <Webcam
            audio={false}
            height={600}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={1000}
            videoConstraints={videoConstraints}
          />
          <Button type="primary" onClick={()=>{this.capture()}}> Ta foto </Button>
        </header>
      </div>
    );
  }
}

export default App;
