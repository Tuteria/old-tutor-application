import React from "react";
import {
  InputComponent,
  DropdownComponent,
  FormValidationProvider,
  MapFormComponent
} from "../../form";
import {
  MapFormContextProvider,
  MapFormContext
} from "../../form/MapComponent";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import { AutocompleteInput } from "../../pages/LocationPage/Autocomplete";
import { AsyncAutoSelect } from "../../simple/AutoSelect";
import { ClientPageWrapper } from "./ClientPageWrapper";
import { spacing, xs } from "../../siteStyle";
import throttle from "lodash/throttle";
import { FormContainer } from "../../layout/FormContainer";
import { Div } from "../components";

class LocationForm extends React.Component {
  state = {
    found: false,
    vicinities: this.props.vicinities
  };
  componentDidMount() {
    if (typeof this.props.state === "string") {
      this.onStateChange(this.props.state);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.vicinities.length !== this.props.vicinities.length) {
      this.setState({
        vicinities: nextProps.vicinities
      });
    }
    let { state } = nextProps;
    if (
      state &&
      typeof state === "string" &&
      this.state.vicinities.length === 0
    ) {
      nextProps.getVicinities(state).then(data => {
        this.setState({ vicinities: data.data.vicinities });
        nextProps.updateState(
          { marketing_channels: data.data.marketing_channels },
          true
        );
      });
    }
  }
  componentDidMount() {
    let { state } = this.props;
    if (state && typeof state === "string") {
      this.props.getVicinities(state).then(data => {
        this.setState({ vicinities: data.data.vicinities });
        this.props.updateState(
          { marketing_channels: data.data.marketing_channels },
          true
        );
      });
    }
  }
  addressError = () => {
    const { area, vicinity } = this.props;
    return !!area === false || !!vicinity === false || area === vicinity;
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
  hasError = () => {
    const { geocodedAddress } = this.props;
    const address_error = this.addressError();
    if (address_error) return false;
    return geocodedAddress;
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

  onStateChange = val => {
    if (val) {
      this.updateField("state", val);
      this.props.getVicinities(val).then(data => {
        this.setState({ vicinities: data.data.vicinities });
        this.props.updateState(
          { marketing_channels: data.data.marketing_channels },
          true
        );
      });
    } else {
      this.setState({ vicinities: [] });
      this.props.updateState({ marketing_channels: [] }, true);
    }
  };
  render() {
    const {
      states,
      vicinities = [],
      areas = [],
      showBackButton,
      backAction,
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
    return (
      <ClientPageWrapper
        css={`
          display: flex;
          .form-column {
            width: 60%;

            padding-left: ${spacing.m};
            @media (max-width: ${xs}px) {
              width: 100%;
              padding-left: 0;
            }
          }
          @media (max-width: ${xs}px) {
            display: block;
            padding-left: ${spacing.m};
            padding-right: ${spacing.m};
          }
          .mapper {
            margin-left: ${spacing.xxl};
            width: 30% !important;
            height: 350px !important;

            @media (max-width: ${xs}px) {
              display: none;
            }
          }

          .pac-container {
            font-family: Open Sans;
            font-weight: 500;
            font-size: 16px;
          }

          .pac-container .pac-item .pac-icon {
            background-image: none;
            display: none;
          }

          .pac-container .pac-item {
            padding: 8px;
            border: none;
            color: #484848;
          }

          .hdpi.pac-logo:after {
            display: none;
          }
        `}
        full_width={true}
        showLoadingButton
        marginTop="0px"
        onSubmit={state.onSubmit}
        loading={state.loading}
        heading="Where do you stay?"
        description="This helps us get the best tutors close to you"
        rightSection={this.props.children}
        showBackButton={showBackButton}
        backAction={backAction}
        isValid={this.state.vicinities.length === 0}
      >
        <InputComponent
          addonComponent={{}}
          css={`
            margin-bottom: ${spacing.xl};
          `}
          errorStyle="margin-top: 8px !important;"
          addonProps={{
            component: AutocompleteInput,
            addOnProps: {
              value: state.address || "",
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
          placeholder="e.g. Osborne estate, Ikoyi"
          label="Street Address"
        />
        <FormFieldsContainer
          extraCss={`  &>div {
            @media(max-width: ${xs}px) {
              width: 100%;
              max-width: 100%;
            }
          } + div.c-errmessage {
                margin-top: -24px;
              }`}
          field_name="combined_state"
          cssProps={spacing.xl}
          childWidth={31}
        >
          <DropdownComponent
            label="State"
            defaultText="Select state"
            field_name="state"
            height="49.5px"
            value={state.state}
            errorStyle="margin-top: 8px !important;"
            onChange={this.onStateChange}
            options={states}
            className="select"
          />
          {this.state.vicinities.length > 0 ? (
            <React.Fragment>
              <DropdownComponent
                label="Vicinity"
                defaultText="Select"
                field_name="vicinity"
                height="49.5px"
                value={state.vicinity}
                errorStyle="margin-top: 8px !important;"
                onChange={val => {
                  this.updateField("vicinity", val);
                }}
                options={this.state.vicinities}
                className="select"
              />

              <AsyncAutoSelect
                label="Nearest Bustop"
                errorStyle="margin-top: 8px !important;"
                promptText="Create Option "
                placeholder="Type your city"
                field_name="area"
                value={state.area}
                disabled={this.state.found && (state.area || "").length > 0}
                onChange={value => {
                  if (!!value) {
                    this.updateField("area", value);
                  }
                }}
                getData={getAreas(state.vicinity)}
                data={areas}
              />
            </React.Fragment>
          ) : null}
        </FormFieldsContainer>
      </ClientPageWrapper>
    );
  }
}

const MapFormWrapper = props => (
  <MapFormContext.Consumer>
    {({ state, display_error }) => {
      return (
        <LocationForm {...props} {...state} display_error={display_error} />
      );
    }}
  </MapFormContext.Consumer>
);

export class LocationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      geocodedAddress: false,
      display_error: false,
      customErrorMessage: "",
      areas: [],
      vicinities: []
    };
  }
  validateForm = fields => {
    let stringNotEmpty = ["address", "state", "vicinity", "area"].map(x => {
      return (fields[x] || "").length > 0;
    });
    // debugger;
    // let vicinityInList =
    //   this.state.vicinities.filter(
    //     x => x.toLowerCase() == fields.vicinity.toLowerCase()
    //   ).length > 0;
    // if(vicinityInList){
    //   this.setState({fields:{..}})
    // }
    return [...stringNotEmpty].reduce((p, c) => p && c, true);
  };
  updateFormState = (components, latitude, longitude, address) => {
    this.form.externalStateUpdate({
      ...components,
      latitude,
      longitude,
      address
    });
  };
  updateVicinities = vicinities => {
    this.setState({ vicinities });
  };
  render() {
    let {
      defaultCoordinate,
      validateField,
      showBackButton,
      backAction,
      updateState,
      hasGeocode = true
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
          if (!!p[0].longitude && !!p[0].latitude && hasGeocode) {
            return this.props.onSubmit(...p);
          } else {
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
                <MapFormComponent
                  latitude={state.latitude}
                  longitude={state.longitude}
                  updateState={updateState}
                  updateParentVicinities={this.updateVicinities}
                  defaultCoordinate={defaultCoordinate}
                  updateFormState={this.updateFormState}
                  getVicinities={this.props.getVicinities}
                  render={mapProps => {
                    return (
                      <MapFormWrapper
                        updateField={updateFields}
                        updateState={updateState}
                        updateParentVicinities={this.updateVicinities}
                        {...mapProps}
                        showBackButton={showBackButton}
                        backAction={backAction}
                        onSubmit={onSubmitForm}
                        states={this.props.states}
                        externalStateUpdate={externalStateUpdate}
                        getVicinities={this.props.getVicinities}
                        loading={this.props.loading}
                        getAreas={this.props.getAreas}
                        areas={this.props.areas}
                        vicinities={this.state.vicinities}
                        {...state}
                      />
                    );
                  }}
                />
              </FormValidationProvider>
            </MapFormContextProvider>
          );
        }}
      </FormContainer>
    );
  }
}
