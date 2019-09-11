import React from "react";

export class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: null
    };
    this.inputNode = null;
  }
  componentDidMount() {
    this.initAutocomplete();
  }
  fillInAddress = () => {
    // Get the place details from the autocomplete object.
    const place = this.state.autocomplete.getPlace();
    this.props.placeDataResult(place);
  };
  initAutocomplete() {
    const { vicinity = false } = this.props;
    let types = vicinity ? ["regions"] : [];
    // eslint-disable-next-line no-undef
    var options = {
      //types: ['address'],
      types,
      componentRestrictions: {
        country: "ng"
      }
    };
    console.log(options);
    if (this.inputNode) {
      var autocomplete = new window.google.maps.places.Autocomplete(
        this.inputNode,
        options
      );
      autocomplete.addListener("place_changed", this.fillInAddress);
      this.setState({ autocomplete });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.inputNode.value = nextProps.value;
  }

  render() {
    let { children } = this.props;
    if (children.length > 1) {
      children = children[0];
    }
    const input = React.cloneElement(children, {
      //   ref: node => {
      //     this.inputNode = node;
      //   },
      innerRef: comp => {
        this.inputNode = comp;
      }
    });
    return input;
  }
}

export default AutocompleteInput;
