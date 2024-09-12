import GeneralStyle from "./styles/GeneralStyle"
import Button from './ui/Button';
import Input from './ui/Input';

function App() {
  return (
    <>
    <GeneralStyle/>
    <h1>Hello world</h1>
    <Button>Check In</Button>
    <Button>Check Out</Button>
    <Input type="text" placeholder="Enter name"/>
    <Input type="number" placeholder="Enter number"/>
    </>
  )
}

export default App
