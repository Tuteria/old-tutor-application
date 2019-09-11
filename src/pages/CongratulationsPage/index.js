import React from "react";
import styled, { css } from "styled-components";
import { ButtonWithIcon } from "../../simple/Button";
import { TestContentStyle } from "../../layout/ContentStyle";
import bitmap from "./bitmap@2x.png";
import { Heading } from "../../simple/Text";
import globals, { spacing } from "../../siteStyle";
const { xs } = globals;
const TestResultContentStyle = TestContentStyle.extend`
  width: 38%;
  z-index: 2;
  margin-top: 0;
  border: 0;
  box-shadow: 0 8px 16px 0 rgba(27, 39, 51, 0.08);
  border: 1px solid #e6e8eb;
  border-radius: 4px;
  padding: 55px 67px 60px;
  & .body-text {
    color: #484848;
    font-weight: 300;
    font-size: 15px;
    text-align: center;
    line-height: 26px;
    width: 100%;
    margin-bottom: 27px;
  }

  .welcome-text {
    font-size: 22px;
    font-weight: 500;
    line-height: 28px;
    color: #0064e6;
  }
`;

class CongratulationsPage extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <BgWrap>
        <Bitmap bitmap={bitmap} />
        <Logo>
          <img src="/static/img/tuteria/logo_signup.png" />
        </Logo>
        <TestResultContentStyle>
          <Avatar image={user.profile_pic} />
          <Heading
            css={`
              padding-top: ${spacing.m};
            `}
          >
            Bravo!
          </Heading>
          <Heading
            small
            css={`
              color: #0064e6;
            `}
          >
            Welcome to Tuteria Family
          </Heading>

          <p className="body-text">
            We’re super excited to have you on board {user.first_name}. Your
            profile is now active and clients can now see your profile. Expect
            your first client soon!
          </p>

          <ButtonWithIcon
            big
            icon="home"
            primary
            css={`
              width: 70%;
            `}
            onClick={this.props.nextPage}
          >
            {/* <Icon name="home" /> */}
            <span>Head to Your Dashboard</span>
          </ButtonWithIcon>
        </TestResultContentStyle>
      </BgWrap>
    );
  }
}

export const BgWrap = styled.div`
  //   height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

export const Logo = styled.div`
  width: 200px;
  height: 68px;
  background: #fbf9fc;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  margin-bottom: 42px;
  margin-top: 22px;
  ${css`
    ${props => props.css};
  `} & img {
    width: 100%;
  }
`;

export const Avatar = styled.div`
  height: 174px;
  width: 174px;
  min-height: 174px;
  min-width: 174px;
  border-radius: 100%;
  background-image: url(${props => props.image});
  background-size: 114%;
  background-repeat: no-repeat;
  background-position: center;
  ${css`
    ${props => props.css};
  `};
`;

export const Bitmap = styled.div`
  background-image: url(${props => props.bitmap});
  background-repeat: round;
  height: 300px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  ${css`
    ${props => props.css};
  `};
`;

export default CongratulationsPage;
