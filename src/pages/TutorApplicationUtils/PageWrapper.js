// @flow
import React, { Component } from "react";
import ScrollToTop from "../../simple/ScrollToTop";
// import Notification from "./ApplicationFlow/components/simple/Notification";
import Notification from "../../simple/Notification";
import NavigationBar, { SavingIndicator } from "./NavigationBar";
import { Div } from "../../primitives";
import createReactContext, { type Context } from "create-react-context";
import { CurrentApplicationPageContext, Page } from "./ApplicationStepsWrapper";
import { Icon } from "../../simple";
import { darken } from "polished";

export class CurrentApplicationPage extends React.PureComponent {
  state = {
    current: this.props.current,
    displayBackButton: false,
    title: "",
    key: "",
    hideSubnav: false,
    multiple: false
  };
  callbacks = [];
  setCallback = (action, key) => {
    this.callbacks[key] = action;
  };
  onBackClick = () => {
    if (!!this.callbacks[this.state.key]) {
      this.callbacks[this.state.key]();
    }
  };
  updateState = data => {
    this.setState(data);
  };
  removeCallback = key => {
    this.callbacks.splice(key, 1);
  };
  render() {
    return (
      <CurrentApplicationPageContext.Provider
        value={{
          steps: this.props.steps || [],
          updateState: this.updateState,
          current: this.state.current,
          hideSubnav: this.state.hideSubnav,
          displayBackButton: this.state.displayBackButton,
          onBackClick: this.onBackClick,
          setCallback: this.setCallback,
          removeCallback: this.removeCallback,
          title: this.state.title,
          multiple: this.state.multiple
        }}
      >
        {this.props.children}
      </CurrentApplicationPageContext.Provider>
    );
  }
}
class SubNavbar extends React.Component {
  state = {
    title: ""
  };
  mount() {
    const { dispatch, onBackClick = () => {}, ...rest } = this.props;
    let value = rest;
    if (rest.displayBackButton && !!onBackClick()) {
      const { base, current, previous } = onBackClick();
      if (base === "steps") {
        value.urlParams = { base, current, previous };
      }
      value.url = `/${base}/${previous}`;
    }
    dispatch({ type: UPDATE_NAV, value });
  }
  componentDidMount() {
    const { title } = this.props;
    this.mount();
    this.setState({ title: title });
  }
  componentWillReceiveProps(nextState) {
    if (this.props.title !== nextState.title) {
      this.mount();
    }
  }
  render() {
    return null;
  }
}
export const NotificationContext = createReactContext({
  displayNotification: false,
  toggleNotification: text => {},
  text: "",
  kind: "error",
  title: "",
  changeTitle: text => {}
});
export class NotificationChangeComponent extends React.Component {
  componentDidMount() {
    if (!!this.props.title) {
      this.props.changeTitle(this.props.title);
    }
  }
  render() {
    return this.props.children;
  }
}
class NotificationComponent extends React.PureComponent {
  toggleNotification = ({ text = "", display = true, kind = "" }) => {
    this.setState({ text, displayNotification: display, kind });
    if (display) {
      setTimeout(() => {
        this.setState({ displayNotification: false });
      }, 5000);
    }
  };
  changeTitle = title => {
    this.setState({ title });
  };
  state = {
    displayNotification: false,
    text: "",
    title: "",
    kind: "error",
    toggleNotification: this.toggleNotification,
    changeTitle: this.changeTitle
  };
  render() {
    return (
      <NotificationContext.Provider value={this.state}>
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}
export class Notifier extends React.Component {
  render() {
    let differentKinds = {
      error: "#e9411B",
      success: "#36b37e",
      warning: "#1B2733"
    };
    return (
      <Notification
        styling={`width: 100%; & > svg{
        &:hover{
          & g#Upload-Popup{
            fill: ${darken(0.3, differentKinds[this.props.type])} !important;

          }
        }
      }`}
        className={this.props.type}
      >
        {this.props.text}
        <Icon
          name="close"
          fill={differentKinds[this.props.type]}
          onClick={this.props.notifyParent}
          style={{ float: "right", cursor: "pointer" }}
        />
      </Notification>
    );
  }
}
class App extends React.PureComponent {
  state = {
    notify: false,
    notifyText: "",
    notifyClass: ""
  };
  displayNotification = (notifyText, type = "warning") => {
    this.setState({ notify: true, notifyText, notifyClass: type });
  };
  isClosed = () => {
    this.setState({ notify: false });
  };

  render() {
    const ScrollComponent = this.props.scroll ? ScrollToTop : Div;
    const { steps = [], current = null } = this.props;
    return (
      <div>
        <SavingIndicator>
          <NotificationComponent>
            <div>
              <NavigationBar {...this.props.navProps || {}} />
              <ScrollComponent>
                <CurrentApplicationPage steps={steps} current={current}>
                  <Page steps={steps} current={current}>
                    <NotificationContext.Consumer>
                      {({
                        displayNotification,
                        text,
                        kind,
                        toggleNotification
                      }) =>
                        displayNotification ? (
                          <Notifier
                            type={kind}
                            text={text}
                            notifyParent={() =>
                              toggleNotification({ display: false })
                            }
                          />
                        ) : null
                      }
                    </NotificationContext.Consumer>
                    {this.props.children}
                  </Page>
                </CurrentApplicationPage>
              </ScrollComponent>
            </div>
          </NotificationComponent>
        </SavingIndicator>
      </div>
    );
  }
}

export default App;
