import React, { Component } from "react";
import { Form, Row, Col, FloatingLabel, Card } from "react-bootstrap";
import ButtonB from "react-bootstrap/Button";
import axios from "axios";
import { Table } from "react-bootstrap";

import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";

//export default function VentasPage() {
export default class VentasPage extends Component {

  
  constructor(props) {
    super(props);

    this.codigoVenta = React.createRef();
    this.idClient = React.createRef();
    this.totalV = React.createRef();
    this.detalleVenta = React.createRef();
    this.ivaVenta = React.createRef();
    this.valorAllVenta = React.createRef();
    this.sede = React.createRef();
    this.porcentaje = React.createRef();

    this.cant = React.createRef();
    this.idProd = React.createRef();
    this.valorU = React.createRef();
    this.valorT = React.createRef();
    this.cant1 = React.createRef();
    this.idProd1 = React.createRef();
    this.valorU1 = React.createRef();
    this.valorT1 = React.createRef();
    this.cant2 = React.createRef();
    this.idProd2 = React.createRef();
    this.valorU2 = React.createRef();
    this.valorT2 = React.createRef();
    //-----------------------------------------------
    this.state = {
      cant: null,
      valorU: null,
      valorT: null,
      cant1: null,
      valorU1: null,
      valorT1: null,
      cant2: null,
      valorU2: null,
      valorT2: null,
      podructo: null,
    };

    this.items = [
      {
        label: "Nueva Factura",
        icon: "pi pi-external-link",
        command: () => {
          window.location.href = "/ventas";
        },
      },
    ];

    this.save = this.save.bind(this);
    this.suma = this.suma.bind(this);
    this.tax = this.tax.bind(this);
    this.multiplicar = this.multiplicar.bind(this);
  }

  multiplicar(event) {
    /**const v1 = parseInt(event.target.cant0.value, 10)
    const v2 = parseInt(event.target.valorU0.value, 10)
    const resultado=v1*v2;
    this.setState({
         valorT: this.cant.current.value * this.valorU.current.value
         
      });*/
    this.valorT.current.value =
      this.cant.current.value * this.valorU.current.value;
    this.valorT1.current.value =
      this.cant1.current.value * this.valorU1.current.value;
    this.valorT2.current.value =
      this.cant2.current.value * this.valorU2.current.value;

    console.log(this.valorT);
  }
  suma(event) {
    this.totalV.current.value =
      parseFloat(this.valorT.current.value) +
      parseFloat(this.valorT1.current.value) +
      parseFloat(this.valorT2.current.value);
  }
  tax(event) {
    this.ivaVenta.current.value =
      parseFloat(this.totalV.current.value) *
      (parseFloat(this.porcentaje.current.value) / 100);

    this.valorAllVenta.current.value =
      parseFloat(this.totalV.current.value) +
      parseFloat(this.ivaVenta.current.value);
  }

  state = {
    ventaParam: [],
    status: null,
  };

  guardarVenta = (e) => {
    e.preventDefault();
    // alert(this.codigo.current.value);

    var ventas = {
      id: this.codigoVenta.current.value,
      clientId: this.idClient.current.value,
      totalVenta: this.totalV.current.value,
      ivaVenta: this.ivaVenta.current.value,
      sede: this.sede.current.value,
      valorAllVentas: this.valorAllVenta.current.value,
      detalleVenta: [
        {
          cantidad: this.cant.current.value,
          idProducto: this.idProd.current.value,
          valorUnidad: this.valorU.current.value,
          valorTotal: this.valorT.current.value,
        },
        {
          cantidad: this.cant1.current.value,
          idProducto: this.idProd1.current.value,
          valorUnidad: this.valorU1.current.value,
          valorTotal: this.valorT1.current.value,
        },
        {
          cantidad: this.cant2.current.value,
          idProducto: this.idProd2.current.value,
          valorUnidad: this.valorU2.current.value,
          valorTotal: this.valorT2.current.value,
        },
      ],
    };

    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Venta Guardada",
    });

    this.setState({
      ventaParam: ventas,
    });

    axios
      .post("http://localhost:9000/apiTienda/venta/addVenta", ventas)

      .then((res) => {
        this.setState({
          status: "success",
        });
      });
  };
