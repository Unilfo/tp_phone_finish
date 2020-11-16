import React, {Component} from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'
import ModalRowAdd from '../modal-row-add/modal-row-add'
import './app.css'
import {BsFillTrashFill} from 'react-icons/bs'
import {BsPencilSquare} from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import {FaPlusSquare} from 'react-icons/fa'
import {FaSignInAlt} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import {fetchToDbDelete, fetchToDbGet, fetchToDbPost} from '../fetch/db_fetch'


export default class DataTeblePhoneNumber extends Component {
  state = {
    data: [],
    password: null,
    login: false,
    loginShow: false,
    nowDep: '',
    tern: '',
    show: false,
    itemModal: {},
    selectValue: '0',
  }

  async fetchEmployeeAll() {
    let path = 'api/todos'
    await fetchToDbGet(path)
      .then((result) => {
        return result.json()
      })
      .then((result) => {
        this.setState({
          data: result,
          itemModal: {},
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  checkLoginPassword = () => {
    const passwordToken = localStorage.getItem('token')
    if (passwordToken) {
      let path = `api/login/${passwordToken}`
      fetchToDbGet(path)
        .then((response) => {
          if (response.ok) {
            this.setState({
              login: true,
              loginShow: false,
            })
            return true
          }
        })
    }
  }

  componentDidMount() {
    this.checkLoginPassword()
    this.fetchEmployeeAll()
  }

  openMod = () => {
    this.setState({
      show: true,
      itemModal: {
        id: '',
        fio: '',
        phone: '',
        departmentId: '',
        position: '',
        additionalPhone: '',
        email: '',
        note: '',
        img: '',
      },
    })
  }

  add = (item) => {
    const idx = this.state.data.findIndex((el) => el.id === item.id)
    if (
      idx === -1 &&
      item.fio !== '' &&
      item.phone !== '' &&
      item.departmentId !== '' &&
      item.position !== ''
    ) {
      let path = `api/todos`
      fetchToDbPost(path, 'POST', item)
        .then((response) => response.json())
        .then((result) => {
          this.fetchEmployeeAll()
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (idx !== -1) {
      let path = `api/todos/${item.id}`
      fetchToDbPost(path, 'PUT', item)
        .then((response) => response.json())
        .then((result) => {
          this.fetchEmployeeAll()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  del = (id) => {
    let path = `api/todos/${id}`
    fetchToDbDelete(path, 'DELETE')
      .then((response) => {
        if (response.ok) {
          this.fetchEmployeeAll()
        }
      })
  }

  search(items, tern) {
    if (tern.length === 0) {
      return items
    }

    let newArrData = []
    let findFio = null
    let findTelefonNumber = null
    let findTelefonNumberAll = null
    let findDepartment = null
    let additionalPhone = null
    let findPosition = null

    switch (this.state.selectValue) {
      case '0':
        findFio = items.filter((item) => {
          return item.fio.toLowerCase().indexOf(tern.toLowerCase().trim()) > -1
        })
        findTelefonNumber = items.filter(
          (item) => item.phone === tern.toLowerCase().trim()
        )

        findTelefonNumberAll = items.filter((item) => {
          return (
            item.phone.toLowerCase().indexOf(tern.toLowerCase().trim()) > -1
          )
        })

        findDepartment = items.filter(
          (el) =>
            el.Department.name_dp
              .toLowerCase()
              .indexOf(tern.toLowerCase().trim()) > -1
        )

        additionalPhone = items.filter(
          (el) =>
            el.additionalPhone
              .toLowerCase()
              .indexOf(tern.toLowerCase().trim()) > -1
        )

        newArrData = [
          ...new Set([
            ...findFio,
            ...findTelefonNumber,
            ...findTelefonNumberAll,
            ...findDepartment,
            ...additionalPhone,
          ]),
        ]

        break
      case '1':
        findFio = items.filter((item) => {
          return item.fio.toLowerCase().indexOf(tern.toLowerCase().trim()) > -1
        })
        newArrData = [...new Set([...findFio])]
        break
      case '2':
        findTelefonNumber = items.filter(
          (item) => item.phone === tern.toLowerCase().trim()
        )
        findTelefonNumberAll = items.filter((item) => {
          return (
            item.phone.toLowerCase().indexOf(tern.toLowerCase().trim()) > -1
          )
        })

        additionalPhone = items.filter(
          (el) =>
            el.additionalPhone
              .toLowerCase()
              .indexOf(tern.toLowerCase().trim()) > -1
        )
        newArrData = [
          ...new Set([
            ...findTelefonNumber,
            ...findTelefonNumberAll,
            ...additionalPhone,
          ]),
        ]
        break
      case '3':
        findDepartment = items.filter(
          (el) =>
            el.Department.name_dp
              .toLowerCase()
              .indexOf(tern.toLowerCase().trim()) > -1
        )
        newArrData = [...new Set([...findDepartment])]
        break
      case '4':
        findPosition = items.filter(
          (el) =>
            el.position.toLowerCase().indexOf(tern.toLowerCase().trim()) > -1
        )
        newArrData = [...new Set([...findPosition])]
        break
      default:
        return newArrData
    }

    return newArrData
  }

  handleChange = (e) => {
    this.setState({
      tern: e.target.value,
    })
  }

  handleSelectValue = (e) => {
    this.setState({
      selectValue: e.target.value,
    })
  }

  edit = (id) => {
    const findItem = this.state.data.filter((item) => item.id === id)
    this.setState({
      itemModal: findItem[0],
      show: true,
    })
  }

  close = () => {
    this.setState({
      show: false,
    })
  }

  onHideNull = () => {
    this.setState({
      loginShow: false,
    })
  }

  loginModal = () => {
    this.setState({
      loginShow: true,
    })
  }


  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }


  render() {
    const {
      data,
      tern,
      show,
      itemModal,
      login,
      loginShow,
      selectValue,
    } = this.state
    const visibalItems = this.search(data, tern)

    const columns = [
      {
        name: 'Отдел',
        selector: 'department',
        sortable: true,
        style: {
          color: '#202124',
          fontSize: '16px',
          fontWeight: 500,
        },
        hide: 'sm',
        cell: ({Department}) => {
          return Department.name_dp
        },
      },
      {
        name: 'ФИО',
        selector: 'fio',
        sortable: true,
        width: window.screen.width <= 375 ? '250px' : '',
        style: {
          color: '#202124',
          fontSize: '16px',
          fontWeight: 500,
        },
      },
      {
        name: 'Должность',
        selector: 'position',
        sortable: true,
        hide: 'sm',
        style: {
          color: '#202124',
          fontSize: '16px',
          fontWeight: 500,
        },
      },
      {
        name: 'Телефон',
        selector: 'phone',
        width: window.screen.width <= 375 ? '100px' : '',
        sortable: true,
        style: {
          color: '#202124',
          fontSize: '16px',
          fontWeight: 500,
        },
      },
      {
        name: 'Дополнительно',
        selector: 'additionalPhone',
        sortable: true,
        hide: 'sm',
        style: {
          color: '#202124',
          fontSize: '16px',
          fontWeight: 500,
        },
        cell: ({additionalPhone, note, email}) => (
          <div>
            {additionalPhone ? (
              <>
                {additionalPhone}
                <br/>
              </>
            ) : (
              ''
            )}
            {email ? (
              <>
                {email}
                <br/>
              </>
            ) : (
              ''
            )}
            {note ? (
              <>
                {note}
                <br/>
              </>
            ) : (
              ''
            )}
          </div>
        ),
      },
      {
        name: 'Редактировать',
        id: 'edit',
        width: '150px',
        hide: 'sm',
        omit: !this.state.login,
        cell: ({id}) => (
          <>
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => this.edit(id)}
            >
              <BsPencilSquare/>
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.confirm('Удалить?') ? this.del(id) : '')}
            >
              <BsFillTrashFill/>
            </Button>
          </>
        ),
      },
    ]

    const DataTableDB = () => {
      return (
        <DataTable
          columns={columns}
          data={visibalItems}
          pagination
          paginationPerPage={15}
          noHeader
          highlightOnHover
          onRowClicked={(row) => {
            this.setState({
              show: true,
              itemModal: row,
            })
          }}
        />
      )
    }

    const Login = () => {
      return login ? (
        <Button variant="secondary" size="sm">
          <FaPlusSquare onClick={this.openMod} size={32}/>
        </Button>
      ) : (
        <Button variant="secondary" size="sm">
          <FaSignInAlt size={32} onClick={this.loginModal}/>
        </Button>
      )
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      localStorage.setItem('token', this.state.password)
      this.checkLoginPassword()
      this.onHideNull()
    }

    return (
      <>
        <Modal show={loginShow} onHide={this.onHideNull}>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <Container>
                <Card>
                  <Card.Body>
                    <Form.Label>Пароль</Form.Label>
                    <FormControl
                      className="mt-3"
                      type="password"
                      name="password"
                      placeholder="Введите пароль"
                      onChange={this.passwordChange}
                    />
                    <Form.Group className="mt-4">
                      <Button
                        className="mr-2"
                        variant="secondary"
                        onClick={this.onHideNull}
                      >
                        Выйти
                      </Button>
                      <Button className="mr-2" type="submit" variant="primary">
                        Войти
                      </Button>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Container>
            </Modal.Body>
          </form>
        </Modal>
        <Navbar bg="secondary" variant="dark">
          <Col xs={4} md={8}>
            <Login/>
          </Col>
          <Col>
            <Form.Control
              as="select"
              defaultValue={selectValue}
              onChange={this.handleSelectValue}
            >
              <option value="0">стандартый</option>
              <option value="1">ФИО</option>
              <option value="2">телефон</option>
              <option value="3">отдел</option>
              <option value="4">должность</option>
            </Form.Control>
          </Col>
          <Col>
            <FormControl
              placeholder="поиск"
              value={tern}
              onChange={this.handleChange}
            />
          </Col>
        </Navbar>
        <DataTableDB/>
        <ModalRowAdd
          show={show}
          item={itemModal}
          onClose={this.close}
          onAdd={this.add}
          login={login}
        />
      </>
    )
  }
}
