import React, { Component } from 'react';
import { graphql } from 'react-apollo';
//compose not exported from react-apollo anymore
//compose was removed from React Apollo 3 
//(see the Breaking Changes). Now, to use compose
//use lodash's flowRight.
//To install lodash's flowRight use:
//yarn add lodash.flowright or npm i lodash.flowright
//to import: import {flowRight as compose} from 'lodash'; 
//or like below
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  displayAuthors(){
    let data = this.props.getAuthorsQuery;
    if(data.loading){
      return(<option disable>Loading Authors...</option>)
    }else{
      return data.authors.map(author => {
      return(<option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }

  submitForm(e){
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }
  render(){
  return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this)}>

        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select Author </option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
        
      </form>
    );
  }
}

export default compose( 
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"}),

  )(AddBook)