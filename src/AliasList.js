import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, Button, UncontrolledTooltip } from 'reactstrap';

import Icon from './Icon';
import './AliasList.css';

export default class AliasList extends PureComponent {
  static propTypes = {
    aliases: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['active', 'disabled']).isRequired,
      notes: PropTypes.string,
    })).isRequired,
  };

  render() {
    const { aliases } = this.props;
    return (
      <Table size="sm" striped>
        <thead>
          <tr>
            <th>Address</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aliases.map((alias, i) => {
            const id = `alias-${i}-id`;
            const statusAction = alias.status === 'active' ? (
              <Button close title="Disable" aria-label="Disable Alias">
                <Icon icon="ban" />
              </Button>
            ) : (
              <Button close title="Enable" aria-label="Enable Alias">
                <Icon icon="check" />
              </Button>
            );
            let displayNotes = _.truncate(alias.notes);
            if (displayNotes !== alias.notes) {
              displayNotes = (
                <span>
                  <span id={id}>{displayNotes}</span>
                  <UncontrolledTooltip target={id}>{alias.notes}</UncontrolledTooltip>
                </span>
              )
            }
            return (
              <tr key={id}>
                <td>{alias.address}</td>
                <td>
                  {_.capitalize(alias.status)}
                </td>
                <td>
                  {displayNotes}
                </td>
                <td className="actions">
                  <Button close title="Edit Notes" aria-label="Edit Alias Notes">
                    <Icon icon="edit" />
                  </Button>
                  {statusAction}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
