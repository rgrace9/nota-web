import Navbar from '../shared/Navbar';
import {MenuProvider} from '../../utils/state/Menu';

const Layout = ({ children }) => (
  <div>
     <MenuProvider>
    <Navbar />

     </MenuProvider>
    <main style={{marginTop: '100px'}}>
      {children}
    </main>
  </div>
)
export default Layout;