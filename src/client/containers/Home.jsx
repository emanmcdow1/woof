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
                    <Button type="primary" onClick={() => alert('Login')}>
                        Login
                    </Button>
                    <Button type="primary" onClick={() => alert('Register')}>
                        Register
                    </Button>
                </div>
            </div>
        );
    }
}

export default Home;