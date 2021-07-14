import React, {Component} from 'react';
import './ItemDetails.css';
import ErrorButton from "../ErrorButton/ErrorButton";

const Record = ({data, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{data[field]}</span>
    </li>
  )
}

export { Record }

export default class ItemDetails extends Component {

  state = {
    data: null,
    image: null,
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl ) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const { itemId, getData,
            getImageUrl} = this.props;

    if (!itemId) return;

    getData(this.props.itemId)
      .then((data) => {
        this.setState({
          data,
          image: getImageUrl(data),
        });
      });
  }

  render() {
    const { data, image } = this.state;

    if (!data) {
      return <span>Select any items from a list!</span>;
    }

    return (
      <div className="item-details card">
        <img className="item-image"
             src={image} />

        <div className="card-body">
          <h4>{data.name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { data });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}


