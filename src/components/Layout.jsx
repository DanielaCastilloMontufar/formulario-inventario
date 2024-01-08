import Navbar from './Navbar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-32 p-4">
        {children}
      </div>
    </div>
  );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export default Layout;
