import React from "react";
import PropTypes from "prop-types";
import SelectAutocompleteField from "./SelectAutocompleteField";
import ItemListEdit from "./ItemListEdit";

function AdminUserManager(props) {
    const { items, onRemove, options, onSelect } = props;

    return (
        <div>
            <ItemListEdit items={items} onRemove={onRemove} />
            <SelectAutocompleteField
                options={options}
                onSelect={onSelect}
                label="Pick an user to become Admin"
            />
        </div>
    );
}

AdminUserManager.default = {
    items: [],
    onRemove: () => { },
    options: [],
    onSelect: () => { },
};

AdminUserManager.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            profile: PropTypes.object.isRequired,
            role: PropTypes.object.isRequired,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            profile: PropTypes.object.isRequired,
            role: PropTypes.object.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default AdminUserManager;