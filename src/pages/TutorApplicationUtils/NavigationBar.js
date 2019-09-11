import React from "react";
import NavigationItem from "../../compound/NavigationItem";
import { NavBar, SaveIndicator } from "../../compound/Navigation";
import Media from "react-media";
import { xs } from "../../siteStyle";
// import { distanceInWordsStrict } from "date-fns";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import createReactContext, { type Context } from "create-react-context";
import { NotificationContext } from "./PageWrapper";
export const SavingContext = createReactContext({
  title: "",
  lastSavedDate: Date.now(),
  startSaving: () => {},
  stopSaving: () => {},
  setTitle: () => {}
});

export class SavingIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startSaving: this.startSaving,
      setTitle: this.setTitle,
      stopSaving: this.stopSaving,
      saving: false,
      lastSavedDate: Date.now(),
      title: ""
    };
  }
  setTitle = title => {
    this.setState({ title });
  };
  startSaving = () => {
    this.setState({ saving: true });
  };
  stopSaving = () => {
    this.setState({ saving: false, lastSavedDate: Date.now() });
  };
  render() {
    return (
      <SavingContext.Provider value={this.state}>
        {this.props.children}
      </SavingContext.Provider>
    );
  }
}

export class NavigationBar extends React.Component {
  render() {
    const {
      title,
      displayBackButton,
      style,
      heading,
      inverse,
      saveIndicator = false,
      onBackClick
    } = this.props;
    return (
      <SavingContext.Consumer>
        {({ saving, lastSavedDate }) => {
          let savedAgo = distanceInWordsStrict(new Date(), lastSavedDate, {
            addSuffix: true
          });
          return (
            <div>
              <NotificationContext.Consumer>
                {props => {
                  return (
                    <NavBar inverse={inverse} heading={props.title || heading}>
                      {saveIndicator && (
                        <SaveIndicator
                          saved={!saving}
                          text={`Saved ${savedAgo}`}
                        />
                      )}
                    </NavBar>
                  );
                }}
              </NotificationContext.Consumer>
              <Media query={`(max-width: ${xs}px`}>
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
                  ) : null
                }
              </Media>
            </div>
          );
        }}
      </SavingContext.Consumer>
    );
  }
}

export default NavigationBar;
