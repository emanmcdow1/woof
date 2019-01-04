import React, { Component } from 'react';
import { Button, Input, Select, Row, Col, message } from 'antd';
import styles from './Home.css';
const axios = require('axios');

const { Option } = Select;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            register: false
        };
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confPassInput = React.createRef();
    }

    login() {
        const { register } = this.state;
        const email = this.emailInput.current.input.value;
        const password = this.passwordInput.current.input.value;
        if (username && password) {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        if (!register) message.success('Logged in successfully');
                        const date = new Date((new Date()).getTime() + (60 * 60 * 1000));
                        document.cookie = 'session=user:${JSON.stringify(json.user)};expires=${date.toUTCString()};path=/';
                        const { onLogin } = this.props;
                        onLogin();
                    } else {
                        message.error(json.msg);
                    }
                })
                .catch(console.error);
        }
    }

    register() {
        const firstName = this.firstNameInput.current.input.value;
        const lastName = this.lastNameInput.current.input.value;
        const email = this.emailInput.current.input.value;
        const password = this.passwordInput.current.input.value;
        const confPass = this.confPassInput.current.input.value;

        if (password === confPass) {
            if (firstName && lastName && email && password) {
            const body = {
                firstName,
                lastName,
                email,
                password
            };
            console.log(body);
            axios.post('http://localhost:4000/register', {
                fname: body.firstName,
                lname: body.lastName,
                email: body.email,
                password: body.password
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                console.log(response);
                })
                    .catch(function (error) {
                        console.log(error);
                    })
            }

        }
    }

    render() {
        const { register } = this.state;
        return (
            <div className={styles.home}>
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <Row type="flex" justify="center">
                        <Col span={4} style={{ textAlign: 'center' }}>
                            <h1 className={styles.h1}>
                                Woof
                            </h1>
                        </Col>
                    </Row>
                    { register ? (
                        <div>
                            <Row type="flex" justify="center">
                                <Col>
                                    <Input className={styles.input} ref={this.firstNameInput} placeholder="First Name" />
                                </Col>
                            </Row>
                            <br />
                            <Row type="flex" justify="center">
                                <Col>
                                    <Input className={styles.input} ref={this.lastNameInput} placeholder="Last Name" />
                                </Col>
                            </Row>
                            <br />
                        </div>
                        ) : null }
                    <Row type="flex" justify="center">
                        <Col>
                            <Input className={styles.input} ref={this.emailInput} placeholder="johndoe@test.com" />
                        </Col>
                    </Row>
                    <br />
                    <Row type="flex" justify="center">
                        <Col>
                            <Input
                                className={styles.input}
                                ref={this.passwordInput}
                                placeholder="Password"
                                type="password"
                                onKeyPress= { !register ? ((e) => {
                                    if (e.key === "Enter") { alert("login") };
                                }) : null }
                            />
                        </Col>
                    </Row>
                    <br />
                    { register ? (
                        <div>
                            <Row type="flex" justify="center">
                                <Col>
                                    <Input className={styles.input} ref={this.confPassInput} placeholder="Re-enter Password" type="password" />
                                </Col>
                            </Row>
                            <br />
                        </div>
                        ) : null }
                    <Row type="flex" justify="center">
                        { register ? (
                        <Col>
                            <Button className={styles.button} style={{ marginRight: 15 }} onClick={ () => this.setState({ register: false })}>Cancel</Button>
                        </Col>
                            ) : null }
                        <Col>
                            <Button className={styles.button} onClick={register ? () => this.register() : this.logIn }>{ register ? 'Register' : 'Login' }</Button>
                        </Col>
                    </Row>
                    <br />
                    { !register ? (
                        <Row type="flex" justify="center">
                            <span style={{ color: "white" }}><button className={styles.rButton} onClick={ () => this.setState({ register: true })}>Don&apos;t have an account? Register</button></span>
                        </Row>
                        ) : null }
                </div>
            </div>
        );
    }
}

export default Home;
