// @flow
import React from "react";
import createReactContext, { type Context } from "create-react-context";
import {
  Div,
  Icon,
  Notification,
  Div2,
  ApplicationTooltip as Tooltip,
  WizardWrapper,
  FormColumn,
  spacing,
  xs
} from "../components";
import throttle from "lodash/throttle";
import { AutocompleteInput } from "./Autocomplete";
import { FormContainer } from "../../layout/FormContainer";
import {
  InputComponent,
  DropdownComponent,
  FormHeading,
  FormValidationProvider,
  MapFormComponent
} from "../../form";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import { AsyncAutoSelect } from "../../simple/AutoSelect";
import {
  MapFormContextProvider,
  MapFormContext
} from "../../form/MapComponent";
export const FindableAddress = () => (
  <Div2 newWidth={900}>
    <Tooltip
      heading="Use a findable address"
      hasLinkedinButton={false}
      icon="lightbulb-o"
      extra={<Icon name="world-pin" />}
    >
      <span style={{ fontSize: 16, lineHeight: "24px" }}>
        Please use an address that is findable in the map so clients can find
        you.
      </span>
      <br />
    </Tooltip>
  </Div2>
);

type MapProps = {
  geocodingAction: Function,
  updateLatitudeAndLongitude: Function,
  customErrorMessages: Function,
  fieldHasError: Function,
  updateField: Function,
  updateStateAndVicinity: Function,
  errorMessageForField: Function,
  updateAreas: Function,
  states: Array<string>,
  ...State
};
const MapFormWrapper = props => (
  <MapFormContext.Consumer>
    {({ state, display_error }) => {
      return <MapForm {...props} {...state} display_error={display_error} />;
    }}
  </MapFormContext.Consumer>
);
class MapForm extends React.Component<MapProps> {
  state = {
    found: false
  };
  addressError = () => {
    const { area, vicinity } = this.props;

    return !!area === false || !!vicinity === false || area === vicinity;
  };
  getErrorMessage = () => {
    const { geocodedAddress, customErrorMessage } = this.props;
    let errorMessage = geocodedAddress
      ? "Nice! We found you on the map"
      : "Problemo! We couldn’t find you on the map. Drag the pointer to a close location";
    if (customErrorMessage) return customErrorMessage;
    // if (this.addressError()) {
    //   errorMessage =
    //     "Please ensure you input an area and it isn't the same with the vicinity.";
    // }
    return errorMessage;
  };
  hasError = () => {
    const { geocodedAddress } = this.props;
    const address_error = this.addressError();
    if (address_error) return false;
    return geocodedAddress;
  };

  onInputBlur = e => {
    this.props.updateField(e.target.value, "address");
  };
  updateField = (key, value) => {
    const result = { [key]: value, display_error: true };
    this.props.updateField(key, value);
    if (["state", "vicinity", "address"].indexOf(key) > -1) {
      throttle(
        () => {
          this.geocodeStateAndVicinity();
        },
        1000,
        { trailing: true }
      )();
    }
  };
  geocodeStateAndVicinity() {
    const state = this.props;
    let address = `${state.vicinity} ${state.state}`.trim();

    const onSuccess = results => {
      const first_location = results[0].geometry.location;
      let latitude = first_location.lat();
      let longitude = first_location.lng();
      this.props.externalStateUpdate({
        latitude,
        longitude
      });
      this.props.updateLatitudeAndLongitude(latitude, longitude);
    };
    const onError = () => {
      let newAddress = `${state.vicinity} ${state.state}`.trim();
      this.props.geocodingAction(newAddress, onSuccess);
    };
    if (state.vicinity && state.state && state.vicinity.length > 2) {
      this.props.geocodingAction(address, onSuccess, onError);
    }
  }
  render() {
    const {
      states,
      vicinities = [],
      areas = [],
      getVicinities = (address, state) => val =>
        new Promise((resolve, reject) => {
          resolve([]);
        }),
      getAreas = vicinity => val =>
        new Promise((resolve, reject) => {
          resolve([]);
        })
    } = this.props;
    const state = this.props;
    const errorMessage = (
      <Notification
        icon
        customIcon={this.hasError() ? "check-circle" : "exclamation-circle"}
        className={this.hasError() ? "success" : "error"}
        style={{
          fontSize: 18,
          paddingLeft: 15,
          textAlign: "left",
          display: "flex"
        }}
      >
        <span tabindex="-1" style={{ color: "#484848" }}>
          {this.getErrorMessage()}
        </span>
      </Notification>
    );
    return (
      <React.Fragment>
        <Div
          css={`
            display: none;
            @media (max-width: ${xs}px) {
              display: block;
            }
          `}
        >
          {!this.hasError() && this.props.display_error ? errorMessage : null}
        </Div>
        <InputComponent
          addonComponent={{}}
          css={`
            margin-bottom: ${spacing.xl};
          `}
          errorStyle="margin-top: 8px !important;"
          addonProps={{
            component: AutocompleteInput,
            addOnProps: {
              value: state.address,
              placeDataResult: p => {
                this.setState({ found: false });
                state.updateStateAndVicinity(p);
              }
            }
          }}
          onBlur={val => {
            this.updateField("address", val.target.value);
          }}
          field_name="address"
          value={state.address || ""}
          placeholder="e.g. Alfred Rewane Street, Vitoria Island"
          label="Street Address"
        />
        <FormFieldsContainer
          extraCss={` + div.c-errmessage {
                margin-top: -24px;
              }`}
          field_name="combined_state"
          cssProps={spacing.xl}
          childWidth={31}
        >
          <DropdownComponent
            label="State"
            defaultText="Select state"
            value={state.state}
            field_name="state"
            errorStyle="margin-top: 8px !important;"
            onChange={val => {
              this.updateField("state", val);
            }}
            className="select"
            options={states}
          />

          <AsyncAutoSelect
            label="Vicinity"
            value={state.vicinity}
            promptText="Create Option "
            placeholder="Vicinity..."
            field_name="vicinity"
            errorStyle="margin-top: 8px !important;"
            disabled={this.state.found && (state.vicinity || "").length > 0}
            onChange={(value, resultSet) => {
              console.log(value);
              if (!!value) {
                this.updateField("vicinity", value);
              }
            }}
            getData={getVicinities(state.address, state.state)}
            data={vicinities}
          />
          <AsyncAutoSelect
            css={`
              display: ${!!state.vicinity ? "block" : "none"};
            `}
            label={`Where in ${state.vicinity}?`}
            value={state.area}
            errorStyle="margin-top: 8px !important;"
            promptText="Create Option "
            placeholder="Type your city"
            field_name="area"
            disabled={this.state.found && (state.area || "").length > 0}
            onChange={value => {
              if (!!value) {
                this.updateField("area", value);
              }
            }}
            getData={getAreas(state.vicinity)}
            data={areas}
          />
        </FormFieldsContainer>
        <Div
          css={`
            @media (max-width: ${xs}px) {
              display: none;
            }
          `}
        >
          {this.props.display_error && errorMessage}
        </Div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

class AddressPage extends React.Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      geocodedAddress: false,
      display_error: false,
      customErrorMessage: "",
      areas: []
    };
  }
  validateForm = fields => {
    let stringNotEmpty = ["address", "state", "vicinity", "area"].map(x => {
      return (fields[x] || "").length > 0;
    });
    return [...stringNotEmpty].reduce((p, c) => p && c, true);
  };
  componentDidMount() {
    const { data } = this.props;
    this.setState(state => ({ state, ...data }));
  }

