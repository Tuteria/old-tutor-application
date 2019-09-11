import React from "react";
import styled, { css } from "styled-components";
import Media from "react-media";
import ReactModal from "react-modal";
import Cropper from "react-cropper";
import { Text, Heading } from "../../simple/Text";

import {
  CloseButton,
  Content,
  DefaultButton,
  Div,
  globals,
  Icon,
  PrimaryButton,
  ButtonWithIcon,
  Tooltip,
  UploadComponent,
  WizardWrapper,
  FormColumn
} from "../components";
import "./cropper.css";
import { Summary } from "../../simple/Tooltip";
import ImageNotice from "../../simple/ImageNotice";
import { FormHeading } from "../../form";
import { Div2 } from "../QualificationPage/LinkdedinImport";
import { color } from "../../siteStyle";
const { xs } = globals;
const { siteText } = globals;

const CropperContainer = styled.div`
  flex: 1;
  padding-right: 26px;
  border-right: 1px solid #f0f0f0;
  & > h2 {
    margin: 24px auto;
    font-size: 19px;
    font-weight: 300px;
    color: #484848;
  }
  & .button-wrapper > button,
  & > label {
    overflow: hidden;
    position: relative;
    color: #0064e6;
    font-weight: bold;
    font-size: 19px;
    cursor: pointer;
    & > input,
    & span > input {
      cursor: inherit;
      display: block;
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
  }
`;
const CroppedContainer = styled.div`
  flex: 1;
  padding-left: 56px;
  color: #484848;
  & > div {
    max-width: 243px;
    margin-left: auto;
    margin-right: auto;
    & ${PrimaryButton},& ${DefaultButton} {
      display: block;
      width: 100%;
    }
    & ${DefaultButton} {
      border: none;
    }
    & > h2 {
      text-align: center;

      font-size: 20px;
    }
    & > img {
      display: block;
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
      border-radius: 50%;
      border: 1px solid transparent;
    }
    & > p {
      font-size: 16px;
    }
  }
`;
export const ModalBody = styled.div`
  display: flex;
  padding: 24px 35px 24px 53px;
  ${props =>
    css`
      ${props.css};
    `};
  @media (max-width: ${xs}px) {
    flex-direction: column;
  }
`;
export const Modal = styled(ReactModal)`
  position: absolute;
  ${siteText} max-width: 1000px;
  max-height: 600px;
  top: 40px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 40px;
  border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  overflow-scrolling: touch;
  border-radius: 4px;
  outline: none;
  padding: 0;
  ${props =>
    css`
      ${props.css};
    `}
  @media (max-width: ${xs}px) {
    max-width: 100%;
  }
  & .modal-header {
    position: relative;
    background-color: #fafafa;
    padding: 24px 35px 24px 53px;
    ${props =>
      css`
        ${props.modalHeadingCss};
      `}
    & h2 {
      margin-top: 0;
    }
  }
`;
const UploadTextContainer = styled.div`
  margin-left: 37px;
  color: #47525d;
  position: relative;
  @media (max-width: ${xs}px) {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & h2 {
    @media (max-width: ${xs}px) {
      line-height: 22px !important;
      font-size: 17px !important;
      font-weight: 500;
      margin-bottom: 5px !important;
    }
  }
  & p {
    @media (max-width: ${xs}px) {
      text-align: center;
      color: #767676;
      line-height: 20px;
      font-size: 14px;
      margin-bottom: 16px;
    }
  }
  & input[type="file"] {
    position: absolute;
    visibility: hidden;
  }
  & ${PrimaryButton} {
    padding-left: 34px;
    padding-right: 34px;
    background-color: ${props => (props.completed ? "#fff" : "")};
    color: ${props => (props.completed ? "#0064E6" : "")};
    & > i {
      margin-right: 8px;
    }
    @media (max-width: ${xs}px) {
      background-color: ${props => (props.completed ? "#fff" : "#36B37E")};
      border: 2px solid ${props => (props.completed ? "" : "#36B37E")};
      border-radius: 2px;
      font-size: 16px;
      padding-right: 28px;
      & > i {
        margin-right: 0;
      }
      & > span {
        padding-left: 17px;
      }
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  border: 1px dashed #b2b2b2;
  padding: 26px 27px 37px 44px;
  margin-bottom: 32px;

  @media (max-width: ${xs}px) {
    flex-direction: column;
    align-items: center;
    padding: 24px 26px 26px 26px;
    margin-bottom: 23px;
  }
  & h2 {
    font-size: 20px;
    line-height: 40px;
    margin: 0 auto;
  }
  & p {
  }
  & .img-house {
    position: relative;
    height: 134px;
    @media (max-width: ${xs}px) {
      height: auto;
      margin-bottom: 17px;
    }
    & > img {
      width: 134px;
      height: 134px;
      margin-top: 13px;
      vertical-align: middle;
      display: inline-block;
      border: 2px solid transparent;
      border-radius: 50%;
      @media (max-width: ${xs}px) {
        width: 110px;
        height: 110px;
        margin-top: 0;
      }
      & + i {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 10;
        font-size: 35px;
        color: #0064e6;
        margin-bottom: 8px;
      }
    }
    & svg {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 43px;
      height: 32px;
      bgcolor: ${color.blue.primary};
      g#Step-1---Basic-Profile-Info {
        fill: ${color.blue.primary};
      }
    }
  }
`;

