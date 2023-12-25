import { useEffect, useState } from "react";
import {   useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {Form, Row,Col,Image,ListGroup,Card,Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";

const ProductScreen = () => {
   
    const {id:productId} = useParams();

    const [qty,setQty] = useState(1);

    const {data:product,isLoading,error} = useGetProductDetailsQuery(productId);
   

  return (
  <>
  <Link className="btn btn-light my-3" to="/">Trở lại</Link>
  {isLoading ? (
    <Loader/>
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ): (
    <Row>
    <Col md={5}>
      <Image src={product.image} alt={product.name} fluid/>
    </Col>
    <Col md={4}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating value={product.rating} text={`${product.numReviews}`}/>
        </ListGroup.Item>
         <ListGroup.Item>
          Giá: ${product.price}
        </ListGroup.Item>
        <ListGroup.Item>
          Mô tả: {product.description}
        </ListGroup.Item>
      </ListGroup>
    </Col>
    <Col md={3}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
             <Row>
              <Col>Giá:</Col>
              <Col>
              <strong>${product.price}</strong>
              </Col>
             </Row>
          </ListGroup.Item>
           <ListGroup.Item>
             <Row>
              <Col>Status:</Col>
              <Col>
              <strong>{product.countInStock > 0 ? 'Trong kho': 'Hết hàng' }</strong>
              </Col>
             </Row>
          </ListGroup.Item>
          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                <Form.Control 
                as='select'
                value={qty}
                onChange={(e)=> setQty(Number(e.target.value))}>
                   {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x+1}  value={x+1}>
                                  {x+1}
                                </option>                   
                              )
                            )}
                </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
              Thêm vào giỏ hàng
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>


  </Row>
  ) }
  
  </>
  )
  
};

export default ProductScreen;
