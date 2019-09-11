import React from "react";
import { BaseScheduleComponent, NRadioComponent } from "./BaseLessonSchedule";

// function applyCoupon({discount=0}){

// }
export class LessonScheduleComponent extends React.Component {
  render() {
    return (
      <BaseScheduleComponent
        {...this.props}
        extraForms={(state, getHours, updateState) => (
          <React.Fragment>
            {state.classes.length > 1
              ? NRadioComponent({
                  name: `How should we allocate the ${getHours()}?`,
                  options: [
                    {
                      text: `${getHours()} for all kids (${getHours()} in total)`,
                      value: 1
                    },
                    {
                      text: `${getHours()} per child (${state.hours *
                        state.classes.length} hours in total)`,
                      value: 2
                    }
                  ]
                })(state.shared || 1, val =>
                  updateState("shared", parseInt(val, 10))
                )
              : null}
          </React.Fragment>
        )}
      />
    );
  }
}
