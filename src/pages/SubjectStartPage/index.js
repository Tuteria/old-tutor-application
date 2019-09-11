import React from "react";
import Icon from "../../simple/Icon";
import Divider from "../../simple/Divider";
import HeaderContent from "./Header";
import { SummaryContainer } from "./SummaryContainer";
const stepsData = [
  {
    icon: <Icon name="select" />,
    heading: "1. Choose Subjects",
    caption: "Select the subjects you're capable of teaching at the moment"
  },
  {
    icon: <Icon name="document-time" />,
    heading: "2. Take Test",
    caption: "Take a short online competency test for the selected subject."
  },
  {
    icon: <Icon name="align-left" />,
    heading: "3. Add Fees & Details",
    caption: "Once passed, you can add more details and charge a custom price."
  }
];

class SubjectStartPage extends React.Component {
  render() {
    return (
      <SummaryContainer
        newTitle={this.props.title}
        nextButtonText="Cool! Let's Begin"
        mobileTitle={this.props.mobileTitle}
        nextPage={this.props.nextPage}
        previousPage={this.props.previousPage}
        data={stepsData}
        children={
          <React.Fragment>
            <HeaderContent
              heading={`Welldone, ${this.props.name}!`}
              caption="Let’s now add the subjects you want to teach"
              icon="clap@2x"
            />
            <Divider>
              <p>Here is how it works</p>
            </Divider>
          </React.Fragment>
        }
      />
    );
  }
}

export default SubjectStartPage;
