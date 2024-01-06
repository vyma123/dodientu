import React from "react";
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col, Toast} from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import  {toast} from 'react-toastify'
import {useGetProductsQuery, useCreateProductMutation} from '../../slices/productsApiSlice';


const ProductListScreen = () => {
    const {data: products, isLoading, error, refetch} = useGetProductsQuery();

    const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();

    const deleteHandler = (id) => {
        console.log('delete', id);
    }

    const createProductHandler = async() => {
        if(window.confirm('Bạn có chắc muốn thêm sp này không?')) {
          try {
            await createProduct();
            refetch();
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          }
        }

    }


  return <>
  <Row className="align-items-center">
    <Col>
    <h1>Các sản phẩm</h1>
    </Col>
    <Col className="text-end">
        <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit/> Thêm sản phẩm
        </Button>
    </Col>
  </Row>
  {loadingCreate && <Loader/>}
  {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (
    <>
    <Table striped hover responsive className="table-sm">
        <thead>
            <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Thương hiệu</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant="light" className="btn-sm mx-2">
                                <FaEdit/>
                            </Button>
                        </LinkContainer>
                        <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(product._id)}>
                            <FaTrash style={{color:'white'}}/>
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    </>
  )}
  </>;
};

export default ProductListScreen;
