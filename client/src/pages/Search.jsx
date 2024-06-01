import './Search.css';

export default function Search() {
  return (
    <div className="search-container">
      <div className="search-sidebar">
        <form className="search-form">
          <div className="form-group">
            <label className="form-label">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Type:</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input type="checkbox" id="all" className="form-checkbox" />
                <span>Rent & Sale</span>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="rent" className="form-checkbox" />
                <span>Rent</span>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="sale" className="form-checkbox" />
                <span>Sale</span>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="offer" className="form-checkbox" />
                <span>Offer</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Amenities:</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input type="checkbox" id="parking" className="form-checkbox" />
                <span>Parking</span>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="furnished" className="form-checkbox" />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Sort:</label>
            <select id="sort_order" className="form-select">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="listing-results">
        <h1 className="results-title">
          Listing results:
        </h1>
      </div>
    </div>
  );
}
