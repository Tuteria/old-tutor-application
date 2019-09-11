import React from "react";

export class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
    this.uploadInput = null;
  }
  componentDidMount() {
    this.updateImage(this.props);
  }
  updateImage(props) {
    this.setState(state => ({ ...state, image: props.image }));
  }
  onUploadClick = () => {
    this.uploadInput.click();
  };
  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  handleFileUpload = e => {
    var reader = new FileReader();
    var myImage = new Image(300, 300);
    myImage.onload = () => {
      var canvas = document.createElement("canvas");
      const dimensions = this.calculateAspectRatioFit(
        myImage.naturalWidth,
        myImage.naturalHeight,
        300,
        300
      );
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      canvas
        .getContext("2d")
        .drawImage(myImage, 0, 0, dimensions.width, dimensions.height);
      const imageUrl = canvas.toDataURL();
      this.updateImage({ image: imageUrl });
      this.props.postAction(imageUrl);
    };
    reader.onload = es => {
      myImage.src = es.target.result;
    };
    const files = e.target.files;
    if (files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  render() {
    const refFunc = node => {
      this.uploadInput = node;
    };
    const uploadInput = (
      <input
        ref={refFunc}
        type="file"
        onChange={this.handleFileUpload}
        name="file"
      />
    );
    return this.props.render(uploadInput, this.onUploadClick, this.updateImage);
  }
}
