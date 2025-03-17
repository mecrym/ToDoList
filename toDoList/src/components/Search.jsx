import { useState } from 'react'

const Search = ({ search, setSearch }) => {
    const [inputValue, setInputValue] = useState(search)

    const handleSearch = () => {
        setSearch(inputValue)
    }

    return (
        <div className="y2k-search-container mt-4 mb-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="input-group y2k-search-group">
                        <input
                            type="text"
                            className="form-control y2k-search-input"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            placeholder="SEARCH TASKS..."
                            aria-label="Search tasks"
                            onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
                        />
                        <span 
                            className="input-group-text y2k-search-button"
                            onClick={handleSearch}
                            role="button"
                            tabIndex="0"
                        >
                            <i className="bi bi-search y2k-search-icon"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search