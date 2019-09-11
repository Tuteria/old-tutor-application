import React from "react";
import styled from "styled-components";
import { Header, panelSharedStyles, Bottom } from "./components/Heading";
import { Reviews } from "./components/Review";
import { PrimaryLinkButton } from "../../src/simple/Button";
import { Text, Heading } from "../../src/simple/Text";
import { color } from "../../src/design-systems";

const PanelContainer = styled.div`
  display: flex;
  ${panelSharedStyles};
  .recommendations__content {
    flex: 1 1 auto;
  }
  @media (max-width: 703px) {
    flex-direction: column;
  }
`;

const TutorDetails = ({ data }) => {
  const { image, years_of_experience, ...rest } = data;
  return (
    <PanelContainer>
      <Image {...{ image, years_of_experience }} />
      <Body className="recommendations__content" {...rest} />
    </PanelContainer>
  );
};

const Panel1 = ({ data }) => (
  <div>
    {data.map((data, i) => (
      <TutorDetails data={data} key={i.toString()} />
    ))}
  </div>
);

const Button = () => (
  <div className="recommendations__result-actions visible-xs">
    <a
      className="recommendations__hire-btn btn btn-primary btn-lg btn-block"
      href="/tutors/select/3LSFPZ9DAK2X/okons"
    >
      Select &amp; Continue
    </a>

    <div className="recommendations__review-link profile_link" href="#">
      <h5 className="font-head brightgreen">More than 6 years experience</h5>
    </div>
  </div>
);

const BodyStyle = styled.div`
  .recommendations__result {
    padding-left: 32px;
    @media (max-width: 703px) {
      padding-left: 0;
    }
  }
  .recommendations__result__heading {
    .recommendations__result__name-price {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
    }
    .recommendations__result__tutor-name {
      h1 > span {
        font-size: 14px;
        color: ${color.green.primary};
        padding-left: 8px;
      }
    }
    .recommendations__result__price {
      border-radius: 100px;
      line-height: 46px;
      color: #0d7488;
      background-color: #dcf3f8;
      padding: 0 16px;
      vertical-align: middle;
    }
    .recommendations__result__tutor-headline {
      padding-bottom: 8px;
    }
    .recommendations__result__tutor-info {
      display: flex;
      list-style: none;
      padding: 0;

      .recommendations__result__tutor-info__item {
        padding-right: 24px;
        font-size: 14px;
        color: ${color.gray.primary};

        path {
          fill: ${color.blue.lighter};
        }

        .rate {
          path {
            fill: ${color.orange.lighter};
          }
        }
      }
    }
  }
  .recommendations__result__description {
    .recommendations__result__description-section {
      margin-bottom: 16px;
    }
  }
`;

const Body = ({
  className,
  verified,
  name,
  bio,
  vicinity,
  city,
  lesson_location,
  ratings,
  hours_taught,
  headline,
  education,
  certifications,
  subjects,
  help_text,
  levels,
  price
}) => (
  <BodyStyle className={className}>
    <div className="recommendations__result">
      <div className="recommendations__result__heading">
        <div className="recommendations__result__name-price">
          <div className="recommendations__result__tutor-name">
            <Heading big>
              {name}
              {verified ? <span>(ID Verified)</span> : null}
            </Heading>
          </div>
          <div className="recommendations__result__price">
            <Text bold>₦{price}</Text>
          </div>
        </div>
        <div className="recommendations__result__tutor-headline">
          <Text big color={color.gray.primary}>
            {headline}
          </Text>
        </div>
        <ul className="recommendations__result__tutor-info">
          <li className="recommendations__result__tutor-info__item">
            <i className="fa fa-clock" /> {hours_taught} Hours Taught
          </li>

          <li
            data-location="Ikeja, Lagos"
            className="recommendations__result__tutor-info__item"
          >
            <i className="fa fa-map-marker" /> {vicinity}, {city}
          </li>

          <li className="recommendations__result__tutor-info__item">
            <span className="rate">
              <i className="fa fa-star" />

              <i className="fa fa-star" />

              <i className="fa fa-star" />

              <i className="fa fa-star" />

              <i className="fa fa-star" />
            </span>{" "}
            (1)
          </li>
        </ul>
        <hr />
      </div>
      <div className="recommendations__result__description">
        <div className="recommendations__result__description-section">
          <Heading small>How I can help:</Heading>
          <Text color={color.gray.primary}>{help_text}</Text>
        </div>

        <div className="recommendations__result__description-section">
          <Text color={color.gray.primary}>
            <em>
              nsini teaches{" "}
              {subjects.map((subject, i) => (
                <span>{subject}, </span>
              ))}
            </em>
          </Text>
        </div>

        <div className="recommendations__result__description-section">
          <Text color={color.gray.primary}>
            <span>Levels Taught: </span>
            {levels.map((value, i) => (
              <span>{value}, </span>
            ))}
          </Text>
        </div>

        <div>
          <Heading small>Lessons hold at {lesson_location}</Heading>
          <Text color={color.gray.primary}>
            When you book lessons, nsini will usually travel anywhere at most
            5km (~ 30mins drive ) from Ikeja to deliver lessons.
          </Text>
        </div>
      </div>
      <hr />
      {education.length > 0 && (
        <React.Fragment>
          <div className="recommendations__result__education">
            <Heading small>Education History</Heading>
            {education.map((value, i) => (
              <Text color={color.gray.primary} key={i.toString()}>
                {value}
              </Text>
            ))}
          </div>
          <hr />
        </React.Fragment>
      )}
      {certifications.length > 0 && (
        <React.Fragment>
          <div className="recommendations__result__certification">
            <Heading small>Certificate & Awards</Heading>
            {certifications.map((certification, i) => (
              <Text color={color.gray.primary} key={i.toString()}>
                {certification}
              </Text>
            ))}
          </div>
          <hr />
        </React.Fragment>
      )}
      {bio && (
        <React.Fragment>
          <div className="recommendations__result__about">
            <Heading small>A bit about nsini</Heading>
            <Text color={color.gray.primary}>{bio}</Text>
          </div>
          <hr />
        </React.Fragment>
      )}
    </div>
  </BodyStyle>
);

const ImageContainer = styled.div`
  .recommendations__result-actions {
    padding-top: 16px;
  }
  .recommendations__review-link {
    padding: 8px 0;
  }
  .select-button {
    width: 100%;

    @media (max-width: 703px) {
      width: 230px;
    }
  }
`;
const Image = ({ image, years_of_experience }) => (
  <ImageContainer>
    <div>
      <img
        alt="nsini"
        height="161"
        src={image}
        width="227"
        data-pagespeed-url-hash="898880902"
        onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
      />
    </div>
    <div className="recommendations__result-actions hidden-xs">
      <PrimaryLinkButton
        className="select-button"
        href="/tutors/select/3LSFPZ9DAK2X/okons"
      >
        Select
      </PrimaryLinkButton>
      <div className="recommendations__review-link" href="#">
        <Text bold small color={color.green.primary}>
          More than {years_of_experience} years experience
        </Text>
      </div>
    </div>
  </ImageContainer>
);

const Main = styled.main`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  padding: 0 15px;
  margin: 0 auto;
`;
export class SearchPage extends React.Component {
  render() {
    return (
      <Main>
        <Container>
          <div className="starter-template">
            <Header />
            <div className="panel">
              <Panel1 data={this.props.data} />
            </div>
            <Bottom />
          </div>
        </Container>
      </Main>
    );
  }
}
