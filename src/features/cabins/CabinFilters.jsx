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
        <SortBy/>
       </TableOperations>
    )
}

export default CabinFilters
