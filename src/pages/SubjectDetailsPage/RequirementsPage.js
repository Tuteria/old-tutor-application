import React from "react";
import styled, { css } from "styled-components";
import Icon from "../../simple/Icon";
import { FormColumn, Div, FormComponent } from "../components";
import { QuillComponent } from "../../form/EditableComponent";
import { Heading, Text } from "../../simple/Text";
import Wrapper from "./Wrapper";
import { spacing, text_color } from "../../siteStyle";
// import { connect } from "react-redux";
// import { mapStateToProps, UPDATE_FIELD } from "./reducers";
const InfoHeader = styled.div`
  padding: 8px 0 47px;
  & h3 {
    font-size: 22px;
    line-height: 28px;
    margin: 0;
    padding-bottom: 4px;
  }
  & p {
    color: #484848;
    font-size: 17px;
    line-height: 22px;
  }
`;
const Column2 = styled(FormColumn)`
  float: none;
  display: inline-block;
  vertical-align: top;
  margin-top: 0;
`;
class RequirementsPage extends React.Component {
  node = null;
  validateForm = () => {
    console.log("");
    let requirements = this.node.onConvert();

    return this.props.validateAction(requirements);
  };
  render() {
    // const { errorMessageForField } = this.props;
    return (
      <Wrapper
        step={4}
        canSubmit={this.validateForm}
        disableNextScreen={false}
        {...this.props}
      >
        {({ width, position, subject }) => {
          return (
            <div>
              <InfoHeader>
                <Column2
                  md={1}
                  style={{
                    paddingLeft: 0,
                    float: "none",
                    display: "inline-block",
                    verticalAlign: "top"
                  }}
                >
                  <Div xs sm>
                    <Icon name="list" />
                  </Div>
                </Column2>
                <Column2
                  md={11}
                  style={{
                    paddingRight: 0,
                    float: "none",
                    display: "inline-block",
                    verticalAlign: "top"
                  }}
                >
                  <Heading
                    small
                    css={css`
                      padding-bottom: ${spacing.s};
                      color: ${text_color.primary};
                    `}
                  >
                    Tell your clients what they need to get started
                  </Heading>
                  <Text
                    css={css`
                      color: ${text_color.secondary};
                    `}
                  >
                    Structure your client instructions so they know the tools
                    they need to get before the teaching process begins.
                  </Text>
                </Column2>
              </InfoHeader>
              <FormComponent
                style={{ padding: 0, clear: "both" }}
                label={`List of items needed to effectively learn [${
                  subject.name
                }]`}
                labelStyle={{ fontWeight: 700 }}
                errorMarginTop={25}
              >
                <QuillComponent
                  ref={node => (this.node = node)}
                  html={this.props.requirements}
                />
              </FormComponent>
            </div>
          );
        }}
      </Wrapper>
    );
  }
}
export default RequirementsPage;
