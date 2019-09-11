import React from "react";
import styled, { css } from "styled-components";
import globals, { spacing, color } from "../siteStyle";
import {
  DefaultButton,
  SecondaryButton,
  PrimaryButton
} from "../simple/Button";
import Icon from "../simple/Icon";
import { EditableFormContainer } from "./EditableFormContainer";
import Media from "react-media";
import { FormContainer } from "../layout/FormContainer";
import { AddIcon } from "./AddIcon";
const { siteText, xs } = globals;

const textFont = "17px";
const leadingColor = "#0064e6";

export const DragIcon = () => (
  <Media query={`(max-width: ${xs}px)`}>
    {matches =>
      matches ? null : (
        <div className="board-drag">
          <i className="fa fa-arrows-v fa-2x" />
        </div>
      )
    }
  </Media>
);

export class QualificationComponent extends React.Component {
  state = {
    isOpen: false
  };
  handleEdit = () => {
    if (!!this.props.onEditItem) {
      let result = this.props.onEditItem();
      if (!!result) {
        result.then(isOpen => {
          this.setState({ isOpen });
        });
      } else {
        this.setState({ isOpen: true });
      }
    }
    // if(!!this.props.onEditItem){
    //   this.props.onEditItem(true);
    // }
  };
  onDelete = e => {
    console.log("hello");
    const result = confirm("Are you sure you want to delete?");
    if (!!result) {
      this.props.onDelete();
    }
  };
  handleSubmit = e => {
    this.props.onSave(e);
    if (this.props.isValid()) {
      this.setState({ isOpen: false });
    }
  };
  closeEdit = () => {
    this.props.cancelAction();
    this.setState({ isOpen: false });
  };
  render() {
    const {
      children,
      heading,
      subtitle,
      image,
      render,
      RootComponent = Div
    } = this.props;
    const DisplayHidden = !this.state.isOpen ? null : <div>{children}</div>;
    return (
      <RootComponent>
        <EditableFormContainer
          isOpen={this.state.isOpen}
          heading={heading}
          image={image}
          renderHeading={render}
          subtitle={subtitle}
          handleSubmit={this.handleSubmit}
          handleEdit={this.handleEdit}
          handleDelete={this.onDelete}
          handleCancel={this.closeEdit}
        >
          {DisplayHidden}
        </EditableFormContainer>
      </RootComponent>
    );
  }
}

export const Divider = styled.hr`
  margin-bottom: 46px;
`;

class FormSetItem extends React.Component {
  state = {
    data: this.props.data
  };
  onSubmit = fields => {
    return new Promise((resolve, reject) => {
      this.props.submitForm(fields);
      this.setState({ collapsed: true, data: fields });
      resolve({});
    });
  };
  onCancel = () => {
    // this.node is a ref on the child component
    this.node.setState({ fields: this.state.data });
  };
  getData() {
    if (!!this.node) {
      return this.node.state.fields;
    }
    if (Object.keys(this.state.data).length > 0) {
      return this.state.data;
    }
  }
  formIsValid = (invert = false) => {
    if (!!this.node) {
      let allFieldPopulated = this.node.allFieldPopulated(
        this.props.fields,
        this.props.validateFunc
      );
      if (allFieldPopulated) {
        return this.node.validateFields() && allFieldPopulated;
      } else {
        let rr = this.node.allFieldsAreEmpty();
        return invert ? !rr : rr;
      }
    }
  };
  toggleError() {
    this.node.toggleErrorFields();
  }
  onEdit = () => {
    const { editForm } = this.props;
    return editForm(() => {});
  };
  renderHeading = () => {};
  render() {
    const {
      heading,
      FormElement,
      render,
      formProps = {},
      deleteForm,
      editForm = () => {}
    } = this.props;
    return (
      <FormContainer
        displayButton={false}
        submitFormToServer={this.onSubmit}
        details={this.state.data}
        resetError={false}
        errors={this.props.errors}
        ref={node => (this.node = node)}
      >
        {(data, updateFields, onSubmitForm) => {
          const { fields, validate, errors } = data;
          const state = fields;
          const formRenderer = (
            <FormElement
              state={state}
              updateFields={updateFields}
              validate={validate}
              errors={errors}
              validateField={validateField}
              {...formProps}
            />
          );
          return this.props.condition ? (
            <QualificationComponent
              render={() => render(state)}
              onEditItem={editForm}
              image={this.props.image}
              onDelete={deleteForm}
              onSave={onSubmitForm}
              cancelAction={this.onCancel}
              isValid={this.formIsValid}
            >
              {formRenderer}
            </QualificationComponent>
          ) : (
            formRenderer
          );
        }}
      </FormContainer>
    );
  }
}
function validateField(state, field, err) {
  return !!state[field] && state[field].length > 0;
}

