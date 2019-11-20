import React, { Component } from 'react';
import HTTP from '../../script/service';

class Search extends Component {
  componentDidMount(){
    HTTP._get_web_cat({
      cat_pid: 0
    }).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Search;