import React from 'react';
import {Form, Col, Button} from 'react-bootstrap'

//Filter and Query with Mongo DB
function ListingSearch() {
  
  return (
      <div >
        <br />
        <Form>           
            <Form.Row>
                <Form.Group as={Col} controlId="formGridOccupancy">
                    <Form.Label>Number of People</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label>Price (Monthly)</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>Under $500</option>
                        <option>$500 - $1000</option>
                        <option>$1000 - $1500</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form.Row>
        </Form>
        <br />
      </div>
  );
}

export default ListingSearch;