import * as React from 'react';

function Product (props: any) {
  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img className="card__image" src={props.data.imageUrl} alt="" />
      </div>
      <div className="card__description-wrapper">
        <div className="card__description">
          <span className="card__description-name">{props.data.productName}</span>
          <div className="card__description-price">
            <span>{props.data.price}kn</span>
          </div>
        </div>
        <img className="card__basket-icon" src="./shopping-cart.svg" alt="" />
      </div>

    </div>
  );
}

export default Product;