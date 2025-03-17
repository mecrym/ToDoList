import { useState } from 'react';

const Search = ({ search, setSearch }) => {
    const [inputValue, setInputValue] = useState(search);

    const handleSearch = () => {
        setSearch(inputValue);
    };

    return (
        <div className="mt-4 mb-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control form-control-lg border-secondary"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            placeholder="Start typing to search..."
                            aria-label="Search tasks"
                            onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
                        />
                        <span 
                            className="input-group-text border-secondary bg-light"
                            onClick={handleSearch}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex="0"
                        >
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;