import { useState } from 'react'

const Search = ({ search, setSearch }) => {
    const [inputValue, setInputValue] = useState(search)

    const handleSearch = () => {
        setSearch(inputValue)
    }

    const handleClearSearch = () => {
        setInputValue('')
        setSearch('')
    }

    return (
        <div className="mt-4 mb-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control m-2"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            placeholder="SEARCH TASKS..."
                            aria-label="Search tasks"
                            onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
                        />
                        <span 
                            className="input-group-text btn-outline-primary border-2 rounded-2 m-2"
                            onClick={handleSearch}
                            role="button"
                            tabIndex="0"
                        >
                            <i className="bi bi-search"></i>
                        </span>
                        {inputValue && (
                            <span 
                                className="input-group-text btn-outline-danger border-2 rounded-2 m-2"
                                onClick={handleClearSearch}
                                role="button"
                                tabIndex="0"
                            >
                                <i className="bi bi-x-lg"></i>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search