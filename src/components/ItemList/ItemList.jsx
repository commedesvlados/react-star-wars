import React from 'react';
import './ItemList.css';
import PropTypes from 'prop-types'


const ItemList = (props) => {

  const { data, onItemSelected, children: renderLabel } = props;

  const items = data.map((item) => {
    return (
      <li key={item.id}
          className="list-group-item"
          onClick={() => onItemSelected(item.id)}>
        {renderLabel(item)}
      </li>
    )
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
}

ItemList.defaultProps = {
  onItemSelected: () => {}
}

ItemList.propType = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemSelected: PropTypes.func,
  children: PropTypes.func.isRequired
}

export default ItemList;

