import React from "react";
import styled from "styled-components";

import { ProductsContainer } from "./ProductsContainer";
// import { CartContainer } from "./CartContainer";
// import "./App.css";

const PageContainer = styled.div`
  display: flex;
`;

export function App() {
  return (
    <PageContainer>
      <ProductsContainer />
      {/* <CartContainer /> */}
    </PageContainer>
  );
}
