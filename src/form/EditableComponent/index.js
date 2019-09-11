import React from "react";
import Quill from "quill";
import Converter from "quill-delta-to-html";
import styled, { css } from "styled-components";
import { font_size } from "../../siteStyle";
import { Div } from "../../primitives";
import "./style.css";

export class QuillComponent extends React.Component {
  state = {
    html: this.props.html,
    edit: null
  };
  onChange = (eventName, ...args) => {
    // var converter = new Converter(args[0].ops);
    // var html = converter.convert();
    // this.setState({ html });
    // this.props.onChange(html);
    this.setState({ edit: args[0].ops });
  };
  onConvert = () => {
    const { edit } = this.state;
    var converter = new Converter(edit);
    var html = converter.convert();
    this.setState({ html });
    return html;
    // this.props.onChange(html);
  };
  componentDidMount() {
    var toolbarOptions = [
      ["bold", "italic"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }]
    ];
    this.quillComponent = new Quill(this.node, {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Compose an epic...",
      theme: "snow"
    });
    this.quillComponent.clipboard.dangerouslyPasteHTML(this.props.html);
    this.quillComponent.on("text-change", this.onChange);
  }
  componentWillUnmount() {
    this.quillComponent.off("text-change");
  }
  render() {
    return (
      <Div
        css={`
          .ql-container {
            min-height: 190px;
            font-size: ${font_size.s};
          }
        `}
      >
        <div ref={node => (this.node = node)} />
      </Div>
    );
  }
}
