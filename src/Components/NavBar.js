
import React from "react";
import { Navbar, Container, Form, FormControl ,Button} from "react-bootstrap";
import logo from "../images/logo.png";
import { MdVideoCall } from "react-icons/md";


function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand
            style={{
              fontFamily: "Satisfy",
              fontSize: "35px",
              color: "white",
              textAlign: "center",
              margin: "0",
            }}
          >
            Zero Meet
          </Navbar.Brand>
           <span
            style={{
              borderRadius: "5px",
              borderColor: "white",
              borderStyle: "solid",
              borderWidth: "2px",
              padding: "8px",
            }}
          >
            <img
              alt="Brand Logo"
              src={logo}
              width="auto"
              height="30"
              className="d-inline-block align-top "
            />
          </span> 
          <Form
            className="d-flex"
            style={{
              height: "55px",
            }}
          >
            <FormControl
              type="text"
              placeholder="Meeting Name"
              className="me-2 text-center"
            />
            <Button className="btn btn-primary w-100">
              <MdVideoCall
                size={40}
                className=""
                style={{ margin: "2", width: "30px" }}
              />
              New Meeting
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
