import React from "react";

class SearchResultList extends React.Component {
  render() {
    const { data = [], cursor } = this.props;
    const itemClass = "list-item";
    return (
      <div className="result-list">
        {data.map((item, index) => (
          <div key={item.id} className={itemClass + (cursor === index ? ' active' : '')}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
        ))}

        {data.length === 0 && (
          <p className="empty">No bookmark found with this query!</p>
        )}
      </div>
    );
  }
}

export default SearchResultList;
