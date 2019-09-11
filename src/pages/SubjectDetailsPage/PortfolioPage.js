import React from "react";
import styled, { css } from "styled-components";
import {
  NoticeAction,
  FormComponent,
  ApplicationTooltip,
  UploadComponent
} from "../components";
import Icon from "../../simple/Icon";
import Wrapper from "./Wrapper";
import Dropzone from "react-dropzone";
import { Heading, Text } from "../../simple/Text";
import { spacing, text_color } from "../../siteStyle";
import { FormsetComponent } from "./question-types";
import { PortfolioForm } from "./question-types/FormsetComponent";
import { RenderImageHeading } from "../../compound/EditableFormContainer";

const PageNoticeAction = styled(NoticeAction)`
  & p.note {
    line-height: 24px;
    color: #484848;
    font-size: 17px;
    padding-left: 7px;
    padding-right: 38.5px;
    & ul {
      margin-bottom: 0;
      & li {
        font-size: 15px;
        font-weight: 300;
        line-height: 26px;
      }
    }
  }
`;
const MyFormComponent = styled(FormComponent)`
  padding-top: 4px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  &:not(:only-child):first-child {
    padding-bottom: 46px;
    border-bottom: 1px solid #f0f0f0;
  }
`;
const InfoHeader = styled.div`
  clear: left;
  padding: 14px 0;
  & h3 {
    font-size: 22px;
    line-height: 28px;
    margin: 0;
    padding-bottom: 9px;
  }
  & p {
    color: #484848;
    font-size: 17px;
    line-height: 18px;
  }
`;

const Div = styled.div`
  ${props => props.css};
`;
export const StyledDropZone = styled(Dropzone)`
  ${props =>
    css`
      ${props.css};
    `};
`;
export const shared = `
    position: relative;
    min-height: 270px;
    max-width: 350px;
    margin-bottom: 16px;
    & img {
      max-width: 100%;
      max-height: 100%;
    }
    & button {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      cursor: pointer;
      background: rgba(54, 179, 126, 0.69);
      color: #ffffff;
      font-size: 19px;
      line-height: 24px;
      border: none;
      padding: 15px 24px;
    }
    & p {
      color: #484848;
      font-size: 17px;
      line-height: 24px;
      & input[type="file"] {
        position: absolute;
        visibility: hidden;
      }
      & a {
        color: #36b37e;
        &:hover{
          cursor: pointer;
        }
      }
    }`;

