import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let inInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  // firebase 안에 있는 cart 데이터 가져오기
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // firebase 안에 cart 데이터 넣기
  useEffect(() => {
    if(inInitial) {
      inInitial = false;
      return;
    }

    // cart값이 수정된 경우
    if(cart.changed) {
      // fetch()를 가진 sendCartData 함수 가져오기
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification &&(
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
