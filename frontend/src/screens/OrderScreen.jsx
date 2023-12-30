import React from "react";
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import {Link, useParams} from 'react-router-dom';


const OrderScreen = () => {

  const {id: orderId} = useParams();
  const {data: order, refetch, isLoading,error} = useGetOrderDetailsQuery(orderId);


  return isLoading ? <Loader/>: error ? <Message variant='danger'/> : (
    <>
    <h1>Đơn hàng {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Vận chuyển</h2>
            <p><strong>Tên: </strong> {order.user.name}</p>
            <p>
              <strong>Email: </strong> {order.user.email}
            </p>
             <p>
              <strong>Địa chỉ: </strong> 
              {order.shippingAddress.address},{' '}
               {order.shippingAddress.city}, {' '}
               {order.shippingAddress.postalCode},  {' '}
               {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Chưa giao hàng</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Phương thức thanh toán</h2>
            <p>
              <strong>Phương thức: </strong>
              {order.paymentMethod}
            </p>

             {order.isPaid ? (
              <Message variant='success'>
                Paid on {order.paidAt}
              </Message>
            ) : (
              <Message variant='danger'>Chưa thanh toán</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Các đơn hàng</h2>
            {order.orderItems.map((item, index)=>(
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col>
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>
                  </Col>
                  <Col md={4}>
                   Số lượng: {item.qty} Sản phẩm 
                   <Col>
                   Giá = ${item.qty * item.price}
                   </Col>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>  
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Cái Giá Phải Trả</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Giá sản phẩm</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>

                <Row>
                <Col>Phí vận chuyển</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>

              <Row>
                <Col>Thuế</Col>
                <Col>${order.taxPrice}</Col>
              </Row>

                <Row>
                <Col>Tổng tiền</Col>
                <Col>${order.totalPrice}</Col>
              </Row>

            </ListGroup.Item>
            {}
          </ListGroup>
        </Card>

      </Col>    
      </Row>
    </>
  );
};

export default OrderScreen;
