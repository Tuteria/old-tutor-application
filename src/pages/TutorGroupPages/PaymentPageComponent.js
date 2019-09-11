import React from "react";
import styled, { injectGlobal } from "styled-components";
import ReactModal from "react-modal";
import { spacing, font_used, font_weight } from "../../design-systems";
import {
  ClientPageWrapper,
  ProceedButton
} from "../ClientRequestPages/ClientPageWrapper";
import { PriceSummaryComponent } from "../ClientRequestPages/PricingComponent";
import { IncrementComponent, DropdownComponent } from "../../form";

import {
  BaseScheduleComponent,
  NDropdownComponent,
  RightSectionStyle,
  NRadioComponent
} from "../ClientRequestPages/BaseLessonSchedule";

import { Div } from "../../primitives";
import {
  xs,
  Heading,
  Text,
  PrimaryButton,
  CloseButton,
  Icon
} from "../components";
import { color } from "../../design-systems";
import { ModalBody } from "../AboutTutorPage/ExampleModal";
import { Modal } from "../../simple/Modal";
import { TextWithIcon } from "../ExternalPages/ClientRequestLandingPage/components";
export { PrimaryButton as Button };
injectGlobal`
.ReactModal__Overlay {
  z-index: 20000;
  background-color: rgba(0, 0, 0, 0.08)!important;
}
`;

const ConfirmationModalContainer = styled(Modal)`
  max-width: 700px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 0;
  padding-top: 64px;
  padding-bottom: 64px;
  border: none;
`;

const ConfirmationModalBody = styled(ModalBody)`
  text-align: center;

  .close-button {
    outline: none;
  }

  .checkmark-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    margin: 0 auto;
    margin-bottom: 16px;
    border-radius: 50%;
    background-color: ${color.green.faint};
  }

  .heading {
    padding-bottom: 16px;
    max-width: 510px;
    margin: 0 auto;
  }
  .subheading {
    padding-bottom: 16px;
    max-width: 350px;
    margin: 0 auto;
    .asterisk {
      color: #ed6344;
    }
  }
  @media (max-width: ${xs}px) {
    .heading {
      padding-bottom: 32px;
    }
    .subheading {
      padding-bottom: 32px;
    }
  }
`;

export class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState({
        showModal: this.props.showModal
      });
    }
  }
  closeModal = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    this.setState({
      showModal: false
    });
  };
  render() {
    const { showModal } = this.state;
    const { student } = this.props;

    return (
      <ConfirmationModalContainer
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
      >
        <CloseButton
          onClick={() => {
            this.setState({ showModal: false });
          }}
          className="close-button"
        >
          <Icon name="close" fill="#000" />
        </CloseButton>
        <ConfirmationModalBody>
          <div className="checkmark-container">
            <svg
              width="32"
              height="28"
              viewBox="0 0 32 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4801 27.5269L0.833313 17.8781L4.29369 14.4158L10.3136 20.4357L28.1697 0.791687L31.7906 4.0856L10.4801 27.5269Z"
                fill="#36B37E"
              />
            </svg>
          </div>

          <Heading small className="heading">
            An email has been sent to {student} to make payment for the private
            lessons
          </Heading>
          <Text className="subheading">
            <span className="asterisk">*</span>
            Ensure you followup on the {student} to ensure they’ve made payment
          </Text>
          <PrimaryButton onClick={this.closeModal}>Book again</PrimaryButton>
        </ConfirmationModalBody>
      </ConfirmationModalContainer>
    );
  }
}

