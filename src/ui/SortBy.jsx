import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy() {
    const [searchParam, setSearchParams] = useSearchParams()
    const sortBy = searchParam.get('sortBy') ?? '';
    function handleSelect(e){
        searchParam.set("sortBy", e.target.value)
        setSearchParams(searchParam)
    }
    return (
        <Select onChange={handleSelect} value={sortBy}
        options={[{value: 'name-asc', label: 'Sort Name (A-Z)'},
        {value: 'name-dsc', label: 'Sort Name (Z-A)'},
        {value: 'regPrice-asc', label: 'Sort Price (Low-High)'},
        {value: 'regPrice-dsc', label: 'Sort Price (High-Low)'},
        {value: 'maxCapacity-asc', label: 'Sort Capacity (Low-High)'},
        {value: 'maxCapacity-dsc', label: 'Sort Capacity (High-Low)'},
    ]}/>
    )
}

export default SortBy
