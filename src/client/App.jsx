import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, message } from 'antd';
import Home from './containers/Home';
import Dashboard from "./containers/Dashboard";
import { checkLoggedIn } from './util';


const { Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
            withOnLogin: () => null,
            defaultKey: '1'
        };
        this.router = React.createRef();
    }

    componentDidMount() {
        message.config({
            top: 100,
            duration: 5,
            maxCount: 1
        });
        const onRedirect = () => {
            message.error('You must log in to view that page')
        };
        const onLogin = () => {
            this.setState({ auth: true });
            this.router.current.history.push('/dashboard');
        };
        checkLoggedIn(this.router, onRedirect)
            .then(user => {
                if (user) {
                    this.setState({ auth: true });
                    if (this.router.current.history.location.pathname !== '/dashboard') {
                        this.router.current.history.push('/dashboard');
                        message.success(`Already logged in as ${user}`);
                    }
                }
                this.setState({ withOnLogin: () => <Auth onLogin={ onLogin } />});
                const map = {
                    '/dashboard': '1'
                };
                const defaultKey = map[this.router.current.history.location.pathname];
                this.setState({ defaultKey })
            })
            .catch(console.error);




    }

    render() {
        const { auth, withOnLogin, defaultKey } = this.state;
        const clearCookie = () => {
            document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
            this.setState({ auth: true });
            message.success('Logged out successfully');
        };

        return (
            <Router ref={this.router}>
                <Layout style={{height: '100%'}}>
                    <Content style={{height: '100%'}}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/dashboard" component={Dashboard} />
                        </Switch>
                    </Content>
                </Layout>
            </Router>
        );
    }
}

export default App;
