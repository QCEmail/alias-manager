import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import './AddAlias.css';

export default class AddAlias extends Component {
  static propTypes = {
    currentDomain: PropTypes.string,
    otherDomains: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.shape({
      createNewAlias: PropTypes.func,
      addNewDomain: PropTypes.func,
      setCurrentDomain: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    currentDomain: '',
    otherDomains: [],
  };

  constructor() {
    super();
    this.addressRef = React.createRef();
    this.notesRef = React.createRef();
    this.formRef = React.createRef();

    this.state = {
      errorMsg: null,
      successMsg: null,
      addressError: null,
      creating: false,
      showingDropdown: false,
    };
  }

  componentDidMount() {
    this.formRef.current.addEventListener('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    this.formRef.current.removeEventListener('keydown', this.handleKeydown, false);
  }

  handleKeydown = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      this.addAlias();
    }
  };

  toggleDropdown = () => {
    const { showingDropdown } = this.state;
    this.setState({ showingDropdown: !showingDropdown });
  };

  addAlias = () => {
    const { currentDomain, actions } = this.props;
    const { value } = this.addressRef.current;
    const { value: notes } = this.notesRef.current;
    if (!currentDomain) {
      this.setState({ addressError: 'Please provide a domain' })
    } else if (!value) {
      this.setState({ addressError: 'Please provide an alias name' })
    } else {
      const newAlias = `${value}@${currentDomain}`;
      this.setState({ creating: true, successMsg: null, errorMsg: null });
      actions.createNewAlias(newAlias, notes)
        .then(result => {
          this.addressRef.value = '';
          const successMsg = `${newAlias} added!`;
          this.setState({ successMsg, creating: false });
        })
        .catch(errorMsg => {
          this.setState({ errorMsg, creating: false });
        })
    }
  };

  addNewDomain = () => {
    // TODO put up a modal to enter a new domain
  };

  setDomain = (currentDomain) => () => {
    const { actions } = this.props;
    actions.setCurrentDomain(currentDomain);
  };

  render() {
    const { currentDomain, otherDomains, actions } = this.props;
    const { successMsg, errorMsg, addressError, creating, showingDropdown } = this.state;
    return (
      <div className="add-alias-container">
        <Form className="add-alias-form" innerRef={this.formRef}>
          {successMsg && (
            <Alert color="success">{successMsg}</Alert>
          )}
          {errorMsg && (
            <Alert color="danger">{errorMsg}</Alert>
          )}
          <FormGroup>
            <Label for="address">Alias Address</Label>
            <InputGroup>
              <Input
                name="address"
                id="address"
                placeholder="Alias Name"
                invalid={!!addressError}
                valid={!addressError}
                innerRef={this.addressRef}
              />
              <FormFeedback invalid="true">Address is required</FormFeedback>
              <InputGroupButtonDropdown addonType="append" toggle={this.toggleDropdown} isOpen={showingDropdown}>
                <InputGroupText>@</InputGroupText>
                <DropdownToggle caret>
                  {currentDomain}
                </DropdownToggle>
                <DropdownMenu>
                  {_.map(otherDomains, (domain) => (
                    <DropdownItem key={domain} onClick={this.setDomain(domain)}>{domain}</DropdownItem>
                  ))}
                  {otherDomains.length && <DropdownItem divider />}
                  <DropdownItem onClick={this.addNewDomain}>New Domain...</DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="address">Notes</Label>
            <Input
              name="notes"
              id="notes"
              type="textarea"
              placeholder="Add notes for this alias"
              innerRef={this.notesRef}
            />
          </FormGroup>
          <Button
            onClick={this.addAlias}
            disabled={creating}
            color="primary"
            block
          >
            Add Alias
          </Button>
        </Form>
      </div>
    );
  }
}
