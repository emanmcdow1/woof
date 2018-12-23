import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.home}>
                <div className={styles.center}>
                    <h1>
                        Woof
                    </h1>
                    <Button onClick={() => alert("login")}>Login</Button>
                    <div className={styles.spacing}></div>
                    <Button onClick={() => alert("register")}>Register</Button>
                </div>
            </div>
        );
    }
}

export default Home;