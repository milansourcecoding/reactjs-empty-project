import React, { Component } from 'react';

import { AuthContext } from "../../layout/AuthDataProvider";


class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props){
    super(props);

    this.state = {
      title: 'DASHBOARD'
    }
  }

  componentDidMount() {
    
  }
  
  render() {
    return <div className="dashboard-page">
      {this.state.title}
    </div>;
  }
}

export default Dashboard;
