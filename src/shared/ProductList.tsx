import React from 'react';
import ProductCard from './ProductCard';
import { ProductFromApi } from '@/scenes/admin/crud/product/Product';

type Props = {
  products: ProductFromApi[];
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="py-8 px-16">
      <div className="grid grid-cols-5 gap-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
