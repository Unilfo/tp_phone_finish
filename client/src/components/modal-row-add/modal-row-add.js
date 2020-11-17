import React from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./modal-row-add.css";
import Select from "react-select";
import {fetchToDbGet} from '../fetch/db_fetch'

export default class ModalRowAdd extends React.Component {
  state = {
    id: "",
    fio: "",
    phone: "",
    departmentId: "",
    position: "",
    options: [],
    additionalPhone: "",
    email: "",
    note: "",
    img: "",
  };

  componentDidUpdate() {
    if (this.props.item.id !== this.state.id) {
      this.setState({
        id: this.props.item.id,
        fio: this.props.item.fio,
        phone: this.props.item.phone,
        departmentId: this.props.item.departmentId,
        position: this.props.item.position,
        additionalPhone: this.props.item.additionalPhone,
        email: this.props.item.email,
        note: this.props.item.note,
        img: this.props.item.img,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.id !== undefined && this.state.fio !== '' && this.state.phone !== '' && this.state.departmentId !== '') {
      const newItem = {
        id: this.state.id,
        fio: this.state.fio.trim(),
        phone: this.state.phone.trim(),
        departmentId: this.state.departmentId,
        position: this.state.position.trim(),
        additionalPhone: this.state.additionalPhone.trim(),
        email: this.state.email.trim(),
        note: this.state.note.trim(),
        img: this.state.img,
      };
      this.props.onAdd(newItem);
    }else if(this.state.fio === '' || this.state.phone === '' || this.state.departmentId === ''){
      alert('Не заоплненно ФИО или телефон или подразделение!')
      return
    }
    this.onhandleClose();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeSelect = (e) => {
    this.setState({
      departmentId: e.value,
    });
  };

  onhandleClose = () => {
    this.props.onClose();
    this.setState({
      id: "",
      fio: "",
      phone: "",
      departmentId: "",
      position: "",
      additionalPhone: "",
      email: "",
      note: "",
      img: "",
    });
  };

  onHideNull = () => {};

  componentDidMount() {
    this.fetchDepartment();
  }

  async fetchDepartment() {
    let path = 'api/department'
    await fetchToDbGet(path)
      .then((result) => {
        return result.json()
      })
      .then((response) => {return response})
      .then((result) => {
        const item = result.map(({ id, name_dp }) => ({
          value: id,
          label: name_dp,
        }));
        this.setState({
          options: item,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  customFilter(option, searchText) {
    if (option.data.label.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  changeImg = (e) => {
    this.getBase64(e.target.files[0]);
  };

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        img: reader.result,
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  render() {
    const { show, login } = this.props;
    const {
      id,
      fio,
      phone,
      departmentId,
      position,
      options,
      additionalPhone,
      email,
      note,
    } = this.state;

    const Login = () => {
      return (
        <Button className="mr-2" type="submit" variant="primary">
          Сохранить
        </Button>
      );
    };

    return (
      <Modal show={show} size="lg" onHide={this.onHideNull}>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Container>
              <Card style={{ height: "36rem" }}>
                <Card.Body>
                  <Form.Label>Отдел</Form.Label>
                  <Select
                    name="departmentId"
                    value={options.filter(
                      ({ value }) => value === departmentId
                    )}
                    placeholder="Отдел"
                    options={options}
                    noOptionsMessage={() => "Нет данных"}
                    filterOption={this.customFilter}
                    onChange={this.handleChangeSelect}
                    isDisabled={login ? false : true}
                  />
                  <FormControl
                    id="id"
                    type="number"
                    hidden
                    disabled
                    name="id"
                    value={id || ""}
                    onChange={this.handleChange}
                  />

                  <Form.Label>ФИО</Form.Label>
                  <FormControl
                    id="fio"
                    type="text"
                    name="fio"
                    value={fio || ""}
                    disabled={login ? false : true}
                    onChange={this.handleChange}
                  />
                  <Form.Label>Должность</Form.Label>
                  <FormControl
                    id="position"
                    type="text"
                    name="position"
                    value={position || ""}
                    disabled={login ? false : true}
                    onChange={this.handleChange}
                  />
                  <Form.Label>Телефон</Form.Label>
                  <FormControl
                    id="phone"
                    type="text"
                    name="phone"
                    value={phone || ""}
                    disabled={login ? false : true}
                    onChange={this.handleChange}
                  />
                  <Form.Label>Дополнительный телефон</Form.Label>
                  <FormControl
                    id="additionalPhone"
                    type="text"
                    name="additionalPhone"
                    value={additionalPhone || ""}
                    disabled={login ? false : true}
                    onChange={this.handleChange}
                  />
                  <Form.Label>email</Form.Label>
                  <FormControl
                    id="email"
                    type="text"
                    name="email"
                    value={email || ""}
                    disabled={login ? false : true}
                    onChange={this.handleChange}
                  />
                  <Form.Label>Примечание</Form.Label>
                  <FormControl
                    id="note"
                    type="text"
                    name="note"
                    value={note || ""}
                    disabled={login ? false : true}
                    onChange={this.handleChange}
                  />
                  <Form.Group className="mt-3 form-group-bottom">
                    <Button
                      className="mr-2"
                      variant="secondary"
                      onClick={this.onhandleClose}
                    >
                      Закрыть
                    </Button>
                    {login ? <Login /> : ""}
                  </Form.Group>
                </Card.Body>
              </Card>
            </Container>
          </Modal.Body>
        </form>
      </Modal>
    );
  }
}
