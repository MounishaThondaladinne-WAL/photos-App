import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useState } from "react";
const Photo = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Card className="mb-4 card-style ">
        <CardImg alt="Card image cap" src={props.image} onClick={toggle} />
        <CardBody>
          <CardTitle
            style={{
              height: "125px",
            }}
          >
            {props.title}
          </CardTitle>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>
          <img alt="card img" src={props.fullimage} style={{ width: "100%" }} />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Photo;