const ImageOptions = styled.div`
  @media (min-width: ${xs + 1}px) {
    width: 100%;
  }
  & img {
    width: 50%;
    margin: 0;
    padding: 0;
    display: inline-block;
    @media (max-width: ${xs}px) {
      width: 33.33%;
      height: 100px;
      &:last-child {
        display: none;
      }
    }
    &:first-of-type {
      margin-right: 4px;
      width: calc(50% - 4px);
    }

    &:nth-of-type(3n) {
      margin-right: 4px;
      width: calc(50% - 4px);
    }
  }
`;

export class ImageUpload extends React.Component {
  state = {
    image: ""
  };
  componentDidMount() {
    this.updateLocal(this.props.image);
  }
  updateLocal = image => {
    this.setState({ image });
  };
  afterUpload = image => {
    this.updateLocal(image);
    this.props.updateImage(image);
    if (window.matchMedia(`(max-width: ${xs}px)`).matches) {
    } else {
      this.props.handleOpenModal();
    }
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.image !== nextProps.image) {
      this.updateLocal(nextProps.image);
    }
  }
  render() {
    const { uploaded } = this.props;

    return (
      <UploadComponent
        image={this.state.image}
        postAction={this.afterUpload}
        render={(fileInput, onClick) => {
          return (
            <ImageContainer>
              <div className="img-house">
                <img src={this.state.image} alt="upload" />
                {uploaded ? (
                  <Icon
                    width={35}
                    borderColor="#FFFFFF"
                    bgColor="#0064E6"
                    name="check-circle"
                  />
                ) : null}
              </div>
              <UploadTextContainer completed={uploaded}>
                <h2>
                  {uploaded ? "Looking good!" : "Upload a great photo of you"}
                </h2>
                <Media query={`(max-width: ${xs}px)`}>
                  {matches =>
                    matches ? (
                      <p>
                        Please make sure your photo clearly shows your face and
                        smile
                      </p>
                    ) : (
                      <p>
                        {uploaded
                          ? `This photo will be added to your profile, shared with future clients or users.`
                          : `Tutors with a friendly, professional-looking portraits are hired 5
                  times more often.`}
                      </p>
                    )
                  }
                </Media>
                {fileInput}
                <UploadButton
                  onClick={onClick}
                  big
                  css={`
                    width: 70%;
                    margin-top: 16px;
                    @media (max-width: ${xs}px) {
                      width: 90%;
                    }
                  `}
                  icon="cloud-upload-alt"
                >
                  {uploaded ? `Change Photo` : `Add my Photo Now`}
                </UploadButton>
                {/* <PrimaryButton onClick={onClick}>
                  <Icon name="cloud-upload" />
                  <span>{uploaded ? `Change Photo` : `Add my Photo Now`}</span>
                </PrimaryButton> */}
              </UploadTextContainer>
            </ImageContainer>
          );
        }}
      />
    );
  }
}
const UploadButton = ({ css, onClick, ...rest }) => (
  <Media query={`(max-width: ${xs}px)`}>
    {matches =>
      matches ? (
        <ButtonWithIcon onClick={onClick} big css={css} {...rest} />
      ) : (
        <ButtonWithIcon onClick={onClick} primary big css={css} {...rest} />
      )
    }
  </Media>
);
export class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      croppedImage: ""
    };
    this.file = null;
  }
  saveImage = () => {
    this.props.updateImage(this.state.croppedImage);
    this.props.handleCloseModal(false);
  };
  _crop = () => {
    // image in dataUrl
    this.setState({
      croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  };
  componentDidMount() {
    this.updateImage(this.props);
  }
  updateImage(props) {
    this.setState(state => ({
      ...state,
      image: props.image,
      croppedImage: props.image
    }));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.updateImage(nextProps);
    }
  }
  onUploadClick = () => {
    this.file.click();
  };
  handleFileUpload = e => {
    var reader = new FileReader();

    reader.onload = es => {
      this.setState({ image: es.target.result });
    };
    const files = e.target.files;
    if (files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  rotate = () => {
    this.refs.cropper.rotate(90);
  };
  render() {
    return (
      <Modal isOpen={this.props.showModal} contentLabel="Minimal Modal Example">
        <div className="modal-header">
          <h2 style={{ color: "#484848" }}>
            Edit and Resize Your Profile Photo
          </h2>
          <CloseButton onClick={this.props.handleCloseModal}>
            <Icon name="close" />
          </CloseButton>
        </div>
        <ModalBody>
          <CropperContainer>
            <p style={{ paddingBottom: 32 }}>
              Drag the{" "}
              <Div
                css={`
                  position: relative;
                  display: inline;
                `}
                className="handle"
              />{" "}
              <span style={{ paddingLeft: 28 }}>
                handle to crop and scale your photo
              </span>
            </p>
            <Cropper
              ref="cropper"
              src={this.state.image}
              style={{ height: 300, width: "100%" }}
              // Cropper.js options
              aspectRatio={1 / 1}
              guides={false}
              moveable={false}
              zoomable={false}
              zoomTo={2}
              background={false}
              dragMode="none"
              cropBoxResizable={true}
              crop={this._crop.bind(this)}
            />
            <Div
              css={`
                margin-top: 24px;
                display: flex;
                justify-content: space-between;
              `}
              className="button-wrapper"
            >
              <ButtonWithIcon
                icon="rotate"
                css={`
                  width: 48%;
                  color: #47525d !important;
                `}
                outline
                top="12px"
                onClick={this.rotate}
                iconStyle={{ width: "24px", height: "24px", fill: "#36B37E" }}
              >
                Rotate
              </ButtonWithIcon>
              <ButtonWithIcon
                icon="upload-monitor"
                css={`
                  width: 48%;
                  color: #47525d !important;
                `}
                top="14px"
                iconStyle={{ width: "18px", height: "18px", fill: "#36B37E" }}
                outline
                htmlFor="file"
                onClick={this.onUploadClick}
              >
                Upload New
                <input
                  ref={input => (this.file = input)}
                  type="file"
                  onChange={this.handleFileUpload}
                  name="file"
                />
              </ButtonWithIcon>
            </Div>
          </CropperContainer>
          <CroppedContainer>
            <div>
              <Heading
                tag="h2"
                css={`
                  padding-bottom: 16px;
                `}
              >
                Profile picture preview
              </Heading>
              <img src={this.state.croppedImage} alt="upload" />
              <Text
                css={`
                  padding-top: 16px;
                  padding-bottom: 16px;
                  text-align: center;
                `}
              >
                Looks good? Be sure you're putting on a smile!
              </Text>
              <PrimaryButton onClick={this.saveImage}>Save photo</PrimaryButton>
            </div>
          </CroppedContainer>
        </ModalBody>
      </Modal>
    );
  }
}
class TutorProfilePage extends React.Component {
  state = {
    showModal: false,
    uploaded: false,
    image: this.props.image || `/static/img/circle-09.svg`,
    uploadedImage: this.props.image || ""
  };
  handleOpenModal = () => {
    this.setState({ showModal: true, uploaded: false });
  };

  handleCloseModal = (valid = true) => {
    this.setState({ showModal: false });
    if (valid) {
      this.setState({ uploaded: false });
    }
  };
  updateUploadedImage = image => {
    if (window.matchMedia(`(max-width: ${xs}px)`).matches) {
      this.setState(state => ({ ...state, image, uploadedImage: image }));
    } else {
      this.setState(state => ({ ...state, uploadedImage: image }));
    }
  };
  updateImage = image => {
    this.setState(state => ({
      ...state,
      uploaded: true,
      image,
      uploadedImage: image
    }));
  };
  formHasErrors = () => {
    return !!this.state.uploadedImage;
  };
  validateForm = () => {
    return this.props.onSubmit(this.state.uploadedImage);
  };
  render() {
    const images = [
      "Example1.png",
      "Example2.png",
      "Example3.png",
      "Example4.png"
    ];
    return (
      <WizardWrapper
        title="Step 3: Tutor Profile"
        nextButtonText="Next"
        goToNextScreen={this.validateForm}
        showPreviousScreen={true}
        loading={this.props.loading}
        showNextScreen={!this.formHasErrors()}
        previousPageFunc={this.props.previousPage}
        goToPreviousScreen={this.props.previousPage}
        progress={this.props.progress}
        section={this.props.section}
      >
        <FormColumn>
          <FormHeading heading="Let’s add your photo">
            <Media query={`(max-width: ${xs}px)`}>
              {matches =>
                matches
                  ? `Upload your very best photo to attract the best clients to
                    you`
                  : `  Tuteria is a professional community of exceptional tutors.
                    Upload your very best photo to attract clients to you.
                  `
              }
            </Media>
          </FormHeading>
          <ImageUpload
            uploaded={this.state.uploaded}
            image={this.state.image}
            handleOpenModal={this.handleOpenModal}
            updateImage={this.updateUploadedImage}
          />
          <ImageModal
            showModal={this.state.showModal}
            image={this.state.uploadedImage}
            updateImage={this.updateImage}
            handleCloseModal={this.handleCloseModal}
          />
          <Media query={`(max-width: ${xs}px)`}>
            {matches =>
              matches ? null : (
                <ImageNotice>
                  <h2>Here are quick tips for a great photo</h2>
                  <ul>
                    <li>
                      Make sure your picture is clear, sharp, and friendly. It
                      shouldn’t be blurry.
                    </li>
                    <li>
                      Don’t upload scanned passport, scanned PDF or framed
                      photos.
                    </li>
                    <li>
                      The background of your picture must look neat and
                      presentable.
                    </li>
                    <li>
                      Your picture size should not exceed 2MB. Check the size
                      before you upload.
                    </li>
                  </ul>
                </ImageNotice>
              )
            }
          </Media>
        </FormColumn>
        <Div2 newWidth={900}>
          <ResponsiveTooltip images={images} />
        </Div2>
      </WizardWrapper>
    );
  }
}
const RTooltip = styled(Tooltip)`
  @media (min-width: ${xs}px) {
    width: 300px;
    & h3 {
      font-size: 16px;
      font-weight: bold;
      line-height: 22px;
      margin-bottom: 8px;
    }
    & ${Summary} {
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
    }
  }
  @media (max-width: ${xs}px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
const ResponsiveTooltip = props => {
  console.log(props);
  return (
    <RTooltip
      icon="lightbulb-o"
      cover="Here are examples of what we call a professional tutor photo"
    >
      <Media query={`(max-width: ${xs}px)`}>
        {matches =>
          matches ? null : (
            <div>
              <h3>Example of a good tutor photo</h3>
              <Summary>
                <span>
                  A good photo should look bright, have a charming smile and
                  keep your eye looking straight.
                </span>
                <br />
              </Summary>
            </div>
          )
        }
      </Media>
      <ImageOptions>
        {props.images.map((image, index) => (
          <img src={`/static/img/profile/${image}`} alt={image} />
        ))}
      </ImageOptions>
    </RTooltip>
  );
};
export default TutorProfilePage;
