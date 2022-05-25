import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

// 데이터 호출 fetch 와 상태에 따른 처리
export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch('https://react-study-2cfc9-default-rtdb.firebaseio.com/cart.json');
      
      if(!response.ok) {
        throw new Error('Cloud not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed.'
      }));
    }
  };
}

// 데이터 전송 fetch 와 상태에 따른 처리
export const sendCartData = cart => {
  return async dispatch => {
    // 진행 중
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
    }));

    // 데이터 호출
    const sendRequest = async () => {
      const response = await fetch('https://react-study-2cfc9-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });

      // error 처리
      if(!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      // 위의 함수 실행
      await sendRequest();
      
      // 성공
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Send cart data successfully!!'
      }));
    } catch (error) {
      // 실패
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed.'
      }));
    }
  };
};