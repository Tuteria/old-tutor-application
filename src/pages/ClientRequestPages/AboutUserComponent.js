import React from "react";
import { ClientPageWrapper } from "./ClientPageWrapper";
import { IncrementComponent, DropdownComponent } from "../../form";
import { Text } from "../../simple/Text";
import ImageNotice from "../../simple/ImageNotice";
import Notification from "../../simple/Notification";
import { FormComponent, spacing } from "../../pages/components";
import { FormFieldsContainer } from "../../layout/SpecialColumn";

function getClasses(groups) {
  let all_classes = groups.academic.map(x => x.groups);
  return [].concat(...all_classes);
}
export class AboutUserComponent extends React.Component {
  state = {
    classes: this.props.classes || [null],
    display: false
  };
  addChild = () => {
    if (this.state.classes.length < 10) {
      this.setState({ classes: [...this.state.classes, null] });
    }
  };
  removeChild = () => {
    if (this.state.classes.length > 1) {
      this.setState({ classes: this.state.classes.slice(0, -1) });
    }
  };
  addClass = (val, index) => {
    this.setState({
      classes: this.state.classes.map((klass, ind) => {
        return ind === index ? { class: val } : klass;
      })
    });
  };
  isValid() {
    return this.state.classes.every(
      x => (Boolean(x) ? Boolean(x.class) : false)
    );
  }
  onSubmit = () => {
    if (this.isValid()) {
      this.props.onSubmit(this.state.classes);
    } else {
      this.setState({ display: true });
    }
  };
  render() {
    return (
      <ClientPageWrapper
        showLoadingButton
        heading="Let's get a good tutor for your child"
        description=" Tell us your child's class."
        onSubmit={this.onSubmit}
        loading={this.isValid() && this.props.loading}
        // full_width
      >
        <React.Fragment>
          {this.state.display && !this.isValid() ? (
            <Notification
              styling={`margin-bottom: ${spacing.xl}`}
              className="error"
            >
              <Text>Please Select the classes for all children.</Text>
            </Notification>
          ) : null}

          <FormComponent
            css={`
              display: flex;
              align-items: center;
              label {
                margin-right: ${spacing.xxl};
                margin-bottom: 0;
              }
              margin-bottom: ${spacing.m};
            `}
            label="How many kids need lesson?"
          >
            <IncrementComponent
              number={this.state.classes.length}
              maxNumber={10}
              scale={1.4}
              incrementCallback={this.addChild}
              decrementCallback={this.removeChild}
            />
          </FormComponent>
          <FormFieldsContainer childWidth={48}>
            {this.state.classes.map((klass, index) => {
              return (
                <DropdownComponent
                  css={`
                    margin-bottom: ${spacing.m};
                  `}
                  options={getClasses(this.props.groups)}
                  label={`Class of child ${index + 1}`}
                  onChange={val => this.addClass(val, index)}
                  direction="up"
                  value={Boolean(klass) ? klass.class : null}
                  key={index}
                />
              );
            })}
          </FormFieldsContainer>
        </React.Fragment>
      </ClientPageWrapper>
    );
  }
}
