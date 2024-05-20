import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../state/slices/ordersSlice'

export default function OrderList() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.orders)
  const status = useSelector((state) => state.orders.status)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading orders...</div>
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {order.customer} ordered a size {order.size} with {order.toppings.length === 0 ? 'no toppings' : `${order.toppings.length} toppings`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
