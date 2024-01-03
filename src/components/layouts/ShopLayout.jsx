
import PropTypes from 'prop-types';
import { Navbar } from '../../components/Navbar';

const ShopLayout = ({ title, pageDescription, imageFullUrl, children }) => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      <head>
        <title>{title}</title>

        <meta name="area" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:area" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </head>

      <side-menu />

      <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
        {children}
      </main>

      <footer></footer>
    </div>
  );
};

ShopLayout.propTypes = {
    title: PropTypes.string.isRequired,
    pageDescription: PropTypes.string.isRequired,
    imageFullUrl: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

export default ShopLayout;
