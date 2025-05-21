import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = () => {
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get("https://food-delivery-application-backend-production-dc3a.up.railway.app/api/orders/all");
    setData(response.data)
  };

  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(`https://food-delivery-application-backend-production-dc3a.up.railway.app/api/orders/status/${orderId}?status=${event.target.value}`);
    if (response.status === 200) {
      await fetchOrders();
    }
  };


  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className="containers">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className='table table-responsive'>
            <tbody>
              {
                data.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={assets.parcel} alt="" height={48} width={48} />
                      </td>
                      <td>
                        <div>
                          {order.orderedItems.map((item, index) => {
                            if (index === order.orderedItems.lenght - 1) {
                              return item.name + " X " + item.quantity;
                            } else {
                              return item.name + " X " + item.quantity + ",";
                            }
                          })}
                        </div>
                        <div>
                          Address :{order.userAddress}
                        </div>
                      </td>
                      <td>&#x20B9;{order.amount.toFixed(2)}</td>
                      <td>Items : {order.orderedItems.length}</td>
                      <td>
                        <select className="form-control" onChange={(event) => updateStatus(event, order.id)} value={order.orderStatus}>
                          <option value="Food preparing">Food Preapring</option>
                          <option value="Out of delivery">Out of delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders;