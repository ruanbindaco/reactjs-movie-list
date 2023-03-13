import './header.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useWindowSize } from '../../hooks/useWindowSize';

function Header(){

  const windowType = useWindowSize();
  return(
    <>
    { windowType !== 'mobile'  ?
    <Navbar />
    :
    <Sidebar />
    }
    </>
  )
}

export default Header;