import React, { useState } from 'react';

export const ProductContext = React.createContext({
  products: [],
  toggleFav: (id) => {}
});



export default props => {
  const [productsList, setProductsList] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);

  const toggleFavorite = productId => {
    setProductsList(currentProdList => {
      // 선택한 값 index 찾기
      const prodIndex = currentProdList.findIndex(
        p => p.id === productId
      );

      // 기존 isFavorite 값의 반대값 저장
      const newFavStatus = !currentProdList[prodIndex].isFavorite;
      // 기존 currentProdList 값 복사
      const updatedProducts = [...currentProdList];
      // 선택한 값의 isFavorite 재할당
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex], // 이전 속성 모두 복사
        isFavorite: newFavStatus       // 저장해둔 값 넣기
      };

      return updatedProducts;
    });
  };

  return (
    <ProductContext.Provider value={{products: productsList, toggleFav: toggleFavorite}}>
      {props.children}
    </ProductContext.Provider>
  )
};