/*global chrome*/

import React from 'react';
import './App.css';
import SearchResultList from './components/SearchResultList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      resultList: []
    }
  }

  componentDidMount() {
    this.refs.search.focus();
  }

  searchBookmarks = event => {
    const query = event.target.value;
    
    chrome.bookmarks.search(query, (data) => {
      const resultList = data.filter(item => item.url);
      this.setState({
        query,
        resultList
      });
    });
  }

  render() {
    const { query, resultList } = this.state;

    return (
      <div className="App">
        <input  type="text"
                name="search"
                placeholder="Start typing to start searching for your bookmark..."
                tabindex="0"
                ref="search"
                value={query} 
                onChange={this.searchBookmarks}
        />
        <SearchResultList data={resultList}/>
      </div>
    );
  }
}

export default App;
