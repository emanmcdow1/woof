import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import Home from './containers/Home';
import './App.css';

const { Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
                <Layout style={{height: '100%'}}>
                    <Content style={{height: '100%'}}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </Content>
                </Layout>
            </Router>
        );
    }
}

export default App;