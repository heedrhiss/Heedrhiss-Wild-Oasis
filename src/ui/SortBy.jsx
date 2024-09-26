import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types";
import Select from "./Select"

function SortBy({options}) {
    const [searchParam, setSearchParams] = useSearchParams()
    const sortBy = searchParam.get('sortBy') ?? '';
    function handleSelect(e){
        searchParam.set("sortBy", e.target.value)
        setSearchParams(searchParam)
    }
    return (
        <Select onChange={handleSelect} value={sortBy} options={options}/>
    )
}
SortBy.propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    )
};
export default SortBy
