import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import ItemListEdit from './ItemListEdit';
import FormWithInputAndBtn from './FormWithInputAndBtn';
import { capitalizeFirstLetters } from '../utils';
import { CondensedGrid } from './GenericComponents';

function CompetenceEdit(props) {
  const { items, onAdd, onRemove, type } = props;
  const [newItem, setNewItem] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onAdd(newItem);
    setNewItem('');
  };

  return (
    <>
      <CondensedGrid>
        <Typography variant="h2" colour="primary">
          {capitalizeFirstLetters(type)}
        </Typography>
        <ItemListEdit items={items} onRemove={onRemove} />
      </CondensedGrid>
      <FormWithInputAndBtn
        placeholder={`Create new ${type}`}
        value={newItem}
        setValue={setNewItem}
        onSubmit={submit}
      />
    </>
  );
}

CompetenceEdit.defaultProps = {
  items: [],
  onRemove: () => {},
  onAdd: () => {},
  type: '',
};

CompetenceEdit.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default CompetenceEdit;
