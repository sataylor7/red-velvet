import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

//for testing purposes
export class [NAME]Container extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //dispatch events
  }

  render() {
    return (
      <div>
        This is an awesome [NAME] container!
      </div>
    );
  }
}

[NAME]Container.propTypes = {}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return { }
}
//switch out the nulls to be the two above functions if you want to connect to the store
export default connect( null, null)([NAME]Container);;
