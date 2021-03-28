import Navbar from '../shared/Navbar';
import {MenuProvider} from '../../utils/state/Menu';

const Layout = ({ children }) => (
  <div>
     <MenuProvider>
    <Navbar />

     </MenuProvider>
    <main>
      {children}
    </main>
  </div>
)
export default Layout;