class UploadedComponent extends React.Component {
  afterUpload = image => {
    this.props.addImage(image);
  };
  componentDidMount() {
    this.afterUpload(this.props.image);
  }
  getStyle = () => {
    const uploadStyle = `
    ${shared}
    width: 100%;
    border: 1px dashed #b2b2b2;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
    & div {
      text-align: center;
    }
    `;
    return uploadStyle;
  };
  onDrop = (accepted, rejected) => {
    this.afterUpload(accepted[0].preview);
  };
  render() {
    return (
      <UploadComponent
        postAction={this.afterUpload}
        image={""}
        render={(uploadInput, onClick) => {
          return (
            <StyledDropZone
              css={this.getStyle()}
              accept="image/jpeg, image/png"
              onDrop={this.onDrop}
            >
              <div>
                <Icon name="image" />
              </div>
              <p style={{ paddingTop: 16 }}>
                {uploadInput}
                Drag a Photo or{" "}
                <a
                  style={{
                    display: "block",
                    fontWeight: 700,
                    color: "#36B37E"
                  }}
                  onClick={onClick}
                >
                  Browse
                </a>
              </p>
            </StyledDropZone>
          );
        }}
      />
    );
  }
}
export const FileUpload = ({
  portfolios = [],
  deleteImage,
  setBackground,
  addImage,
  maxLength = 6,
  styling = ``,
  banner = true
}) => {
  return (
    <Div
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        ${styling};
      `}
    >
      {portfolios.map((p, index) => {
        return (
          <Div
            onClick={() => (banner ? deleteImage(index) : null)}
            css={css`
              border: 1px solid #484848;
              ${shared};
              svg path {
                fill: ${p.background ? "gold" : "white"};
              }
              background-image: url(${p.image});
              height: 270px;
              width: 350px;
              margin-bottom: 16px;
              background-position: center;
              background-size: cover;
            `}
          >
            <button
              onClick={e => {
                e.preventDefault();
                if (banner) {
                  setBackground(p.background ? null : index);
                } else {
                  deleteImage(index);
                }
              }}
            >
              {banner && <Icon name="star" />}
              <span style={{ paddingLeft: 4 }}>
                {banner ? "Set as cover photo" : "Remove background"}
              </span>
            </button>
          </Div>
        );
      })}
      {portfolios.length < maxLength ? (
        <UploadedComponent addImage={addImage} />
      ) : null}
    </Div>
  );
};

class PortfolioPage extends React.Component {
  state = {
    portfolios: this.props.portfolios || [],
    background: this.props.background,
    formset: this.props.formset || []
  };
  formset = null;
  setBackground = background => {
    this.setState({ background });
  };
  onAddForm = data => {
    this.setState({ formset: data });
  };
  deleteImage = index => {
    let portfolios = this.state.portfolios.filter((x, i) => i !== index);
    this.setState({ portfolios });
  };
  addImage = image => {
    if (!!image) {
      this.setState({ portfolios: [...this.state.portfolios, image] });
    }
  };
  validateForm = () => {
    return this.props.validateAction(this.state, this.formset);
  };
  nextPage = () => {};
  render() {
    return (
      <Wrapper
        step={3}
        disableNextScreen={false}
        toolTip={
          <ApplicationTooltip
            heading="Upload only your best work"
            style={{ marginTop: "185px" }}
          >
            <p>
              36% of Tutors who upload their best works get more deals than
              those who don’t. <strong>So why not upload yours?</strong>
            </p>
          </ApplicationTooltip>
        }
        canSubmit={() => this.validateForm()}
        {...this.props}
      >
        {({ width, position, subject }) => {
          let { questions } = this.props;
          let heading = Boolean(questions.portfolio.heading)
            ? questions.portfolio.heading
                .replace("[Skill]", subject.name)
                .replace("[skill]", subject.name)
            : "Add a Gallery or Portfolio (optional)";
          let subtitle = Boolean(questions.portfolio.project)
            ? "Add up to 3 projects you’ve worked on in the past"
            : "Upload 2-6 high quality exhibits of your work to showcase your expertise.";

          return (
            <div>
              <InfoHeader>
                <Heading
                  small
                  css={css`
                    padding-bottom: ${spacing.s};
                    color: ${text_color.primary};
                  `}
                >
                  {heading}
                </Heading>
                <Text
                  css={css`
                    color: ${text_color.secondary};
                    padding-bottom: ${spacing.m};
                  `}
                >
                  {subtitle}
                </Text>
              </InfoHeader>
              <MyFormComponent>
                {Boolean(questions.portfolio.project) ? (
                  FormsetComponent(
                    [
                      "Project Title",
                      "A little description of what you did",
                      "Upload a picture of your work"
                    ],
                    "portfolio",
                    ["title", "description", "images"],
                    {
                      title: ["This field is required"],
                      description: ["This field is required"],
                      images: ["This field is required"]
                    },
                    PortfolioForm,
                    state => {
                      return (
                        Boolean(state.title) &&
                        Boolean(state.description) &&
                        Boolean(state.images) &&
                        state.images.length > 0
                      );
                    },
                    true
                  )(
                    this.state.formset,
                    this.onAddForm,
                    formset => (
                      <RenderImageHeading image={formset.images[0].image}>
                        <Div>
                          <Heading>{formset.title}</Heading>
                          <Text>{formset.description.slice(0, 15)}</Text>
                        </Div>
                      </RenderImageHeading>
                    ),
                    node => (this.formset = node)
                  )
                ) : (
                  <FileUpload
                    portfolios={this.state.portfolios.map((x, i) => ({
                      image: x,
                      background: i === this.state.background
                    }))}
                    deleteImage={this.deleteImage}
                    setBackground={this.setBackground}
                    addImage={this.addImage}
                  />
                )}
                <PageNoticeAction
                  style={{ marginBottom: 10 }}
                  bgColor="rgba(54,179,126,0.1)"
                  borderColor="#36B37E"
                  condition={true}
                >
                  <div>
                    <p className="note">
                      <ul>
                        <li>
                          Image should not contain any contact information such
                          as email or phone.
                        </li>
                        <li>
                          Upload high quality images to attract the best
                          clients.
                        </li>
                        <li>
                          Only upload YOUR OWN work. Don’t copy from the
                          internet
                        </li>
                      </ul>
                    </p>
                  </div>
                </PageNoticeAction>
              </MyFormComponent>
            </div>
          );
        }}
      </Wrapper>
    );
  }
}
export default PortfolioPage;
