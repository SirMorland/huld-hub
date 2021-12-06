import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import ItemListEdit from './ItemListEdit';
import FormWithInputAndBtn from './FormWithInputAndBtn';

const DOMAIN_TYPES = { INT: 'internal', EXT: 'external' };
const emailDomainRegrex =
  /^@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formatInput = (input) => {
  if (input.length === 1 && input[0] !== '@') return `@${input}`;
  if (input.length > 1 && input[input.length - 1] === '@')
    return input.slice(0, input.length - 1);
  return input;
};

function EmailDomainEdit(props) {
  const { emailDomains, onAdd, onRemove } = props;
  const [internalDomain, setInternalDomain] = useState('');
  const [externalDomain, setExternalDomain] = useState('');

  const formatedEmailDomains = emailDomains.map((emailDomain) => ({
    ...emailDomain,
    name: `@${emailDomain.domain}`,
  }));

  const internalDomains = formatedEmailDomains.filter(
    (domain) => domain.type === 'internal'
  );
  const externalDomains = formatedEmailDomains.filter(
    (domain) => domain.type === 'external'
  );

  const submit = (e, type) => {
    e.preventDefault();

    switch (type) {
      case DOMAIN_TYPES.INT:
        // Test that domain has correct format
        if (!emailDomainRegrex.test(internalDomain)) return;

        // check that domain has not been added before
        if (
          !formatedEmailDomains.some(
            (domain) =>
              domain.name.toLowerCase() === internalDomain.toLowerCase()
          )
        ) {
          onAdd(type, internalDomain.slice(1).toLowerCase());
        }
        setInternalDomain('');
        break;
      case DOMAIN_TYPES.EXT:
        // Test that domain has correct format
        if (!emailDomainRegrex.test(externalDomain)) return;
        // check that domain has not been added before
        if (
          !formatedEmailDomains.some(
            (domain) =>
              domain.name.toLowerCase() === externalDomain.toLowerCase()
          )
        ) {
          onAdd(type, externalDomain.slice(1).toLowerCase());
        }
        setExternalDomain('');
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Typography variant="h2" colour="primary">
        Allowed email domains
      </Typography>
      <div style={{ margin: '4px 0' }} data-testid="internal-email-domains">
        <Typography variant="h3" colour="primary">
          Internal
        </Typography>
        <ItemListEdit items={internalDomains} onRemove={onRemove} />
        <FormWithInputAndBtn
          placeholder={`Create new employee domain`}
          value={formatInput(internalDomain)}
          setValue={setInternalDomain}
          onSubmit={(e) => submit(e, DOMAIN_TYPES.INT)}
        />
      </div>
      <div data-testid="external-email-domains">
        <Typography variant="h3" colour="primary">
          External
        </Typography>
        <ItemListEdit items={externalDomains} onRemove={onRemove} />
        <FormWithInputAndBtn
          placeholder={`Create new contractor domain`}
          value={formatInput(externalDomain)}
          setValue={setExternalDomain}
          onSubmit={(e) => submit(e, DOMAIN_TYPES.EXT)}
        />
      </div>
    </div>
  );
}

EmailDomainEdit.defaultProps = {
  emailDomains: [],
  onRemove: () => {},
  onAdd: () => {},
};

EmailDomainEdit.propTypes = {
  emailDomains: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      domain: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default EmailDomainEdit;
