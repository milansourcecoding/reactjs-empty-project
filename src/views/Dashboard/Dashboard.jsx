import React, { Component } from 'react';
import { AuthContext } from "../../layout/AuthDataProvider";

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  componentDidMount() {
    
  }
  
  render() {
    return <div className="dashboard-page">
      DASHBOARD
    </div>;
  }
}

export default Dashboard;
