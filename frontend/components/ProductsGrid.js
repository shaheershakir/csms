import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import Center from "@/components/Center";
import React, { useState } from "react";
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;


const SearchBar = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 50%;
  font-size: 16px;
  outline: none;
  width: 80%;
  margin: 10px auto 20px;
`;

export default function ProductsGrid({ products }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Center>
      <SearchBar
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by product name..."
      />
      <StyledProductsGrid>
        {filteredProducts.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </StyledProductsGrid>
    </Center>
  );
}


