import React, { useContext, useState } from "react";
import { Navbar, Form, Button } from "react-bootstrap";
import MaterialsContext from "../context/materialsContext/materialsContext";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const materialsContext = useContext(MaterialsContext);

  const { searchItems } = materialsContext;
  return (
    <>
      <Navbar>
        <Navbar.Brand>Front-End Challenge - Collection</Navbar.Brand>

        <Form className="d-flex container-fluid">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => searchItems(searchValue)}
          >
            Search
          </Button>
        </Form>
      </Navbar>
    </>
  );
};

export default SearchBar;
