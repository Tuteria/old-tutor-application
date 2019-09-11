import React from "react";
import { NavTabs } from "./NavBar";
import {
  FormColumn,
  ButtonWithIcon,
  spacing,
  xs
} from "../../pages/components";
import { PreviousLink } from "../../compound/AddIcon";
import { LoadingButton, DefaultButton } from "../../simple/Button";
import { Container, Div } from "../../primitives";
import { FormHeading } from "../../form";
import createReactContext, { type Context } from "create-react-context";

export const ClientRequestContext = createReactContext({
  steps: [],
  current: ""
});

const Page = ({ children, steps, current }) => {
  return (
    <ClientRequestContext.Provider value={{ steps, current }}>
      {children}
    </ClientRequestContext.Provider>
  );
};
export const ProceedButton = ({
  isValid,
  full_width = false,
  onSubmit,
  children,
  loading,
  buttonStyle,
  className
}) => {
  let nextProps =
    loading !== undefined
      ? {
          controlled: true,
          loading: loading,
          controlledOnClick: onSubmit
        }
      : {
          onClick: onSubmit
        };
  return (
    <LoadingButton
      kind={ButtonWithIcon}
      icon="chevron-right"
      primary
      disabled={isValid}
      full_width={full_width}
      right
      iconStyle={{ fill: "#ffffff", width: spacing.m, height: spacing.m }}
      onClick={onSubmit}
      buttonStyle={`
                      display:flex!important;
                      align-items:center;
                      min-width: 136px !important;
                      padding-left: 0 !important;
                      > span{
                        display: block;
                        margin: 0 auto;
                      }
                      ${buttonStyle}
                      `}
      {...nextProps}
      className={className}
    >
      {children}
    </LoadingButton>
  );
};
export class ClientPageWrapper extends React.Component {
  render() {
    let {
      full_width = false,
      heading,
      loading = false,
      isValid = false,
      description,
      showLoadingButton = true,
      rightSection,
      marginTop,
      onSubmit,
      backAction,
      showBackButton = false,
      loadingButtonText = "Next"
    } = this.props;
    let props = this.props;
    let css = `
          max-width: 1024px;
          position: relative;
          margin-top: 120px;
        `;
    css = Boolean(props.css) ? `${css} ${props.css}` : css;

    return (
      <Container css={css}>
        <FormColumn
          full_width={full_width}
          marginTop={marginTop}
          className="form-column"
          // css={`
          //   padding-left: ${spacing.l};
          //   @media (max-width: ${xs}px) {
          //     padding-left: 0;
          //   }
          // `}
        >
          <FormHeading
            small={false}
            heading={heading}
            css={`
              margin-bottom: ${spacing.xxl} !important;
              .form-heading-paragraph {
                font-size: 19px;
              }
            `}
          >
            {description}
          </FormHeading>
          {this.props.children}
          <Div
            className="next-button-container"
            css={`
              margin-top: ${spacing.xxl};
              margin-bottom: ${spacing.xxl};
              display: flex;
              justify-content: space-between;
              // @media (max-width: ${xs}px) {
              //   flex-direction: column-reverse;
              // }
            `}
          >
            {showBackButton ? (
              <PreviousLink
                css={`
                  @media (max-width: ${xs}px) {
                    align-self: center;
                    width: min-content;
                    margin-top: 0;
                  }
                `}
                onClick={backAction}
                text="Back"
              />
            ) : // <DefaultButton
            //   css={`
            //     min-width: 136px !important;
            //     @media (max-width: ${xs}px) {
            //       margin-top: ${spacing.s};
            //       order: 2;
            //     }
            //   `}
            //   onClick={backAction}
            // >
            //   Back
            // </DefaultButton>
            null}
            {showLoadingButton ? (
              <ProceedButton
                loading={loading}
                onSubmit={onSubmit}
                isValid={isValid}
                buttonStyle={`width: auto!important;`}
                className="proceed-button"
              >
                {loadingButtonText}
              </ProceedButton>
            ) : null}
          </Div>
        </FormColumn>
        {rightSection}
        {/* </Row> */}
      </Container>
    );
  }
}
export const PageContainer = ({
  children,
  current,
  heading,
  description,
  steps,
  ...props
}) => {
  return (
    <React.Fragment>
      {current === steps.length ? null : (
        <NavTabs tabs={steps} current={current} />
      )}
      <Page steps={steps} current={current}>
        {children}
      </Page>
    </React.Fragment>
  );
};
