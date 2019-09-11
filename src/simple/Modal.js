import React from "react";
import styled, { css, injectGlobal } from "styled-components";
import ReactModal from "react-modal";
import { xs, spacing, color } from "../siteStyle";
import { Div } from "../primitives";
import { ButtonWithIcon } from "../simple/Button";
import { Heading } from "./Text";

injectGlobal`
.ReactModalPortal > div {
    opacity: 0;
    .ReactModal__Content{
      transform: scale(.9) translate3d(0,0,0);

    }
}

.ReactModalPortal .ReactModal__Overlay {
  transition: opacity 200ms ease-in-out;
  background: rgba(0, 0, 0, 0.15);
  z-index: 10000;
  & .ReactModal__Content{
    transition: height .3s ease-in-out,width .3s ease-in-out,margin .3s ease-in-out,transform .6s cubic-bezier(0,0,0,1);
      @media(max-width: ${xs}px){
        margin-left: 24px;
        margin-right: 24px;
      }
  }
  &--after-open {
    opacity: 1;
    & .ReactModal__Content {
      &--after-open {
        transform: scale(1) translate3d(0,0,0);
      }

    }
  }
  &--before-close {
      opacity: 0;
  }
}

`;
export const Modal = styled(ReactModal)`
  position: absolute;
  max-width: ${props => props.modalWidth}rem;
  top: ${props => props.gutter}rem;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: ${props => props.gutter}rem;
  border: 1px solid #ccc;
  background: #fff;
  overflow-scrolling: touch;
  border-radius: 4px;
  outline: none;
  padding: 0;
  &.login {
  }
  & .modal-header {
    position: relative;
    background-color: #fafafa;
    & h2 {
      margin-top: 0;
    }
  }
  ${props =>
    css`
      ${props.css};
    `};
`;

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null
    };
    this.node = null;
  }
  toggleHeight = height => {
    this.setState({ height });
  };
  render() {
    const {
      backgroundColor = "rgba(255, 255, 255, 0.75)",
      heading,
      headingCss
    } = this.props;
    return (
      <Modal
        className={"login"}
        css={this.props.css || ""}
        gutter={this.props.gutter}
        isOpen={this.props.showModal}
        onRequestClose={this.props.handleCloseModal}
        contentLabel="Minimal Modal Example"
        modalWidth={this.props.width}
        closeTimeoutMS={1000}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            backgroundColor,
            zIndex: 9999
          }
        }}
      >
        <div className="modal-header">
          <Heading
            css={`
              font-size: 22px;
              ${headingCss};
            `}
          >
            {heading}
          </Heading>
        </div>
        {this.props.children}
      </Modal>
    );
  }
}
const ModalHeader = styled.div`
  background-color: #e3edf8;
  padding: 1.8rem 6.8rem;
  text-align: center;
  font-size: 1.3rem;
  @media (max-width: ${xs}px) {
    padding: 1.8rem 3rem;
    font-size: 1.2rem;
  }
`;

export const BaseModalSection = ({ header, onClose, children }) => (
  <Div
    css={`
      width: 100%;
    `}
  >
    {header ? <ModalHeader>{header}</ModalHeader> : null}
    <ButtonWithIcon
      onClick={onClose}
      icon="close"
      iconStyle={{ width: "16px", fill: color.gray.primary }}
      buttonStyle={`
        position: absolute !important;
        background-color: transparent !important;
        border: none !important;
        top: 0;
        right: 0;
        svg{
          top: inherit !important;
        }`}
      css={`
        width: auto;
        background-color: transparent !important;
        border-color: transparent !important;
        :hover {
          background-color: transparent !important;
          border-color: transparent !important;
        }
        position: absolute !important;
        svg {
          right: ${spacing.l};
          padding-left: 0 !important;
          left: inherit !important;
          position: relative;
          padding-right: 12px;
          padding-top: 16px;
          @media (max-width: 768px) {
            right: 0 !important;
          }
        }
        @media (min-width: ${xs + 1}px) {
          svg {
            left: 0 !important;
            g {
              fill: ${color.gray.primary};
            }
          }
          span {
            display: none;
          }
        }
      `}
    />
    {children}
  </Div>
);

export class ToggleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children(
          this.state.showModal,
          this.onOpenModal,
          this.onCloseModal
        )}
      </React.Fragment>
    );
  }
}
export default ImageModal;
