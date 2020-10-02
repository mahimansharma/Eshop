import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Item2 from './CartData2';

class Order extends React.Component {

    message = () => {

        alert("Thank you! Your order has been placed");
        this.props.history.push('/');
    }

    render() {
        console.log("order--", this);

        let total = 0;

        this.props.cart.cart.map(item => total += parseInt(item.product.price));

        const cart = this.props.cart.cart.length > 0
            ? (
                <div>
                    <div className="panel-body">
                        {
                            this.props.cart.cart.map(item => {
                                return (
                                    <div key={item.product.id}>
                                        <Item2 item={item} />
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="panel-footer">
                        <div className="row text-center">
                            <div className="col-xl-11">
                                <h4 className="text-right">Total: Rs <strong>{total}</strong></h4>
                            </div>



                        </div>
                    </div>
                </div>

            )

            : (
                <div >
                    <p>Cart is empty</p>
                </div>
            )

        return (
            <Row className='onee'>
                <Col xl={6}>
                    <h1>Shipping Details</h1>
                    <Form>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Mark"
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control required type="tel" placeholder='9123645870' />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control required placeholder="Apartment, studio, or floor" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Form.Row>

                    </Form>

                </Col>
                <Col xl={{ span: 5, offset: 1 }}>
                    <h1>Order Summary</h1>
                    {cart}
                    <Button variant="outline-success" size="lg" onClick={this.message}>
                        PLACE ORDER
                    </Button>
                </Col>


            </Row>
        )
    }
}
const mapStateToProps = (state) => {

    return {
        cart: state.cart
    }
};



export default connect(mapStateToProps)(Order);