const ExtraFormStyles = `
    margin-bottom: 32px!important; 
`;
const BaseScheduleCustomStyle = `
.summary-next-button {
    svg {
        display: none;
    }
}
.price-breakdown-component {
    position: absolute;
    left: 0;
    margin-top: 64px;
    .left-section {
      flex: 0 1 200px;

      .help-tip {
        display: none;

        &>p {
          font-weight: normal;
        }
      }
    
      p:first-of-type {
        padding-bottom: 4px;
      }
      #help-text {
        font-size: 14px;
      }
    }
    
    .right-section {
      flex: 1 1 auto;
      justify-content: flex-end;
      display: flex;
      &>h1 {
        font-size: 19px;
      }
    }
    @media (max-width: ${xs}px) {
      position: relative;
      margin-top: 0;
      border: none;
      border-radius: 0;

      .left-section {
        .help-tip {
          display: inline-block;
          padding-left: 4px;
        }
        p:first-of-type {
          padding-bottom: 0;
        }
        #help-text {
          display: none;
        }
      }
    }
}
.proceed-button {
    padding: 0 24px!important;
    svg {
        display: none;
    }
}
.tool-tip {
  position: relative!important;

  @media(max-width: 768px) {
    position: fixed!important;

    .breakdown-section {
      order:1;
    }
    .big-summary-section {
      order: 2;
    }
    .tooltip-content__container {
      order: 3;
    }
    .price-breakdown-component {
      order: 4;
    }
    .summary-next-button__container {
      order: 5;
    }
  }
}
`;

const PaymentMethodDiv = styled.div`
  background-color: ${color.gray.ui_02};
  padding: 24px;
  border-radius: 8px;

  .payment-method {
    &-type {
      &__heading {
        padding-bottom: 16px;
      }
      .TextWithIcon {
        padding-bottom: 16px;
        .Text {
          ${font_used.small_heading};
        }
      }
    }
  }
`;

const BankItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${color.gray.ui_03};

  .bank {
    &__image {
      max-width: 50px;
      img {
        width: 100%;
      }
    }
    &__details {
      margin-left: 16px;

      .Text {
        .bold {
          font-weight: ${font_weight.bold};
        }
      }
    }
    &__help-text {
      span {
        font-weight: ${font_weight.bold};
      }
    }
  }
