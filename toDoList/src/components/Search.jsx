const Search = ({search, setSearch}) => {
    return <div className="search">
        <h2>Search:</h2>
        <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Start typing to search..."  />
    </div>
}

export default Search