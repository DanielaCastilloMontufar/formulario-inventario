import PropTypes from 'prop-types';
import { Grid } from "@mui/material";
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      active_type: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      area: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      serial: PropTypes.string.isRequired,
      measures: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
      condition_use: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      attendant: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductList;
