// Import React and Styled Components
import React from "react";

// Importing the Icon, Text and Spacing Primitive Components
import { Heading, Text } from "../../simple/Text";
import { spacing, color } from "../../siteStyle";

import { font_weight } from "../../design-systems/index";
import { Div } from "../../primitives/index";
const xs = 768;
const tablet = 992;
const mobile = 620;
const big_mobile = 744;

// Generic Styling
export const ContainerStyling = `
  padding: 24px;
  margin: 40px auto;

  @media(min-width: 1200px){
    max-width: 1120px !important;
  }
`;
// const SingleHowToSection = ({
//   no,
//   heading,
//   children,
//   image,
//   reverse = false
// }) => {
//   const Image = (
//     <div className="img">
//       <img src={image} alt={heading} />
//     </div>
//   );
//   return (
//     <Div
//       css={`
//             width: 87%;
//     margin: 0 auto;
//     display: flex;
//   padding: 2.5rem 0;
//   @media(max-width: ${xs}px){
//     flex-direction: column-reverse;
//     padding: 2rem 0;
//     & .img{
//       order 1;
//     }
//   }
//   & .img {
//     & img {
//       width: 420px;
//       @media(max-width: ${tablet}px){
//         max-width: 100%;
//       }
//     }
//   }
//   & > :nth-child(odd) {
//     // padding-right: 7.5rem;
//   }
//   & .mobile-only {
//     display: none;

//     @media (max-width: ${xs}px) {
//       display: inline-block;
//       color: #36b37e;
//     }
//   }
//   & .text {
//     display: flex;
//     color: #484848;
//     & .counter {
//       color: #36b37e;
//       font-size: 8rem;
//       margin-right: 2rem;
//       line-height: 6.9rem;
//       @media(max-width: ${xs}px){
//         margin-right: 0;
//         display:none
//       }
//     }
//     @media(max-width: ${xs}px){
//       margin-top: 1.1rem;
//     }
//     & .data {

//     & h1 {
//         padding-bottom: ${spacing.m};
//         color: ${text_color.secondary};
//     }

//     & p {
//         ${font_used.big_body};
//         color: ${text_color.secondary};
//     }

//       @media(max-width: ${xs}px){
//         & h1{
//         ${font_used.small_heading};
//           line-height: 1.6rem;
//           margin-bottom: 0.4rem;
//         }
//         & p{
//         ${font_used.regular_body};
//         color: ${text_color.secondary};
//         }
//       }
//     }
//   }`}
//     >
//       {reverse ? Image : null}
//       <div className="text">
//         <div className="counter">{no}</div>
//         <div className="data">
//           <Heading
//             css={`
//               text-align: left;
//             `}
//           >
//             <span className="mobile-only">{no}.</span> {heading}
//           </Heading>
//           {children}
//         </div>
//       </div>
//       {reverse ? null : Image}
//     </Div>
//   );
// };

// const HowToSection = ({ content }) => (
//   <Div
//     css={`
//       color: #484848;
//       padding-top: ${spacing.xxxl};
//       @media (max-width: ${xs}px) {
//         padding-bottom: 0;
//       }

//       & .content {
//         width: 1120px;
//         margin: 0 auto;
//         padding-top: ${spacing.xxl};
//         @media (max-width: 768px) {
//           width: 100%;
//           padding-top: 0;
//         }
//         @media (max-width: ${tablet}px) {
//           width: 100%;
//         }
//         @media (min-width: ${xs + 1}px) {
//           & > :nth-child(1) {
//             padding-top: 0;
//           }
//           & > :nth-child(odd) {
//             & .text {
//               & .data {
//                 max-width: 45rem;
//               }
//             }
//             & .img {
//               padding-left: ${spacing.xxxl};
//               padding-bottom: ${spacing.l};
//             }
//           }
//           & > :nth-child(even) {
//             & .text {
//               & .data {
//                 max-width: 45rem;
//               }
//             }
//             & .img {
//               padding-right: ${spacing.xxxl};
//               padding-bottom: ${spacing.l};
//             }
//           }
//         }
//       }
//     `}
//   >
//     <Heading
//       big={true}
//       color={text_color.secondary}
//       css={`
//         text-align: center;
//         @media (max-width: 768px) {
//           font-size: 28px !important;
//         }
//       `}
//     >
//       {content.title}
//     </Heading>
//     <div className="content">
//       {content.data.map((section, index) => (
//         <SingleHowToSection
//           no={index + 1}
//           key={index}
//           reverse={(index + 1) % 2 == 0}
//           image={section.image}
//           heading={section.heading}
//         >
//           <Text
//             dangerouslySetInnerHTML={{
//               __html: section.paragraph
//             }}
//           />
//         </SingleHowToSection>
//       ))}
//     </div>
//   </Div>
// );
// & ${Heading} {
//   margin-bottom: 4.4rem;
// }

