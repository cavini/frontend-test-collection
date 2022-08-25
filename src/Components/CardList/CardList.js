import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  InputGroup,
  Form,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useContext } from "react";
import MaterialsContext from "../../context/materialsContext/materialsContext";
const CardList = () => {
  const materialsContext = useContext(MaterialsContext);
  const [open, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [description, setDescription] = useState(selectedItem.description);
  const [line, setLine] = useState(selectedItem.line);
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemLine, setNewItemLine] = useState("");
  const [newItemStatus, setNewItemStatus] = useState(0);
  const [newItemUrlThumbnail, setNewItemUrlThumbnail] = useState("");

  const { filteredMaterials, materials, deleteItem, editItem, addItem } =
    materialsContext;

  const [key, setKey] = useState("Edit Item");

  return (
    <Row>
      <Modal show={open}>
        <Modal.Header onHide={() => setOpenEditModal(!open)} closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="Edit Item" title="Edit Item">
              <Form.Control
                className="mb-3"
                placeholder="Description"
                aria-label="Description"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                defaultValue={selectedItem.description}
              />
              <Form.Control
                className="mb-3"
                placeholder="Line"
                aria-label="Line"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setLine(e.target.value);
                }}
                defaultValue={selectedItem.line}
              />

              <Button
                variant="secondary"
                onClick={() => {
                  editItem({
                    description:
                      description !== undefined && description.length > 0
                        ? description
                        : selectedItem.description,
                    line:
                      line !== undefined && line.length > 0
                        ? line
                        : selectedItem.line,
                    status: selectedItem.status,
                    created_at: selectedItem.created_at,

                    id: selectedItem.id,
                    url_thumbnail: selectedItem.url_thumbnail,
                  });
                  setOpenEditModal(!open);
                }}
              >
                Save
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deleteItem(selectedItem.id);
                  setOpenEditModal(!open);
                }}
              >
                Delete
              </Button>
            </Tab>
            <Tab eventKey="Add Item" title="Add Item">
              <Form>
                <Form.Control
                  required
                  className="mb-3"
                  isValid={newItemDescription.length > 0}
                  placeholder="Description"
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setNewItemDescription(e.target.value);
                  }}
                  value={newItemDescription}
                />
                <Form.Control
                  isValid={newItemLine.length > 0}
                  className="mb-3"
                  placeholder="Line"
                  aria-label="Line"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setNewItemLine(e.target.value);
                  }}
                  value={newItemLine}
                />
                <Form.Control
                  required
                  className="mb-3"
                  isValid={
                    newItemStatus !== undefined ||
                    newItemStatus !== NaN ||
                    newItemStatus !== null
                  }
                  placeholder="Status"
                  aria-label="Status"
                  type="number"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setNewItemStatus(e.target.value);
                  }}
                  value={Number(newItemStatus)}
                />

                <Form.Control
                  isValid={newItemUrlThumbnail.length > 0}
                  className="mb-3"
                  placeholder="url_thumbnail"
                  aria-label="url_thumbnail"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setNewItemUrlThumbnail(e.target.value);
                  }}
                  value={newItemUrlThumbnail}
                />

                <Button
                  onClick={() => {
                    addItem({
                      description: newItemDescription,
                      line: newItemLine,
                      status: newItemStatus,
                      created_at: new Date().toISOString(),
                      url_thumbnail: newItemUrlThumbnail,
                      id: uuidv4(),
                    });
                    setNewItemDescription("");
                    setNewItemLine("");
                    setNewItemStatus(0);
                    setNewItemUrlThumbnail("");
                    setOpenEditModal(!open);
                  }}
                  disabled={
                    newItemUrlThumbnail.length === 0 ||
                    newItemStatus === undefined ||
                    newItemStatus === NaN ||
                    newItemStatus === null ||
                    newItemLine.length === 0 ||
                    newItemDescription.length === 0
                  }
                >
                  Add Item
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
      {filteredMaterials.length > 0
        ? filteredMaterials.map((item) => (
            <Col
              sm={{ span: 6, offset: 0 }}
              xl={{ span: 4, offset: 0 }}
              lg={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 2 }}
              className="mt-4"
            >
              <Card>
                <Card.Img variant="top" src={`${item.url_thumbnail}`} />
                <Card.Body>
                  <Card.Title>{item.description}</Card.Title>
                  <Card.Text>{item.line}</Card.Text>
                </Card.Body>
                <Card.Footer className="container-fluid">
                  <Button
                    onClick={() => {
                      setOpenEditModal(!open);
                      setSelectedItem(item);
                    }}
                  >
                    Edit
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        : materials.map((item) => (
            <Col
              sm={{ span: 6, offset: 0 }}
              xl={{ span: 4, offset: 0 }}
              lg={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 2 }}
              className="mt-4"
            >
              <Card>
                <Card.Img variant="top" src={`${item.url_thumbnail}`} />
                <Card.Body>
                  <Card.Title>{item.description}</Card.Title>
                  <Card.Text>{item.line}</Card.Text>
                </Card.Body>
                <Card.Footer className="container-fluid">
                  <Button
                    onClick={() => {
                      setOpenEditModal(!open);
                      setSelectedItem(item);
                    }}
                  >
                    Edit
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
    </Row>
  );
};

export default CardList;
