import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

import CreateCabinForm from './CreateCabinForm';
import { formatCurrency } from '../../utils/helpers';
import { deleteCabin } from '../../services/cabinsAPI';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regPrice,
    discount,
    image,
  } = cabin;
  const queryClient = useQueryClient()

  const {mutate, isLoading: isDeleting} = useMutation({
    mutationFn: deleteCabin,
    onSuccess: ()=> {
      toast.success('Cabin deleted successfully')
      queryClient.invalidateQueries({
      queryKey: ['cabins'],
    })},
    onError: (err)=> {
      err = err.message
      toast.error(err)
    }
  })
  return (
    <>
    <TableRow role='row'>
      <Img src={image} alt={`Cabin ${name}`} />

      <Cabin>{name}</Cabin>

      <div>Max of {maxCapacity} guests</div>

      <Price>{formatCurrency(regPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
      <button onClick={()=> setIsEditing(!isEditing)}>{isEditing ? "Close" : "Edit"}</button>
      <button disabled={isDeleting} onClick={()=> mutate(cabinId)}>Delete</button>
      </div>
    </TableRow>
    {isEditing && <CreateCabinForm cabinToEdit={cabin}/>}
    </>
  );
}
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regPrice: PropTypes.number.isRequired,
    discount: PropTypes.number, // Optional
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CabinRow;