/*
  llamarProducto = ()=>  {
    axios.get("http://localhost:9000/apiTienda/product/listProduct")
      .then((res)=> this.setState.producto({producto: res }));
      console.log(this.state.producto);
  }
*/
  save() {
    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Data Saved",
    });
  }

  render() {
    return (
      <div>
        <div className="container mt-3" style={{}}>
          <div className="col-md-6">
            <h1 id="header-title">Ventas</h1>
          </div>
        </div>

        <div className="container">
          <Form onSubmit={this.guardarVenta}>
            <div className="container mt-3" style={{}}>
              <Row className="g-2">
                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Consecutivo"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Consecutivo"
                      name="codigo"
                      ref={this.codigoVenta}
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Cedula Cliente"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Cedula Cliente"
                      name="producto"
                      ref={this.idClient}
                    />
                  </FloatingLabel>
                </Col>

                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Nombre de Cliente"
                  >
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="Nombre del Cliente"
                      name="producto"
                      ref={this.idClient}
                    />
                  </FloatingLabel>
                </Col>

                <Col md>
                  <FloatingLabel controlId="floatingSelectGrid" label="Sede">
                    <Form.Select aria-label="Sede" ref={this.sede}>
                      <option value="bogota">Bogota</option>
                      <option value="medellin">Medellin</option>
                      <option value="cali">Cali</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <br />
            </div>

            <div>
              <div>
              <Card>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center"> Codigo </th>
                      <th className="text-center"> Desccripcion Producto </th>
                      <th className="text-center"> Cantidad </th>
                      <th className="text-center"> Precio Unidad</th>
                      <th className="text-center"> Total </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="number"
                          name="Cod"
                          placeholder="Cod"
                          class="form-control"
                          id="Cod"
                          ref={this.idProd}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="product"
                          id="product"
                          placeholder="Product"
                          class="form-control"
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          name="cant0"
                          id="cant0"
                          placeholder="Cantidad"
                          onInput={this.multiplicar}
                          onInput={this.suma}
                          class="form-control"
                          ref={this.cant}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="valorU0"
                          placeholder="Unit Price"
                          onInput={this.multiplicar}
                          class="form-control price"
                          ref={this.valorU}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="valorT0"
                          placeholder="0.00"
                          class="form-control total"
                          ref={this.valorT}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="number"
                          name="Cod2"
                          placeholder="Cod"
                          class="form-control"
                          id="Cod2"
                          ref={this.idProd1}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="product"
                          placeholder="Product"
                          class="form-control"
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          name="cant1"
                          id="cant1"
                          placeholder="Cantidad"
                          onInput={this.multiplicar}
                          class="form-control"
                          ref={this.cant1}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="priceU"
                          placeholder="Unit Price"
                          onInput={this.multiplicar}
                          class="form-control price"
                          ref={this.valorU1}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="total[]"
                          placeholder="0.00"
                          class="form-control total"
                          ref={this.valorT1}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="number"
                          name="Cod2"
                          placeholder="Cod"
                          class="form-control"
                          id="Cod3"
                          ref={this.idProd2}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="product[]"
                          placeholder="Product"
                          class="form-control"
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          name="cant2"
                          id="cant2"
                          placeholder="Cantidad"
                          onInput={this.multiplicar}
                          class="form-control"
                          ref={this.cant2}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="price[]"
                          placeholder="Unit Price"
                          onInput={this.multiplicar}
                          onClick={this.tax}
                          class="form-control price"
                          ref={this.valorU2}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="total[]"
                          placeholder="0.00"
                          class="form-control total"
                          ref={this.valorT2}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                </Card>
              </div>
              {/*}
              <div className="row clearfix">
                <div className="col-md-12">
                  <ButtonB ariant="dark" id="add_row">
                    Agregar Fila
                  </ButtonB>
                  <ButtonB ariant="dark" id="delete_row">
                    Borrar Fila
                  </ButtonB>
                </div>
              </div>*/}
              <br/>
              <Card className="container mt-2">
              <div ALIGN="right">
              
                <div className="pull-right col-md-4">
                  <br/>
                  <table className="table table-bordered table-hover">
                    <tbody>
                      <tr>
                        <th className="text-center">Sub Total</th>
                        <td className="text-center">
                          <input
                            type="number"
                            onClick={this.suma}
                            name="sub_total"
                            placeholder="0.00"
                            class="form-control"
                            id="sub_total"
                            ref={this.totalV}
                            readonly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="text-center">Procentaje Iva</th>
                        <td className="text-center">
                          <div class="input-group mb-2 mb-sm-0">
                            <input
                              type="number"
                              class="form-control"
                              id="tax"
                              placeholder="0"
                              onInput={this.suma}
                              onInput={this.tax}
                              ref={this.porcentaje}
                            />
                            <div className="input-group-addon"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="text-center">Iva</th>
                        <td className="text-center">
                          <input
                            type="number"
                            name="tax_amount"
                            id="tax_amount"
                            placeholder="0.00"
                            class="form-control"
                            readonly
                            ref={this.ivaVenta}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="text-center">Total a Pagar</th>

                        <td className="text-center">
                          <input
                            type="number"
                            name="total_amount"
                            id="total_amount"
                            placeholder="0.00"
                            class="form-control"
                            readonly
                            ref={this.valorAllVenta}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              </Card>
            </div>
            <div>
              <Toast ref={(el) => (this.toast = el)}></Toast>

              <div className="container" ALIGN="right">
                <SplitButton
                  type="submit"
                  label="Guardar"
                  icon="pi pi-plus"
                  onClick={this.guardarVenta}
                  model={this.items}
                ></SplitButton>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