  previousPage = () => {
    return {
      base: "steps",
      current: "location",
      previous: "personal-info",
      display: true
    };
  };
  updateFormState = (components, latitude, longitude, address) => {
    this.form.externalStateUpdate({
      ...components,
      latitude,
      longitude,
      address
    });
  };
  render() {
    //const {
    // country: { locale, latitude, longitude, states },
    // onMouseOver,
    // goToPrevious,
    // progress
    // } = this.props;
    const {
      defaultCoordinate,
      validateField,
      title = "Step 1: Personal Details",
      data
    } = this.props;
    return (
      <FormContainer
        ref={form => (this.form = form)}
        customValidation={this.props.customValidation || this.validateForm}
        displayButton={false}
        resetError={false}
        errors={this.props.errors}
        submitFormToServer={(...p) => {
          this.setState({ display_error: true });
          if (!!p[0].longitude && !!p[0].latitude) {
            return this.props.onSubmit(...p);
          }
          return new Promise((resolve, reject) => {
            resolve({ error: null, success: {} });
          });
        }}
        details={this.props.data}
      >
        {(data, updateFields, onSubmitForm, externalStateUpdate) => {
          const { fields, validate, errors } = data;
          console.log(data);
          const state = fields;
          return (
            <MapFormContextProvider
              {...{ state, display_error: this.state.display_error }}
            >
              <FormValidationProvider
                {...{
                  onError: key => {
                    return validate && !validateField(state, key, errors);
                  },
                  onSuccess: key =>
                    validate && validateField(state, key, errors),
                  errors
                }}
              >
                <WizardWrapper
                  nextButtonText="Next"
                  fetchNextPage={() => {}}
                  previousPageFunc={this.props.previousPage}
                  goToPreviousScreen={this.props.previousPage}
                  showNextScreen={false}
                  goToNextScreen={onSubmitForm}
                  loading={this.props.loading}
                  showPreviousScreen={true}
                  displayArrowOnChange={false}
                  section={this.props.section}
                  title={title}
                >
                  <FormColumn>
                    <FormHeading heading="Where are you located?">
                      Enter the address where you will be taking lessons from.
                      We use this to connect you to clients who need your
                      services around your area.
                    </FormHeading>
                    <MapFormComponent
                      latitude={state.latitude}
                      longitude={state.longitude}
                      defaultCoordinate={defaultCoordinate}
                      updateFormState={this.updateFormState}
                      render={mapProps => {
                        return (
                          <MapFormWrapper
                            updateField={updateFields}
                            {...mapProps}
                            states={this.props.states}
                            externalStateUpdate={externalStateUpdate}
                            getVicinities={this.props.getVicinities}
                            getAreas={this.props.getAreas}
                            areas={this.props.areas}
                            vicinities={this.props.vicinities}
                            {...state}
                          />
                        );
                      }}
                    />
                    <FindableAddress />
                  </FormColumn>
                </WizardWrapper>
              </FormValidationProvider>
            </MapFormContextProvider>
          );
        }}
      </FormContainer>
    );
  }
}
export default AddressPage;
