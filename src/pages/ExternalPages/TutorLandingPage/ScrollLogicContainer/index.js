import React from "react";
class ScrollLogicContainer extends React.Component {
  state = {
    scrolling: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrolling);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrolling);
  }

  handleScrolling = () => {
    if (
      document.documentElement.scrollTop >= this.templateWrapper.offsetHeight
    ) {
      this.setState({ scrolling: true });
    } else this.setState({ scrolling: false });
  };

  render() {
    const { children, render, ...rest } = this.props;

    return (
      <div ref={node => (this.templateWrapper = node)}>
        {render(this.state.scrolling)}
        {children}
      </div>
    );
  }
}

export default ScrollLogicContainer;
