import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { InputGroup } from "react-bootstrap";


export default function ConsolidatePage() {

    const formatNumber=(number)=>{
        return new Intl.NumberFormat().format(number)

    }

    const [dataBogota, setDataBogota] = useState([]);
    const [dataMedellin, setDataMedellin] = useState([]);
    const [dataCali, setDataCali] = useState([]);

    let baseURL = "http://localhost:9000/apiTienda/consolidate/"


    const readConsolidate = async ()=>{
        await axios.get(baseURL+"listConsolidated")
        .then((res)=> {

            setDataBogota(res.data[0].totalVentas);
            setDataMedellin(res.data[1].totalVentas);
            setDataCali(res.data[2].totalVentas);
        });
    }

    const totalVentas = dataBogota + dataMedellin + dataCali;
    const formVentas = formatNumber(totalVentas);

    useEffect(() => {
        readConsolidate();
      }, []);



  return (
    <div className="container mt-3">
      <div>
        <Card className="col-6 container mt-3">
          <br />
          <Card.Header>
            <h1>Consolidado</h1>
          </Card.Header>

          <Card.Body>
            <h3 className="text-center">Total de ventas por ciudades</h3>

            <Row className="mb-3">
              <Table striped bordered hover responsive="ms" border="secondary" >
                <thead className="text-center">
                  <tr style={{ fontWeight: "bold" }}>
                    <td>Item</td>
                    <td>Ciudad</td>
                    <td className="menos" style={{}}>
                      Total de Ventas
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{}}>
                    <td className="text-center">1</td>
                    <td>Bogotá</td>
                    <td className="pesos menos">
                      {`$${formatNumber(dataBogota)}`}
                    </td>
                  </tr>
                  <tr style={{}}>
                    <td className="text-center">2</td>
                    <td>Medellín</td>
                    <td className="pesos menos">
                    {`$${formatNumber(dataMedellin)}`}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-center">3</td>
                    <td>Cali</td>
                    <td className="pesos menos">
                    {`$${formatNumber(dataCali)}`}
                    </td>
                  </tr>

                </tbody>
              </Table>
            </Row>

            <Row  className="" style={{display: "flex", float: "right"}}>
            <InputGroup>
                <InputGroup.Text><b>Total de ventas</b></InputGroup.Text>
                <InputGroup.Text
                
                style={{backgroundColor: "white"}}
                >
                    {`$${formVentas}`}</InputGroup.Text>
               
            </InputGroup>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