`;

const BankItem = ({ account_number, logo }) => (
  <BankItemStyle className="bank">
    <div className="bank__image">
      <img src={logo} />
    </div>
    <div className="bank__details">
      <Text className="Text" color={color.gray.primary}>
        <span>Name:</span> <span className="bold">Tuteria Limited</span>
      </Text>
      <Text className="Text" color={color.gray.primary}>
        <span>Acct. No:</span> <span className="bold">{account_number}</span>
      </Text>
    </div>
  </BankItemStyle>
);

export class PaymentPageComponent extends React.Component {
  state = {
    student: this.props.student || 1,
    paymentMethod: "online",
    banks: [
      {
        logo: "/static/img/banks/UBA-PAY.png",
        account_number: "2105752789"
      },
      {
        logo: "/static/img/banks/GTB-PAY.jpg",
        account_number: "0266765638"
      },
      {
        logo: "/static/img/banks/zenith.png",
        account_number: "1015484047"
      }
    ]
  };
  refComp = null;

  price = () => {
    let { request_details = { amount: 0 } } = this.props;
    return parseFloat(request_details.amount) * this.state.student;
  };
  breakdownPrice() {
    return this.currency(this.price());
  }
  getPriceHeading() {
    return "Total cost";
  }

  currency = (number = "") => `₦${number.toLocaleString()}`;
  getTotalPrice() {
    return this.currency(this.price());
  }
  formatDateSummary = date => {
    let dateArray = date.split(" ");
    dateArray[0] = dateArray[0].substring(0, 3);
    dateArray[4] = dateArray[4].substring(0, 3);
    return dateArray.join(" ");
  };
  displaySections() {
    let { request_details } = this.props;
    // {
    //   "exam": "ielts",
    //     "state": "Lagos",
    //       "tutor": {
    //     "email": "chydy4love@yahoo.com",
    //       "phone_no": "+2348038037764",
    //         "last_name": "Nwosu",
    //           "first_name": "Chidiebere"
    //   },
    //   "venue": "Cranfield Biz Hub, 7 Razak Balogun Street, off Adebola street, off Adeniran Ogunsanya, Surulere.",
    //     "amount": "35000",
    //       "location": "Surulere",
    //         "schedule": {
    //     "summary": "DeWeekend Evening Class",
    //       "duration": "4pm - 8pm",
    //         "start_date": "November 24, 2018",
    //           "date_summary": "November 24, 2018 - December 16, 2018"
    //   },
    //   "lesson_plan": "Weekend",
    //     "curriculum_link": "//assets.ctfassets.net/tp6rlg4xcwsc/25Hm1HjCDCiokGwamyKk2O/5305cac50905ac72ddfdd0350990d257/IELTS_Weekend_Plan_Curriculum.pdf"
    // }
    let hours = 2;
    let summary1 = [
      {
        text: "Students",
        value: (
          <Div
            css={`
              .calendar-text {
                padding-left: 5px;
              }
              .number-val {
                padding-left: 5px;
              }
            `}
          >
            <IncrementComponent
              number={this.state.student}
              maxNumber={10}
              scale={1.4}
              incrementCallback={() => {
                if (this.state.student < 10) {
                  this.setState({ student: this.state.student + 1 });
                }
              }}
              decrementCallback={() => {
                if (this.state.student > 1) {
                  this.setState({ student: this.state.student - 1 });
                }
              }}
            />
          </Div>
        )
      }
    ];
    let {
      schedule = { date_summary: "", duration: "", summary: "" }
    } = request_details;
    return [
      [
        {
          text: "Plan Type",
          value: request_details.lesson_plan
        },
        // {
        //   text: schedule.summary,
        //   value: '',
        // },
        {
          text: schedule.date_summary
            ? this.formatDateSummary(schedule.date_summary)
            : schedule.date_summary,
          value: ""
        },
        {
          text: "Time",
          value: schedule.duration
        }
      ],
      summary1
    ];
  }
  render() {
    const {
      display_subjects = true,
      loading,
      paymentCallbackSuccess,
      paymentCallbackCancel,
      banks
    } = this.props;
    const { paymentMethod } = this.state;
    return (
      <ClientPageWrapper
        current={3}
        heading="Payment"
        description="Kindly make payment to secure your slot in the class."
        proceedButtonText="Send Confirmation"
        showLoadingButton={false}
        showBackButton={this.props.showBackButton}
        backAction={this.props.backAction}
        loadingButtonText="Book Lesson"
        loading={loading}
        isValid={true}
        css={`
          display: flex;
          margin-top: 0;
          justify-content: space-between;
          align-items: flex-start;
          @media (max-width: ${xs}px) {
            flex-direction: column;
            padding-bottom: ${spacing.m};
            align-items: unset;

            .form-column {
              order: 1;
            }
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
          .form-heading-title {
            margin-top: 40px;
          }
          .summary-next-button__container,
          .next-button-container {
            display: none;
          }
          .group-class-pricing {
            margin: 48px 16px 0 !important;
            min-width: 340px;

            @media (max-width: 420px) {
              min-width: auto;
            }

            .tooltip-content__container {
              .Tooltip-content {
                &:first-child,
                &:nth-child(3n) {
                  div:first-child {
                    font-weight: ${font_weight.bold};
                  }
                }
              }
            }
          }
        `}
        rightSection={
          <PriceSummaryComponent
            {...{ start: "", end: "" }}
            price={this.getTotalPrice()}
            breakdownPrice={this.breakdownPrice()}
            priceHeading={this.getPriceHeading()}
            sections={this.displaySections()}
            className="group-class-pricing"
            type={"tutor-schedule"}
            is_per_hour={false}
            onSubmit={this.onSubmit}
            hidden={this.state.hidden}
            loading={this.props.loading}
            showMobile={false}
            disabled={false}
            showProceedButton={false}
            position={this.state.position}
            buttonText={"Send Confirmation"}
          />
        }
      >
        <div>
          {NRadioComponent(
            {
              name: `Select payment option`,
              options: [
                {
                  text: `Pay online`,
                  value: "online"
                },
                {
                  text: `Pay with bank`,
                  value: "bank"
                }
              ]
              // css: TutorPreferenceSectionStyle
            },
            {}
          )(paymentMethod, val => this.setState({ paymentMethod: val }))}
        </div>
        <PaymentMethodDiv className="payment-method">
          {paymentMethod === "online" ? (
            <div className="payment-method-type payment-method-bank">
              <div className="payment-method-type__heading">
                <TextWithIcon icon="lock" color={color.gray.primary}>
                  Secure Payment
                </TextWithIcon>
                <Text color={color.gray.primary}>
                  Pay conveniently using card or bank. 100% secured by PayStack.
                  Need help? Call Tunji, <strong>08179265673</strong>.
                </Text>
              </div>
              <div className="payment-method-type__body">
                <PaystackButton2
                  callback={paymentCallbackSuccess}
                  onClose={paymentCallbackCancel}
                  no_of_student={this.state.student}
                  keyFunc={this.props.public_key}
                  render={onClick => {
                    return (
                      <ProceedButton
                        // full_width
                        onSubmit={() => {
                          onClick();
                        }}
                        className="proceed-button"
                        loading={false}
                      >
                        Make Payment
                      </ProceedButton>
                    );
                  }}
                  data={{
                    ...this.props.payment_details,
                    amount: this.price()
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="payment-method-type payment-method-bank">
              <div className="payment-method-type__heading">
                <TextWithIcon icon="lock" color={color.gray.primary}>
                  Bank Payment
                </TextWithIcon>
                <Text
                  color={color.gray.primary}
                  class="payment-method-bank__help-text"
                >
                  Pay into one of the banks below. Kindly contact Tunji at{" "}
                  <strong>08179265673</strong> or email{" "}
                  <strong>tunji@tuteria.com </strong> to confirm payment.
                </Text>
              </div>
              <div className="payment-method-type__body">
                <Text
                  big
                  css={`
                    margin-bottom: 16px;
                  `}
                  color={color.gray.primary}
                >
                  Supported Banks
                </Text>
                <div className="banks-list">
                  {this.state.banks.map((bank, i) => (
                    <BankItem key={i.toString()} {...bank} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </PaymentMethodDiv>
      </ClientPageWrapper>
    );
  }
}

export class PaystackButton2 extends React.Component {
  onClick = () => {
    const {
      data,
      keyFunc = x => x,
      callback = () => {},
      onClose = () => {}
    } = this.props;
    let detail = data.user_details;
    let amount = parseFloat(data.amount) * 100;
    var handler = window.PaystackPop.setup({
      key: keyFunc(detail.key), // the paystack public key , it is sent in the user payment api
      email: detail.email, // the user email it is sent in the user payment details
      amount,
      currency: "NGN",
      // currency: data.currency || "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: `${detail.first_name} ${detail.last_name}`
          },
          {
            display_name: "No of student",
            variable_name: "student_no",
            value: this.props.no_of_student || 1
          }
        ]
      },
      callback: response => {
        this.props.callback(
          detail.redirect_url +
            `?amount=${amount}` +
            "&trxref=" +
            response.trxref
        );
      },
      onClose: function() {
        onClose();
      }
    });
    handler.openIframe();
  };
  componentWillMount() {
    if (typeof window !== "undefined") {
      if (typeof document !== "undefined") {
        const { data } = this.props;
        let detail = data.user_details;
        let paystack = document.createElement("script");
        if (detail) {
          paystack.src = detail.js_script;
        }
        document.body.appendChild(paystack);
      }
    }
  }
  render() {
    return this.props.render(this.onClick.bind(this));
  }
}
