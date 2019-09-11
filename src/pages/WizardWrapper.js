import React from "react";
import { Container } from "../primitives";
import createReactContext from "create-react-context";
import { Helper, CurrentApplicationPageContext } from "./TutorApplicationUtils";
import ProgressBar from "../simple/ProgressBar";
import {
  Footer,
  PrimaryButton,
  xs,
  spacing,
  ButtonWithIcon
} from "./components";
import { LoadingButton } from "../simple/Button";

export const ProgressContext = createReactContext({
  progress: 0
});
const WizardPage = ({
  children,
  showPreviousScreen = false,
  showNextScreen = true,
  goToNextScreen,
  goToPreviousScreen,
  previousPageFunc,
  title = "Page",
  previousButtonText = "Back",
  nextButtonText = false,
  hideFooter = false,
  loading,
  footerCss = ``,
  displaySubnav = true,
  multiple = false,
  section = null,
  containerStyle = {},
  fetchNextPage = () => {},
  fetchPreviousPage = () => {},
  helperStyle = ``
}) => {
  let props = { title };
  props.displayBackButton = showPreviousScreen;
  // if (showPreviousScreen) {
  // }
  if (!!goToPreviousScreen) {
    props.onBackClick = () => {
      return goToPreviousScreen();
    };
  }
  let nextProps =
    loading !== undefined
      ? {
          controlled: true,
          loading: loading,
          controlledOnClick: goToNextScreen
        }
      : {
          onClick: goToNextScreen
        };
  return (
    <div style={containerStyle}>
      <CurrentApplicationPageContext.Consumer>
        {({ updateState, setCallback, removeCallback }) => {
          return (
            <Helper
              updateState={updateState}
              setCallback={setCallback}
              removeCallback={removeCallback}
              onBackClick={previousPageFunc}
              data={{
                title,
                current: section,
                displayBackButton: showPreviousScreen,
                key: title,
                hideSubnav: !displaySubnav,
                multiple
              }}
            >
              <Container
                css={`
                  max-width: 975px;
                  position: relative;
                  ${helperStyle};
                `}
              >
                {children}
                {/* </Row> */}
              </Container>
              {hideFooter ? null : (
                <Footer css={footerCss}>
                  {nextButtonText ? (
                    <LoadingButton
                      kind={ButtonWithIcon}
                      icon="chevron-right"
                      primary
                      right
                      iconStyle={{
                        fill: "#ffffff",
                        width: spacing.m,
                        height: spacing.m
                      }}
                      buttonStyle={`
                      display:flex!important; 
                      align-items:center; 
                      min-width: 136px !important; 
                      padding-left: 0 !important;
                      > span{
                        display: block;
                        margin: 0 auto;
                      } 
                      `}
                      disabled={showNextScreen}
                      onMouseOver={fetchNextPage}
                      {...nextProps}
                    >
                      {nextButtonText}
                    </LoadingButton>
                  ) : null}
                  {showPreviousScreen ? (
                    <PrimaryButton
                      outline
                      onMouseOver={fetchPreviousPage}
                      onClick={previousPageFunc}
                      css={`
                        width: 136px;
                        margin-right: ${spacing.m};
                        @media (max-width: ${xs}px) {
                          display: none !important;
                        }
                      `}
                    >
                      {previousButtonText}
                    </PrimaryButton>
                  ) : null}
                  <ProgressContext.Consumer>
                    {({ progress }) => <ProgressBar percentage={progress} />}
                  </ProgressContext.Consumer>
                </Footer>
              )}
            </Helper>
          );
        }}
      </CurrentApplicationPageContext.Consumer>
    </div>
  );
};

export default WizardPage;
