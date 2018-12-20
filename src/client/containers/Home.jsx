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
                        Davidson Poole
                    </h1>
                    <h5>Website Architect, Musician, and Caring Friend</h5>
                </div>
            </div>
        );
    }
}

export default Home;