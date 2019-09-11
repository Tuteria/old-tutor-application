import React from "react";
import {
  Div,
  StyledNotification,
  DropdownComponent,
  InputComponent,
  globals,
  spacing
} from "../components";

import { FormHeading } from "../../form";
const { xs } = globals;

export class PricingForm extends React.Component {
  earnAmount = amount => {
    const { adminPercent = 30 } = this.props;
    return Math.round(parseFloat(amount) * (100 - adminPercent) / 100);
  };
  range(start, end, step) {
    var _end = end || start;
    var _start = end ? start : 0;
    var _step = step || 1;
    return Array((_end - _start) / _step)
      .fill(0)
      .map((v, i) => _start + i * _step);
  }
  discountPrice = state => {
    let discount = parseFloat(state.price) * parseFloat(state.discount) / 100;
    return parseFloat(state.price) - discount;
  };

  render() {
    const { updateFields, state } = this.props;
    return (
      <React.Fragment>
        <InputComponent
          label="How much do you want to charge per hour?"
          labelStyle={
            { fontWeight: 500 } // maxValue={80}
          }
          addonProps={{
            afterText: "per hour per student",
            css: `
          width: 65%;
          & > input{
            width: 44%;
            @media(max-width:${xs}px){

              width: 40%;
            }
          }
          & .InputAddon{
            border-left: 1px solid #dce0e0;
          }
          @media(max-width: ${xs}px){
            width: 100%;
            max-width: 376px;
          }
        `
          }}
          type="number"
          value={state.price}
          field_name="price"
          errorStyle="margin-top: 8px !important;"
          updateText={value => updateFields("price", value)}
          placeholder="3,000"
          addonComponent={<div className="currency">₦</div>}
        />
        {state.price ? (
          <StyledNotification
            css={`
              margin-top: ${spacing.m};
            `}
            bgColor="rgba(54,179,126,0.1)"
          >
            <div>
              <p className="note">
                This Means you will be paid N{this.earnAmount(state.price)} for
                every hour you teach after we deduct our service fee of{" "}
                {state.adminPercent}% (N{state.price -
                  this.earnAmount(state.price)})
              </p>
            </div>
          </StyledNotification>
        ) : null}
        {/* <FormHeading
          css={`
            margin-top: ${spacing.l};
          `}
          small
          heading="Discount for more students?"
        >
          To encourage longer stays, some tutors set a weekly or monthly
          discount.
        </FormHeading>
        <Div
          css={`
            display: flex;
            justify-content: space-between;
            & > div {
              flex: 0.85;
            }
            .discount {
              align-self: center;
              @media (max-width: ${500}px) {
                padding-top: ${spacing.l};
                padding-bottom: ${spacing.s};
                margin-top: -${spacing.xxxl};
                align-self: left;
              }
            }
            @media (max-width: ${500}px) {
              flex-direction: column;
            }
          `}
        >
          <DropdownComponent
            label="How much discount?"
            options={this.range(0, 30, 5).map((elem, index) => ({
              value: elem,
              text: `${elem}% Discount`
            }))}
            uncontrolled
            field_name="discount"
            defaultText="Select Discount"
            css={`
              @media (max-width: ${xs}px) {
                margin-bottom: ${spacing.s};
                max-width: 376px;
              }
            `}
            errorStyle="margin-top: 8px !important;"
            value={state.discount}
            output={e =>
              !isNaN(parseInt(e)) ? `${state.discount}% Discount` : null
            }
            onChange={text => updateFields("discount", text)}
          />
          <p className="discount">
            <span style={{ color: "#36b37e" }}>Discount Tip: 20%</span> ·{" "}
            <a
              onClick={() => {
                updateFields("discount", 20);
              }}
              style={{ cursor: "pointer" }}
            >
              Use This Discount
            </a>
          </p>
        </Div>
        {state.price && parseInt(state.discount, 10) > 1 ? (
          <StyledNotification
            css={`
              margin-top: ${spacing.m};
              @media (max-width: ${xs}px) {
                margin-bottom: ${spacing.m};
              }
            `}
            bgColor="rgba(54,179,126,0.1)"
          >
            <div>
              <p className="note">
                Means clients will pay additional N{this.discountPrice(state)}/hr
                for each extra student
              </p>
            </div>
          </StyledNotification>
        ) : null} */}
      </React.Fragment>
    );
  }
}
