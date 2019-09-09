/*global chrome*/

import React from 'react';
import './App.css';
import SearchResultList from './components/SearchResultList';

class App extends React.Component {
  UP_KEY = 38;
  DOWN_KEY = 40;
  ENTER_KEY = 13;

  constructor() {
    super();
    this.state = {
      query: '',
      resultList: [],
      cursor: 0
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
        ...this.state,
        query,
        resultList
      });
    });
  }

  handleKeyDown = event => {
    const { cursor, resultList } = this.state;
    const { keyCode } = event;

    if (keyCode === this.UP_KEY && cursor > 0) {
      this.setState(prevState => ({
        ...prevState,
        cursor: prevState.cursor - 1
      }));
    } else if (keyCode === this.DOWN_KEY && cursor < resultList.length - 1) {
      this.setState(prevState => ({
        ...prevState,
        cursor: prevState.cursor + 1
      }));
    } else if (keyCode === this.ENTER_KEY && cursor < resultList.length) {
      const url = resultList[cursor].url;
      const win = window.open(url, '_blank');
      win.focus();
    }
  }

  render() {
    const { query, resultList, cursor } = this.state;

    return (
      <div className="App">
        <input  type="text"
                name="search"
                placeholder="Start typing to start searching for your bookmark..."
                tabindex="0"
                ref="search"
                onKeyDown={this.handleKeyDown}
                value={query} 
                onChange={this.searchBookmarks}
        />
        <SearchResultList data={resultList} cursor={cursor}/>
      </div>
    );
  }
}

export default App;
