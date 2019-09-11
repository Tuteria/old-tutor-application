import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    this.scrollToTop(prevProps);
  }

  scrollToTop = prevProps => {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  };

  render() {
    return this.props.children;
  }
}

const ScrollContainer = withRouter(ScrollToTop);

export default ScrollContainer;
