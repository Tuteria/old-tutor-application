// @ts-ignore
import React from "react";
import { xs } from "../../siteStyle";
import Media from "react-media";
import createReactContext, { type Context } from "create-react-context";
import includes from "lodash/includes";
import {
  ApplicationStepTabs,
  NavigationItem
} from "../../compound/SupportedTabs";
export const CurrentApplicationPageContext = createReactContext({
  steps: [],
  current: "",
  title: "",
  displayBackButton: false,
  updateState: () => {},
  onBackClick: () => {},
  removeCallback: () => {},
  setCallback: () => {},
  hideSubnav: false,
  multiple: false
});

export class Page extends React.PureComponent {
  state = {
    current: 1
  };
  _activeCondition(step, current) {
    // let urls = this._buildUrls(step);
    const isActive = current === step.url;
    return isActive;
  }
  textComponent = text => {
    let result = text.split(":");
    if (result.length > 1) {
      return (
        <React.Fragment>
          <span>{result[0]}</span>
          <span>: {result[1]}</span>
        </React.Fragment>
      );
    }
    return text;
  };
  render() {
    const {
      steps,
      // title, displayBackButton, onBackClick,
      style
    } = this.props;
    return (
      <React.Fragment>
        <CurrentApplicationPageContext.Consumer>
          {({
            current,
            updateState,
            displayBackButton,
            title,
            onBackClick,
            hideSubnav,
            multiple
          }) => {
            return steps.length > 0 ? (
              <Media query={`(max-width: ${xs + 1}px`}>
                {matches =>
                  matches ? (
                    !!title ? (
                      <NavigationItem
                        active={true}
                        completed={true}
                        displayBackButton={displayBackButton}
                        onBackClick={onBackClick}
                        style={style}
                      >
                        {title}
                      </NavigationItem>
                    ) : null
                  ) : !hideSubnav ? (
                    <ApplicationStepTabs
                      tabs={steps}
                      transform={this.textComponent}
                      activeCondition={step => {
                        if (multiple) {
                          return includes(steps.map(x => x.url), step.url);
                        }
                        return this._activeCondition(
                          step,
                          current || this.props.current
                        );
                      }}
                    />
                  ) : null
                }
              </Media>
            ) : null;
          }}
        </CurrentApplicationPageContext.Consumer>
        {this.props.children}
      </React.Fragment>
    );
    // </ServerData>
  }
}
export default Page;

export class Helper extends React.Component {
  componentDidMount() {
    const { data, onBackClick, setCallback } = this.props;
    this.props.updateState(data);
    setCallback(onBackClick, data.title);
  }
  componentWillUnmount() {
    const { removeCallback, data } = this.props;
    removeCallback(data.title);
  }
  render() {
    return this.props.children;
  }
}
