import React from "react";
import styled, { css } from "styled-components";
import Modal, { BaseModalSection } from "../../simple/Modal";
import { PrimaryButton, spacing, xs, Text, Heading } from "../components";
export const ModalBody = styled.div`
  padding: 24px 35px;

  & .action-buttons {
    padding-top: 16px;
    width: 50%;
    margin: 0 auto;
    & button {
      width: 100%;
    }
    @media (max-width: ${xs}px) {
      width: 80%;
    }
  }
`;

export class ExampleModal extends React.Component {
  state = {
    current: 0
  };
  buildNode(body, index) {
    return (
      <Text
        key={index}
        css={`
          margin-bottom: 32px;
        `}
      >
        {body}
      </Text>
    );
  }
  render() {
    const { data, handleCloseModal, kind = "description" } = this.props;
    let filtered = data.filter(x => x.kind === kind);
    let heading = filtered[this.state.current].title;
    let content = filtered[this.state.current].content;
    let body = (
      <React.Fragment>
        {content.map((x, index) => this.buildNode(x, index))}
      </React.Fragment>
    );
    return (
      <Modal
        width={50}
        gutter={4}
        showModal={this.props.showModal}
        handleCloseModal={handleCloseModal}
        backgroundColor="rgba(0, 0, 0, 0.75)"
      >
        <BaseModalSection onClose={handleCloseModal}>
          <ModalBody>
            <Heading
              css={`
                margin-bottom: ${spacing.l};
              `}
            >
              {heading}
            </Heading>
            {body}
            {kind === "description" ? (
              <div className={"action-buttons"}>
                <PrimaryButton
                  outline
                  onClick={() =>
                    this.setState({
                      current: this.state.current === 0 ? 1 : 0
                    })
                  }
                >
                  {this.state.current === 0
                    ? "See another example"
                    : "Show previous example"}
                </PrimaryButton>
              </div>
            ) : null}
          </ModalBody>
        </BaseModalSection>
      </Modal>
    );
  }
}
