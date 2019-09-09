import React from 'react';

const SearchResultList = props => {
  const { data = [] } = props;
  return (
    <div className="result-list">
      {
        data.map(item => (
          <div key={item.id} className="list-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
        ))
      }

      {
        data.length === 0 &&
        <p className="empty">No bookmark found with this query!</p>
      }
    </div>
  );
}

export default SearchResultList;
