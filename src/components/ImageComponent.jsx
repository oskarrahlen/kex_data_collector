import React, { Component } from "react";
import { Button } from "antd";
import Webcam from "react-webcam";

class ImageComponent extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    fetch(
      "https://31s16yvxie.execute-api.eu-central-1.amazonaws.com/default/uploadToS3",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          data: imageSrc,
          imageName:
            this.props.folder + this.props.filename + "-" + this.props.hash
        })
      }
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.afterCapture();
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 800,
      facingMode: "user"
    };

    return (
      <div className="camera">
        <Webcam
          audio={false}
          height={180}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={200}
          videoConstraints={videoConstraints}
        />
        <Button
          onClick={() => {
            this.capture();
          }}
        >
          Ta foto
        </Button>
      </div>
    );
  }
}

export default ImageComponent;