export class Formset extends React.Component {
  state = {
    formset: this.props.data
  };
  nodes = [];
  _addForm(data) {
    const { onCreate = {} } = this.props;
    let newArr = !!data ? data : this.state.formset;
    let formset = [...newArr, onCreate];
    this.setState({ formset });
  }
  getNodes() {
    return this.nodes.filter(x => !!x).filter(x => !!x.node);
  }
  validateAllForms() {
    const result = this.getNodes().reduce((a, i, index) => {
      return index === 0 ? a && i.formIsValid(true) : a && i.formIsValid(false);
    }, true);
    return result;
  }
  componentDidMount() {
    if (this.state.formset.length === 0) {
      this._addForm();
    }
  }
  deleteForm = index => {
    const formset = this.state.formset.filter((x, i) => i !== index);
    this.setState({ formset });
  };
  saveForm = (index, fields) => {
    const formset = this.state.formset.map(
      (x, i) => (i === index ? fields : x)
    );
    this.setState({ formset });
  };
  onEditForm = editAction => {
    return new Promise((resolve, reject) => {
      // if (this.validateAllForms()) {
      resolve(true);
      // } else {
      //   resolve(false);
      //   this.toggleError();
      // }
    });
  };
  getPopulatedFormsets = nodes => {
    return nodes
      .filter(x => x.node.allFieldPopulated(this.props.form_fields))
      .map(x => x.getData());
  };
  getResult = () => {
    return this.getPopulatedFormsets(this.getNodes());
  };
  handleSubmit = () => {
    let nodes = this.getNodes();
    let allFormValid = this.validateAllForms();
    if (allFormValid) {
      let results = this.getPopulatedFormsets(nodes);
      return this.props.onSubmit(results);
    } else {
      this.toggleError();
    }
  };
  toggleError() {
    this.getNodes().forEach(node => node.toggleError());
  }
  addNewForm = () => {
    if (this.validateAllForms()) {
      let result = this.getPopulatedFormsets(this.getNodes());
      this._addForm(result);
    } else {
      this.toggleError();
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.formset.map((formset, index) => (
          <FormSetItem
            key={index}
            ref={node => (this.nodes[index] = node)}
            data={formset}
            errors={this.props.errors}
            editForm={this.onEditForm}
            formProps={this.props.formProps}
            deleteForm={() => this.deleteForm(index)}
            validateFunc={this.props.validateFunc}
            submitForm={fields => this.saveForm(index, fields)}
            fields={this.props.form_fields}
            image={this.props.image}
            render={() =>
              Object.keys(formset).length > 0
                ? this.props.render(formset)
                : null
            }
            condition={index < this.state.formset.length - 1}
            FormElement={this.props.formElement}
          />
        ))}
        {this.state.formset.length < this.props.maxCount || 2 ? (
          <Div>
            <AddIcon
              onClick={() => this.addNewForm()}
              text={this.props.addText}
            />
            {this.props.showDivider ? <Divider /> : null}
          </Div>
        ) : null}
        {this.props.showButton ? (
          <PrimaryButton onClick={this.handleSubmit}>Submit Form</PrimaryButton>
        ) : null}
      </React.Fragment>
    );
  }
}
const Div = styled.div`
  ${props => props.css};
`;
export default Formset;
