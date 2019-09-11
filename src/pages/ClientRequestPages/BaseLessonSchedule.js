import React from "react";
import styled from "styled-components";
import find from "lodash/find";
import { ClientPageWrapper, ProceedButton } from "./ClientPageWrapper";
import { PriceSummaryComponent } from "./PricingComponent";
import { SecondaryButton } from "../../simple/Button";
import { getLessonDetails, formatDate } from "../../utils";
import { InputComponent } from "../../form";
import {
  MultiselectComponent,
  RadioComponent as NRadioComponent,
  DropdownComponent as NDropdownComponent
} from "../SubjectDetailsPage/question-types";
import { Div } from "../../primitives";
import { color, xs } from "../../siteStyle";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import { DatePickerComponent } from "./DatePickerComponent/index";
import { spacing } from "../../design-systems";
import { Text, Heading } from "../components";
export { NRadioComponent, NDropdownComponent };
// function applyCoupon({discount=0}){

// }

export const RightSectionStyle = `
max-width: 400px;
width: 100%;
margin: 0 48px;

@media (max-width: ${xs}px) {
  width: 100%;
  max-width: 100%;
}
`;

export class BaseScheduleComponent extends React.Component {
  state = {
    request_details: this.props.data || {},
    baseRate: this.props.baseRate,
    discoutIsOpen: false,
    coupon: "",
    invalid: false,
    position: "fixed",
    hidden: false,
    display: false,
    coup: false
  };
  input = null;
  updateStates = obj => {
    let request_details = { ...this.state.request_details, ...obj };
    if (Object.keys(obj).indexOf("hours") > -1) {
      request_details = {
        ...request_details,
        transport_fare: this.determinePerHour(obj.hours)
      };
    }
    this.setState({ request_details });
  };
  updateState = (key, value) => {
    let request_details = { ...this.state.request_details, [key]: value };
    if (key === "hours") {
      request_details = {
        ...request_details,
        transport_fare: this.determinePerHour(value)
      };
    }

    this.setState({ request_details, position: "fixed" });
  };
  componentDidMount() {
    let {
      data: { hours }
    } = this.props;
    this.updateState("hours", hours);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.request_details.per_hour !== nextProps.data.per_hour) {
      this.setState({
        request_details: {
          ...nextProps.data,
          transport_fare: this.determinePerHour(
            nextProps.data.hours,
            nextProps.data.per_hour
          )
        }
      });
    }
  }
  baseHourlyRate(hour, rate) {
    let { onPlan, planFactors = {} } = this.props;
    let {
      request_details: { per_hour, ...rest }
    } = this.state;
    let newPerHour = rate || per_hour;
    return onPlan ? newPerHour * (planFactors[rest.plan] || 1) : newPerHour;
  }
  determinePerHour(hour, rate) {
    let { hourFactors } = this.props;
    let {
      request_details: { transport_fare = 0 }
    } = this.state;
    let days = this.state.request_details.days || [];
    console.log({ days });
    let hour_rate = days.length === 1 ? hour * 1.4 : hour;

    let newPerHour = this.baseHourlyRate(hour_rate, rate);
    console.log({ newPerHour });
    if (Boolean(hour)) {
      let factor = find(hourFactors, x => x.hour == hour);
      if (Boolean(factor)) {
        transport_fare = (newPerHour * factor.factor) / 100;
      } else {
        transport_fare = 0;
      }
    }
    console.log({ transport_fare });
    return transport_fare;
  }
  customDisplaySummary = () => {
    let { request_details = {} } = this.state;
    let { onPlan = false } = this.props;
    let condition =
      Boolean(request_details.hours) &&
      Array.isArray(request_details.days) &&
      request_details.days.length > 0 &&
      Boolean(request_details.start_date) &&
      Boolean(request_details.no_of_weeks);
    return onPlan ? condition && request_details.plan : condition;
  };
  displaySummary() {
    let { isValidCondition = this.customDisplaySummary } = this.props;
    return isValidCondition(this.state.request_details || {});
  }
  getLessonDetails() {
    let {
      request_details: { no_of_weeks, days, start_date }
    } = this.state;
    let wks = no_of_weeks > 3 ? 4 : no_of_weeks;
    let result = getLessonDetails(wks, days, start_date);
    return result;
  }
  updateSelectedDay = (day, checked) => {
    const { days } = this.state;
    const selectedDay = find(days, x => x.text === day);
    const selectedDayIndex = days.findIndex(x => x.text === day);
    const updatedDay = { ...selectedDay, isChecked: checked };
    this.setState({
      days: [
        ...this.state.days.slice(0, selectedDayIndex),
        updatedDay,
        ...this.state.days.slice(selectedDayIndex + 1)
      ]
    });
  };
  withPlan(per_hour, plan) {
    let { onPlan, planFactors = {} } = this.props;
    return onPlan ? per_hour * (planFactors[plan] || 1) : per_hour;
  }
  getHourRate() {
    let {
      request_details: { per_hour, hours, days = [], transport_fare, plan }
    } = this.state;
    per_hour = this.withPlan(per_hour, plan);
    console.log({ per_hour, plan, transport_fare });
    console.log(this.props.hourFactors);
    let factor = [0, 1].includes(days.length)
      ? this.props.oneWeekFactor || 1.4
      : 1;
    // let new_transport_fare = this.determinePerHour(hours, per_hour);
    // return Boolean(hours) ? per_hour + new_transport_fare : per_hour;
    return Boolean(hours)
      ? per_hour * factor + transport_fare
      : per_hour * factor;
  }
  defaultCustomPricing = (lessonCount, hourlyRate, _) => {
    return lessonCount * hourlyRate * this.getHoursValue();
  };
  calculatePrice() {
    let { lessonCount } = this.getLessonDetails();
    let {
      request_details: { per_hour }
    } = this.state;
    let { customCondition = this.defaultCustomPricing } = this.props;
    let result = customCondition(
      lessonCount,
      this.getHourRate(),
      this.state.request_details
    );
    console.log({ pricing: result });
    return Number.isInteger(result) ? result : Math.ceil(result / 10) * 10;
  }
  currency = (number = "") => `₦${number.toLocaleString()}`;
  getTotalPrice() {
    let { request_details } = this.state;
    return this.displaySummary()
      ? // ? this.currency(this.determineTotalPrice())
        this.currency(this.textualTotalDisplay())
      : `${this.currency(this.getHourRate())}`;
  }
  breakdownPrice() {
    let {
      request_details: { earning_rate = 1 }
    } = this.state;
    return this.displaySummary()
      ? // ? this.currency(this.determineTotalPrice())
        this.currency(this.textualTotalDisplay() * earning_rate)
      : `${this.currency(this.getHourRate() * earning_rate)}`;
  }
  getTransportFare(transport_fare) {
    // let { lessonCount } = this.getLessonDetails();

    return transport_fare;
    // return lessonCount * transport_fare;
  }
  determineTotalPrice(processing = true) {
    let {
      request_details: { processing_fee = 0, transport_fare }
    } = this.state;
    return processing
      ? this.calculatePrice() + processing_fee
      : // +
        // this.getTransportFare(transport_fare)
        this.calculatePrice();
  }
  generateBothTextAndValueDiscount = () => {
    let {
      request_details: { discount },
      discoutIsOpen
    } = this.state;
    let text =
      discount > 0 ? (
        "Discount"
      ) : discoutIsOpen ? (
        <InputComponent
          placeholder="Enter coupon code"
          small
          error={this.state.invalid}
          ref={node => (this.input = node)}
          value={this.state.coupon}
          errorMessage={"The discount code is invalid or has expired"}
          updateText={value => this.setState({ coupon: value })}
          onMouseOut={e => {
            e.target.blur();
          }}
          css={`
            width: 90%;
          `}
        />
      ) : (
        <a
          onClick={() => {
            this.setState({ discoutIsOpen: true });
          }}
          style={{ color: color.green.primary, cursor: "pointer" }}
        >
          Discount code ?
        </a>
      );
    let value =
      discount > 0 ? (
        this.currency(this.determineDiscount())
      ) : discoutIsOpen ? (
        <SecondaryButton
          disabled={this.state.coup}
          onClick={this.couponCheck}
          small
        >
          Apply
        </SecondaryButton>
      ) : null;
    return { text, value };
  };
  determineDiscount() {
    let {
      request_details: { discount = 0 }
    } = this.state;
    return Math.ceil((this.determineTotalPrice() * discount) / 1000) * 10;
  }
  couponCheck = e => {
    e.preventDefault();
    if (this.input) {
      debugger;
    }
    if (this.state.coupon === "") {
      this.setState({ invalid: true });
    } else {
      this.setState({ coup: true });
      this.props.checkCoupon(this.state.coupon, discount => {
        this.setState({
          coup: false,
          request_details: { ...this.state.request_details, discount },
          invalid: !Boolean(discount)
        });
      });
    }
  };
  displaySections() {
    let result = this.getLessonDetails();
    let { display_discount = true } = this.props;
    let {
      request_details: { hours, processing_fee, per_hour, transport_fare }
    } = this.state;
    let summary1 = [
      {
        text: `${this.currency(this.getHourRate())} x ${hours} hr${hours > 0 &&
          "s"} x ${result.lessonCount} lessons`,
        value: this.currency(this.calculatePrice())
      }
    ];
    if (display_discount) {
      summary1.push(this.generateBothTextAndValueDiscount());
    }
    if (processing_fee > 0) {
      summary1.push({
        text: "Service fee",
        value: `${this.currency(processing_fee)}`,
        summary:
          "This is required to process your request and get you the best tutors closest to you. It's a sign of commitment shown on your part."
      });
    }
    // if (hours < 2) {
    //   summary1.push({
    //     text: "Transport Fare",
    //     value: this.currency(this.getTransportFare(transport_fare))
    //   });
    // }
    return this.displaySummary()
      ? [
          this.props.showLessonBreakdownSection
            ? [
                {
                  text: "Hourly rate",
                  value: `${this.currency(this.getHourRate())}/hr`,
                  summary:
                    "This is based on average prices tutors charge in your location assuming you teach 2-hour lessons 3 times a week. How much you actually make may vary with your pricing, location, subjects, demand and other factors."
                },
                {
                  text: "Hours/day",
                  value: this.getHours("hr")
                },
                {
                  text: "Number of lessons",
                  value: `${result.lessonCount} lessons`
                }
              ]
            : [],
          summary1,
          [
            {
              text: "Total",
              value: this.currency(
                this.determineTotalPrice() - this.determineDiscount()
              )
            }
          ]
        ]
      : [
          // [
          //   {
          //     text: "Hours/day",
          //     value: "-"
          //   },
          //   {
          //     text: "Number of lessons",
          //     value: "-"
          //   }
          // ],
          // [{ text: "Total", value: "-" }]
        ];
  }
  textualTotalDisplay() {
    return this.determineTotalPrice() - this.determineDiscount();
  }
  getPriceHeading() {
    return this.displaySummary() ? "Total cost" : "";
  }
  getDuration() {
    let { end_date, start_date } = this.getLessonDetails();
    return this.displaySummary()
      ? {
          start: formatDate(start_date),
          end: formatDate(end_date)
        }
      : {
          start: "-",
          end: "-"
        };
  }
  getHoursValue = () => {
    let {
      request_details: { hours, shared, classes }
    } = this.state;
    return shared > 1 ? hours * classes.length : hours;
  };
  getHours = (unit = "hour") => {
    let {
      request_details: { hours }
    } = this.state;
    let hrs = hours;
    return `${hrs} ${unit}${hrs > 1 ? "s" : ""}`;
  };
  isValid = () => {
    let {
      request_details: { time_of_lesson }
    } = this.state;
    return Boolean(time_of_lesson);
  };
  onSubmit = () => {
    let { end_date } = this.getLessonDetails();
    let { lessonCount } = this.getLessonDetails();
    if (this.isValid()) {
      this.props.onSubmit({
        ...this.state.request_details,
        end_date,
        budget: this.determineTotalPrice(false) - this.determineDiscount(),
        lessonCount
      });
    } else {
      this.setState({ display: true });
    }
  };
  rootform = state => {
    let {
      date_options = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM"
      ]
    } = this.props;
    const MultiselectComponentStyle = `
      .multi-select {
        label {
          margin-right: 14px;
          padding-left: ${spacing.xl};
        }
      }
    `;
    const FormFieldsContainerStyle = `
    @media(max-width: 966px) {
      display: block!important;

      div {
        width: 100%!important;
        &:first-of-type {
          margin-bottom: 32px;
        }
      }
    }
  `;
    return (
      <React.Fragment>
        {MultiselectComponent({
          name: "What days do you want lessons to hold?",
          options: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          labelCss: "min-width: 96px;",
          css: MultiselectComponentStyle
        })(state.days, days => this.updateState("days", days))}
        <FormFieldsContainer
          cssProps={spacing.xl}
          extraCss={FormFieldsContainerStyle}
        >
          <DatePickerComponent
            field_name="start_date"
            label="When do you want to start?"
            onFocus={() => this.setState({ position: "block", hidden: true })}
            onBlur={() =>
              this.setState({
                position: "fixed",
                hidden: false
              })
            }
            value={state.start_date}
            onChange={val => this.updateState("start_date", val)}
          />
          {NDropdownComponent({
            name: "For how long?",
            useDefault: true,
            defaultText: "Select Duration",
            options: [
              { value: 1, text: "1 week" },
              { value: 2, text: "2 weeks" },
              { value: 3, text: "3 weeks" },
              { value: 4, text: "1 month" }
              // { value: 8, text: "2 months" },
              // { value: 12, text: "3 months" },
              // { value: 24, text: "6 months" },
              // { value: 48, text: "1 year" }
            ]
          })(state.no_of_weeks, val => this.updateState("no_of_weeks", val))}
        </FormFieldsContainer>
        <FormFieldsContainer
          cssProps={spacing.xl}
          extraCss={FormFieldsContainerStyle}
        >
          <Div
            css={`
              @media (max-width: ${xs}px) {
                width: 100% !important;
              }
            `}
          >
            {NDropdownComponent(
              {
                name: "How many hours per day?",
                defaultText: "Select",
                useDefault: true,
                options: [
                  { value: 1, text: "1 hour" },
                  { value: 1.5, text: "1 hour 30 min" },
                  { value: 2, text: "2 hours" },
                  { value: 3, text: "3 hours" },
                  { value: 4, text: "4 hours" },
                  { value: 5, text: "5 hours" },
                  { value: 6, text: "6 hours" },
                  { value: 7, text: "7 hours" },
                  { value: 8, text: "8 hours" },
                  { value: 9, text: "9 hours" },
                  { value: 10, text: "10 hours" }
                ]
              },
              { direction: "up" }
            )(state.hours, hours => this.updateState("hours", hours))}
          </Div>
          <Div
            css={`
              @media (max-width: ${xs}px) {
                width: 100% !important;
              }
            `}
          >
            {NDropdownComponent(
              {
                name: "From what time?",
                useDefault: true,
                defaultText: "Select",
                options: date_options
              },
              { direction: "up", error_message: "Please select an option" }
            )(
              state.time_of_lesson,
              time_of_lesson =>
                this.updateState("time_of_lesson", time_of_lesson),
              () => this.state.display && !Boolean(state.time_of_lesson)
            )}
          </Div>
        </FormFieldsContainer>
      </React.Fragment>
    );
  };
  render() {
    let state = this.state.request_details || {};
    let {
      extraForms = () => null,
      order = "bottom",
      heading = "Lesson schedule",
      description = "How long you need a tutor for and what time?",
      proceedButtonText,
      type = "schedule",
      showProceedButton,
      showLoadingButton = false,
      css,
      showBreakdown,
      loading
    } = this.props;
    let extraFormsResult = extraForms(state, this.getHours, this.updateState);

    return (
      <ClientPageWrapper
        current={3}
        heading={heading}
        showLoadingButton={showLoadingButton}
        showBackButton={this.props.showBackButton}
        backAction={this.props.backAction}
        description={description}
        onSubmit={this.onSubmit}
        loadingButtonText="Book Lesson"
        loading={loading}
        isValid={
          this.props.disabled ||
          !this.displaySummary() ||
          !Boolean(this.state.request_details.time_of_lesson)
        }
        rightSection={
          <Div css={RightSectionStyle}>
            <PriceSummaryComponent
              {...this.getDuration()}
              price={this.getTotalPrice()}
              breakdownPrice={this.breakdownPrice()}
              priceHeading={this.getPriceHeading()}
              sections={this.displaySections()}
              className="tool-tip"
              type={type}
              is_per_hour={!this.displaySummary()}
              onSubmit={this.onSubmit}
              hidden={this.state.hidden}
              loading={this.props.loading}
              disabled={
                this.props.disabled ||
                !this.displaySummary() ||
                !Boolean(this.state.request_details.time_of_lesson)
              }
              showProceedButton={showProceedButton}
              position={this.state.position}
              buttonText={proceedButtonText}
              showBreakdown={showBreakdown}
            />
          </Div>
        }
        css={`
          display: flex;
          ${css || ""}
          @media (max-width: ${xs}px) {
            display: flex;
            padding-bottom: ${spacing.m};
            flex-direction: column;
          }
          .tool-tip {
            width: inherit;
            max-width: inherit;
            margin: 0 !important;
            position: fixed;
            @media (max-width: ${xs}px) {
              overflow-y: scroll;
            }
          }
        `}
      >
        {order === "top" ? extraFormsResult : null}
        {this.rootform(state)}
        {order === "bottom" ? extraFormsResult : null}

        {/* <FormComponent
          css={`
            display: flex;
            label {
              margin-right: ${spacing.xxl};
            }
            margin-bottom: ${spacing.s};
          `}
          label="How many tutors do you need?"
        >
          <IncrementComponent
            number={state.no_of_teachers}
            incrementCallback={() =>
              this.updateState("no_of_teachers", state.no_of_teachers + 1)
            }
            decrementCallback={() =>
              state.no_of_teachers - 1 > 0
                ? this.updateState("no_of_teachers", state.no_of_teachers - 1)
                : null
            }
          />
        </FormComponent> */}
      </ClientPageWrapper>
    );
  }
}
