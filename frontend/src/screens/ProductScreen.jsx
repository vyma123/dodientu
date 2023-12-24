import {useState, useEffect} from "react";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row,Col,Image,ListGroup,Card,Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
   
    const {id:productId} = useParams();
    const {data:product,isLoading,error} = useGetProductDetailsQuery(productId)

   
  return (
  <>
  <Link className="btn btn-light my-3" to="/">Trở lại</Link>
  {isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <div>{error?.data?.message || error.error}</div>
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
              <strong>${product.countInStock > 0 ? 'In Stock': 'Out Of Stock' }</strong>
              </Col>
             </Row>
          </ListGroup.Item>
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
