import Navbar from '../shared/Navbar';
import {MenuProvider} from '../../utils/state/Menu';

const Layout = ({ children }) => (
  <div>
     <MenuProvider>
    <Navbar />

     </MenuProvider>
    <div style={{marginTop: '100px'}}>
      {children}
    </div>
  </div>
)
export default Layout;