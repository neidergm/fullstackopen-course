import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterActions"

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = ({ target: { value } }) => {
        // input-field value is in variable event.target.value
        dispatch(setFilter(value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} type="search" />
        </div>
    )
}

export default Filter