import React, {Component} from "react";
import Spinner from "../Spinner/Spinner";
import SwapiService from "../../services/SwapiServices";

const withListData = (View, getData) => {
  return class extends Component {

    state = {
      data: null
    }

    componentDidMount() {

      getData()
        .then((data) => {
          this.setState({
            data
          });
        });
    }

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data}/>
    }
  }
}


const withDetailsData = (View, getData, getImageUrl) => {

  return class extends Component {

    state = {
      data: null,
      image: null,
    }

    componentDidMount() {
      this.updateItem();
    }

    componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId) {
        this.updateItem();
      }
    }

    updateItem = () => {
      if (!this.props.itemId) return;

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

      return <View {...this.props} data={data} image={image}/>
    }
  }
}
export { withDetailsData, withListData };
