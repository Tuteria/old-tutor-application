//@flow
import React from "react";
import styled from "styled-components";
import { NavBar } from "../../../compound/Navigation";
import {
  ReviewSection,
  IELTSTutorSection,
  FAQSection,
  TwoColumnHero,
  AuxiliarySection,
  CurriculumSection,
  PricingSection,
  RefundSection,
  ThingsToNoteSection,
  UpSellingSection,
  StickyContent
} from "../ClientRequestLandingPage/components";
import {
  device_style,
  font_weight,
  color,
  spacing,
  font_used
} from "../../../design-systems/index";
import { Div, Container } from "../../../primitives/index";
import { formatGroupDetailSelection, getLatestSchedule } from "./utils";
const MAXWIDTH = `max-width: 1024px;`;

const Divider = styled.hr`
  border-bottom: 0;
  border-top: 1px solid ${props => props.color || color.gray.ui_02};
`;
function asDate(a) {
  return new Date(a);
}
export class GroupLandingPage extends React.Component {
  scrollToPricing = () => {
    if (this.pricingSection) {
      const section = this.pricingSection.offsetTop;
      if (section) {
        window.scrollTo({
          top: section,
          behavior: "smooth"
        });
      }
    }
  };
  onClassSelected = data => {
    let payload = formatGroupDetailSelection(
      data,
      this.props.data,
      this.props.url
    );
    this.props.onClassSelected(payload);
  };
  render() {
    const { faq, faq2, contactInfo, basePath = "", url } = this.props;
    let { lessonPlan, ...data } = this.props.data;
    let pricings = lessonPlan;
    const {
      courseOutlines,
      name,
      body,
      image,
      otherTutors,
      reviews,
      location,
      exam
    } = data;
    const {
      pricing_subtext,
      pricing_text,
      call_to_action_text,
      call_to_action_subtext
    } = body;
    let latestSchedule = getLatestSchedule(lessonPlan);
    let remainingSlot = 0;
    if (latestSchedule) {
      remainingSlot = latestSchedule.maxSlotCount - latestSchedule.slots;
    }
    return (
      <React.Fragment>
        <NavBar />
        <TwoColumnHero
          data={{
            ...data,
            location: `${data.location.name}, ${data.location.state}`
          }}
          remainingSlot={remainingSlot}
          onClick={this.scrollToPricing}
          date={latestSchedule && asDate(latestSchedule.startDate).getTime()}
        />
        <Divider />
        <AuxiliarySection data={body} />
        <Divider />
        <IELTSTutorSection name={name} tutors={data.tutors} />
        <ReviewSection
          textAlign="center"
          reviews={data.reviews}
          heading={`Student reviews`}
        />
        <Divider />
        <CurriculumSection
          heading={`World-class ${exam} Curriculum`}
          subheading={`Lesson covers all ${
            courseOutlines.length
          } modules of the ${exam} test using in-depth techniques and a lot of practice guaranteed to help you get a high score. `}
          courseOutlines={courseOutlines}
        />
        <RefundSection
          heading={call_to_action_text}
          subheading={call_to_action_subtext}
          button_text="Join a Class"
          onClick={this.scrollToPricing}
        />
        <div ref={node => (this.pricingSection = node)}>
          <PricingSection
            heading={pricing_text}
            subheading={pricing_subtext}
            plans={pricings}
            onClassSelected={this.onClassSelected}
          />
        </div>
        <Divider />
        <UpSellingSection
          heading="Similar group lessons you can join in Lagos"
          basePath={basePath}
          lessons={otherTutors.map(tutor => ({
            ...tutor,
            title: body.heading_main,
            image,
            url: `${basePath}/${tutor.url}`
          }))}
        />
        <Divider />
        <ThingsToNoteSection heading="Keep these in mind " items={faq} />
        <Divider />
        <FAQSection
          {...{
            heading: `Your questions answered`,
            alignHeading: "center",
            contactSectionDirection: "column",
            contactSectionAlignItems: "start",
            svgColor: color.blue.primary,
            bgColor: "#E7F0FC",
            width: "70vw",
            FAQs: faq2.map(({ heading, description }) => ({
              question: heading,
              answer: description
            })),
            contactInfo,
            highlighted:
              "click {Link: https://www.tuteria.com/s/ielts-tutors/ here to get an IELTS tutor}",
            newString: "click here to get an IELTS tutor",
            css: `
            & > h1 {
              ${font_used.hero_heading};
              color: ${color.gray.primary};
            }
            .faq-block__item {
              p {
                color: ${color.gray.primary};
              }
            }
            .contact-us {
              margin-bottom: ${spacing.max};
              & > p {
                color: ${color.gray.primary};
              }
              .contact-info {
                padding-top: ${spacing.m};
                flex-flow: row wrap;
            
                .TextWithIcon {
                  color: #212529;
                  margin-right: ${spacing.xl};
                  text-decoration: none!important;

                  .Text {
                    font-weight: normal!important;
                    color: ${color.gray.primary};
                  }
                }
              }
            }`
          }}
        />
        <Divider />
        <StickyContent
          onClick={this.scrollToPricing}
          name={`${exam} Lessons in ${location.name} `}
          reviews={reviews}
          tutors={
            Array.isArray(data.tutors) && data.tutors.length > 0
              ? [data.tutors[0]]
              : []
          }
          button_text="Join a Class"
        />
      </React.Fragment>
    );
  }
}
