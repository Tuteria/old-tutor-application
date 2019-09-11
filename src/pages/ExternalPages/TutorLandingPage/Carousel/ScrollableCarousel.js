import React from "react";
import styled, { css } from "styled-components";
import { IndexStyle } from "../IndexStyle";
import "./carousel2";
const Div = styled.div`
  & #carousel {
    top: 0;
    width: 100%;
    left: 0;
    position: relative;
    color: white;
    .mobile-only {
      display: none;
    }
  }
  & .carousel.fade {
    opacity: 1;
  }
  & .fade {
    opacity: 0;
    transition: opacity 0.15s linear;
  }
  .carousel.fade .item:first-child {
    top: auto;
    position: relative;
  }
  .carousel.fade .item {
    transition: opacity ease-in-out 0.7s;
    left: 0 !important;
    opacity: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: block !important;
    z-index: 1;

    & img {
      height: 100%;
      width: 100%;
    }
  }

  .carousel.fade .item.active {
    opacity: 1;
    z-index: 2;
    transition: opacity ease-in-out 0.7s;
  }
  .carousel-caption-one {
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    position: relative;
    z-index: 10;
  }
  ${props =>
    css`
      ${props.css};
    `};
`;
class CarouselBootstrap extends React.Component {
  componentDidMount() {
    this.$el = window.$(this.el);
    this.$el.carousel({
      interval: 3000,
      wrap: true,
      pause: ""
    });
  }

  componentWillUnmount() {
    this.$el.carousel("dispose");
  }

  render() {
    const { images, children } = this.props;
    return (
      <Div>
        <div
          id="carousel"
          className="carousel fade"
          data-ride="carousel"
          ref={el => (this.el = el)}
        >
          <div className="carousel-inner" role="listbox">
            <div className="carousel-caption-one">{children}</div>
            {images.map((image, index) => (
              <div
                className={`carousel-item item ${index === 0 ? "active" : ""}`}
                key={index.toString()}
              >
                <IndexStyle image={image} />
              </div>
            ))}
          </div>
        </div>
      </Div>
    );
  }
}
export default CarouselBootstrap;
