
const Filter = ({searchValue, onHandleSearch}) => {
  return (
    <form>
      <div>
        filter shown with <input type='search' value={searchValue} onChange={onHandleSearch} />
      </div>
    </form>
  )
}

export default Filter