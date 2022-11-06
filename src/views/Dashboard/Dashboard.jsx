import React, { Component } from 'react';

import { AuthContext } from "../../layout/AuthDataProvider";
import api from '../../api/api';


class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props){
    super(props);

    this.state = {
      posts: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.callApi();
  }
  

  callApi = () => {
    const { token } = this.context;

    this.setState({
      isLoading: true,
    });

    api.read('posts', null, token).then((result) => {
        if(result && result.data && result.data.data && result.data.data.data && result.data.data.data.length > 0){
          this.setState({
            posts: result.data.data.data,
            isLoading: false,
          });
        } else {
          this.setState({
            posts: [],
            isLoading: false,
          });
        }
    });
  }


  render() {
    return <div className="dashboard-page">
      DASHBOARD

      {
        this.state.isLoading
        ?
        <div>Loading...</div>
        :
        <div>
        {
          (this.state.posts && this.state.posts.length > 0)
          ?
          this.state.posts.map((item, i) => {
            return <div key={i}>{item.title}</div>
          })
          :
          <>No Results!</>
        }
      </div>
      }
    </div>;
  }
}

export default Dashboard;
