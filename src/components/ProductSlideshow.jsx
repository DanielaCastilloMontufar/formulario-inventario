// import React from "react";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

const ProductSlideshow = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <img
        src={`/images/producto.jpeg`}
        alt={`producto`}
        className="w-full aspect-square"
      />
    );
  }
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        const url = `/products/${image}`;
        return (
          <div className={styles["each-slide"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};

ProductSlideshow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { ProductSlideshow };