// & ${Heading} {
//   margin-bottom: 1.5rem;
// }

//======= [SECTION] How to Place a Request ==========

const SingleHowToCenteredStyle = `
display: flex;
flex-direction: column;
justify-content: center;
`;
const SingleHowToStyling = centered => `
  display: flex;
  margin-bottom: 8vmax !important;
  margin: auto;

  @media(max-width: ${mobile}px){
    display: block;
    margin-bottom: 8px !important
  }

  .how-to-image{
    margin-top: 0px;
    width: 420px;
    height: 360px;
    overflow: hidden;
    max-height: max-content;

    @media(max-width: ${big_mobile}px){
      width: 360px;
    }

    @media(max-width: ${mobile}px){
      width: 100%;
      height: 60vh;
    }

    img{
      max-width: 100%;
    }
  }

  .how-to-content{
    display:flex;

    &__number{
      font-size: 8vw;
      line-height: 90px;
      padding: 40px 4vw;
      color: ${color.green.primary};
      font-weight: ${font_weight.medium};

      @media(max-width: ${big_mobile}px){
        font-size: 80px;
        padding-top: 24px;
      }

      @media(max-width: ${mobile}px){
        display: none;
      }
    }

    &__button {
      margin-top: ${spacing.l};
    }

    &__text{
      max-width: 417px;
      padding-top: 4vh;
      margin-right: 4vw;
      margin-bottom: 6vh;

      ${centered && SingleHowToCenteredStyle}

      @media(max-width: ${mobile}px){
        max-width: 100%;
      }

      h1 > span{
        margin-right: 8px;
        color: ${color.green.primary};
        display: none;

        @media(max-width: ${mobile}px){
          display: inline;
        }
      }

      > p{
        margin-top: ${spacing.s};
      }
    }
  }
`;

export const SingleHowTo = ({
  heading,
  number,
  paragraph,
  image,
  reverse,
  centered,
  linkRender,
  buttonText
}) => {
  return (
    <Div css={SingleHowToStyling(centered)}>
      <div className="how-to-image" style={{ order: !reverse && "2" }}>
        <img src={image} alt={heading} />
      </div>
      <div className="how-to-content">
        <div
          className="how-to-content__number"
          style={{ paddingLeft: !reverse && "2vw" }}
        >
          {number}
        </div>
        <div
          className="how-to-content__text"
          style={{ paddingRight: !reverse && "1vw" }}
        >
          <Heading>
            {number ? <span>{number + "."}</span> : null}
            {heading}
          </Heading>
          <Text dangerouslySetInnerHTML={{ __html: paragraph }} />
          <div className="how-to-content__button">
            {linkRender ? linkRender(buttonText, { big: true }) : null}
          </div>
        </div>
      </div>
    </Div>
  );
};

export const HowToStyling = `
  ${ContainerStyling}
  padding-bottom: 0 !important;

  > h1:nth-of-type(1){
    margin-bottom: 64px;
  }
`;

export const HowToSection = ({ heading, data }) => {
  return (
    <Div css={HowToStyling}>
      <Heading big>{heading}</Heading>
      {data.map((eachData, index) => (
        <SingleHowTo
          key={index}
          number={index + 1}
          reverse={(index + 1) % 2 == 0}
          {...eachData}
        />
      ))}
    </Div>
  );
};
