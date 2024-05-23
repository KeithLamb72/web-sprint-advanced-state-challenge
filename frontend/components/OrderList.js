// frontend/components/OrderList.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchOrdersQuery } from '../state/services/ordersApi';
import { updateFormState } from '../state/slices/formSlice';

export default function OrderList() {
  const { data: orders = [], error, isLoading, refetch } = useFetchOrdersQuery();
  const [filter, setFilter] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFormState({ size: '' })); // Reset form size selection
  }, [dispatch]);

  const filteredOrders = filter === 'All' ? orders : orders.filter((order) => order.size === filter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders</div>;
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              {order.customer} ordered a size {order.size} with {order.toppings && order.toppings.length > 0 ? `${order.toppings.length} toppings` : 'no toppings'}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => (
          <button
            data-testid={`filterBtn${size}`}
            className={`button-filter${filter === size ? ' active' : ''}`}
            key={size}
            onClick={() => setFilter(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
