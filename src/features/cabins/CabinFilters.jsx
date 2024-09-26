import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinFilters() {
    return (
       <TableOperations>
        <Filter filterName='discount' options={[{value: 'all', label: 'All'},
        {value: 'discount', label: 'Discount'},
        {value: 'no-discount', label: 'No Discount'}
        ]}/>
        <SortBy options={[{value: 'name-asc', label: 'Sort Name (A-Z)'},
        {value: 'name-dsc', label: 'Sort Name (Z-A)'},
        {value: 'regPrice-asc', label: 'Sort Price (Low-High)'},
        {value: 'regPrice-dsc', label: 'Sort Price (High-Low)'},
        {value: 'maxCapacity-asc', label: 'Sort Capacity (Low-High)'},
        {value: 'maxCapacity-dsc', label: 'Sort Capacity (High-Low)'},
    ]}/>
       </TableOperations>
    )
}

export default CabinFilters
