import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const {cabins, isLoading} =  useCabins()
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('discount') ?? 'all';
  
  let filterCabins;

  if(filterValue === 'all') filterCabins = cabins
  if(filterValue === 'discount') filterCabins = cabins.filter(cabin => cabin.discount > 0)
  if(filterValue === 'no-discount') filterCabins = cabins.filter(cabin => cabin.discount == 0)

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  console.log(sortedCabins)

  if (isLoading) return <Spinner/>;
  return (
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Picture</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={filterCabins} render={(cabin)=> (<CabinRow cabin={cabin} key={cabin.id}/>)}/>
        </Table>
)
}
export default CabinTable;
