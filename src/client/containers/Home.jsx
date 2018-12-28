import React, { Component } from 'react';
import { Button, Input, Select, Row, Col } from 'antd';
import styles from './Home.css'

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
                            <Input className={styles.input} ref={this.passwordInput} placeholder="Password" type="password"/>
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
                        <Col>
                            <Button className={styles.button} onClick={() => alert("login")}>{ register ? 'Register' : 'Login' }</Button>
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
