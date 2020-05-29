import * as actionTypes from './actions';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,

  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error =>
        dispatch(purchaseBurgerFailed(error))
      );
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};


export const fetchOrders = (token, userId) => {
  return dispatch => {
    const queryParam = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    console.log(queryParam);
    axios.get(`/orders.json${queryParam}`)
      .then(result => {
        const fetchOrders = [];
        for (let key in result.data) {
          fetchOrders.push({
            ...result.data[key],
            id: key,
          });
        }
        console.log(fetchOrders);
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      })
  }
}
