import React from "react";
import { Div } from "../../primitives";
import { NavBar } from "../../compound/Navigation";
import { NumberTabs, NavigationItem } from "../../compound/SupportedTabs";
import { brand_color, spacing, font_weight, color } from "../../design-systems";
import Media from "react-media";
import { xs } from "../../siteStyle";
const styling = `
    box-sizing: border-box;
    height: 71px;
    //border-bottom: 3px solid #f0f0f0;
    background-color: white;
    .tab{
      padding: 0 25px;
      @media(max-width:1243px) {
        padding: 0 14px;
      }
      @media(max-width:1143px) {
        padding: 0 8px;
      }

      @media(max-width:1090px) {
        padding: 0 4px;
      }
    }
    svg{
        margin-left: 0!important;
        margin-right: 0!important;
        &.fa-circle{
            left: -4px;
        }
    }
    strong{
        left: -18px;
    }
`;
export const NavTabs = ({
  tabs,
  current = 0,
  zero_index = false,
  displayBackButton = false,
  onBackClick,
  title,
  style
}) => {
  let textColor = "#bfc0c2";
  let newCurrent = zero_index ? current : current - 1;
  return (
    <Div
      css={`
        display: flex;
        border-bottom: 1px solid ${color.gray.ui_02};
        position: fixed;
        background: #ffffff;
        z-index: 1000;
        width: 100%;
        .tab-text {
          font-weight: ${font_weight.bold};
        }
        .reg-text {
          color: ${textColor};
          font-weight: ${font_weight.bold};
        }
        .calendar-text.active-no {
          color: ${textColor};
        }
        @media (max-width: ${xs + 1}px) {
          flex-direction: column;
        }
      `}
    >
      <NavBar
        inverse
        white
        maxHeight={"70px"}
        bgColor={current > 0 ? brand_color.tuteria_green : "#f0f0f0"}
      />
      <Media query={`(max-width: ${xs}px)`}>
        {matches =>
          matches ? (
            <NavigationItem
              active={true}
              completed={true}
              displayBackButton={displayBackButton}
              onBackClick={onBackClick}
              style={style}
            >
              {title || tabs[newCurrent]}
            </NavigationItem>
          ) : (
            <NumberTabs
              bgColor={brand_color.tuteria_green}
              styling={styling}
              number
              textColor={textColor}
              step={current}
              setHeight
              left
              fontKind="far"
              firstChildPadding={spacing.l}
              tabs={tabs}
              mode={2}
            />
          )
        }
      </Media>
    </Div>
  );
};
