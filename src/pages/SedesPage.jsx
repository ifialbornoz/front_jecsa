import Image from 'react-bootstrap/Image'
import { Row, Col, Container } from "react-bootstrap";
import bogota from '../img/bogota.jpg'
import med from '../img/med.jpg'
import cali from '../img/cali.jpg'

export default function SedesPage() {
    return (
        <Container className="mt-4">
        <Row>
          <Col xs={6} md={4} className="text-center">
            <Image src={bogota} thumbnail />
            <label> <b>Av calle 17 No 80A-50 | Bogotá, Colombia</b></label>
            <label>Telefonos: 601-2957865 - 01800 901 900</label>
            <label>Email: tiendadeportiva@jeccs.com</label>
          </Col>
          <Col xs={6} md={4} className="text-center">
            <Image src={med} thumbnail />
            <label> <b>Calle 44 No 50-145 | Medellín, Colombia</b></label>
            <label>Telefonos: 604-9875432 - 01800 901 900</label>
            <label>Email: tiendadeportivamedellin@jeccs.com</label>
          </Col>
          <Col xs={6} md={4} className="text-center">
            <Image src={cali} thumbnail />
            <label> <b>Cra 36 No 120A-20 | Cali, Colombia</b></label>
            <label>Telefonos: 602-6579809 - 01800 901 900</label>
            <label>Email: tiendadeportivacali@jeccs.com</label>
          </Col>
        </Row>
      </Container>
    )
}
