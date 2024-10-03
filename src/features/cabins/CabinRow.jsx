import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IconContext } from "react-icons";
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { formatCurrency } from '../../utils/helpers'
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import Table from '../../ui/Table';

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

const Button = styled.div`
  display: flex;
  justify-content: space-around;
  items-align: center;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletingState, setIsDeletingState] = useState(false);
  const {addCabin, isCreatingCabin} = useCreateCabin()
  const {delCabin, isDeleting} = useDeleteCabin()

  const {
    id: cabinId,
    name,
    maxCapacity,
    regPrice,
    discount,
    description,
    image,
  } = cabin;
  function handleCopy(){
    addCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regPrice,
      discount,
      description,
      image
    })
  }
  const isLoading = isCreatingCabin || isDeleting;

  return (
    <>
    <Table.Row>
      <Img src={image} alt={`Cabin ${name}`} />

      <Cabin>{name}</Cabin>

      <div>Max of {maxCapacity} guests</div>

      <Price>{formatCurrency(regPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Button>
      <button onClick={handleCopy} disabled={isLoading}><HiSquare2Stack/></button>
      <button onClick={()=> setIsEditing(!isEditing)}><HiPencil/></button>
      {isEditing &&
      <Modal onClose={()=> setIsEditing(!isEditing)}>
        <CreateCabinForm cabinToEdit={cabin} onClose={()=> setIsEditing(false)}/>
      </Modal>}
      <button disabled={isLoading} onClick={()=> setIsDeletingState(true)}>
      <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
      <HiTrash/>
      </IconContext.Provider>
      </button>
      {isDeletingState && <Modal onClose={()=> setIsDeletingState(false)}>
        <ConfirmDelete resource='Cabin' disabled={isLoading} closeModal={()=> setIsDeletingState(false)}
        onConfirm={()=> delCabin(cabinId)}/>
        </Modal>}
      </Button>
    </Table.Row>
 
    </>
  );
}
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default CabinRow;


