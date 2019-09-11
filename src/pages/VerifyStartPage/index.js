import React from "react";
import Icon from "../../simple/Icon";
import { Heading } from "../SubjectStartPage/Header";
import { xs } from "../../siteStyle";

import { SummaryContainer } from "../SubjectStartPage/SummaryContainer";
import palm from "./palm@2x.png";
const stepsData = [
  {
    icon: <Icon name="handshake" />,
    heading: "Earn more trust",
    caption: "Clients can trust you better and feel safe working with you."
  },
  {
    icon: <Icon name="moneybag" />,
    heading: "Make more money",
    caption:
      "Only verified tutors get access to clients and make money on Tuteria"
  },
  {
    icon: <Icon name="shield" />,
    heading: "Verified Badge",
    caption:
      "You get more promotion by getting a verified badge to your profile"
  }
];

class VerifyIdentityPage extends React.Component {
  nextPage = () => {
    this.props.navigateTo(0, "start", "id-verification");
  };

  render() {
    let { title = "Back to Subject List" } = this.props;
    return (
      <SummaryContainer
        newTitle=""
        nextButtonText="I understand! Verify Now"
        mobileTitle={title}
        nextPage={this.props.nextPage}
        below={false}
        data={stepsData}
        buttonCss={`
          width: 45%;
          margin-top: 24px
        }`}
        children={
          <React.Fragment>
            <Heading mb="23px">
              <img alt="" src={palm} />
              <h1>High fives!</h1>
              <p className="sub-header">
                You are almost done with publishing your first subject
              </p>
            </Heading>
            <p className="body-text">
              Before you start teaching on Tuteria, the security of your account
              is important to us. Therefore, we require all tutors to verify
              their identity before we can publish their first Subject.
            </p>
          </React.Fragment>
        }
      />
    );
  }
}
export default VerifyIdentityPage;
