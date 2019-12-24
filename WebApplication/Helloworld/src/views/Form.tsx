import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
// import { WrappedHorizontalLoginForm } from "./Login";
// import { ModalLogin } from './modal/ModalLogin';
// import { WrappedRegistrationForm } from "./Register";
import { Row, Col } from 'antd';
import { AuthService } from '../services/AuthService';

const { Header, Sider, Content } = Layout;

export class LayoutDemo extends React.Component {
    public authService: AuthService;

    constructor(props: any) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            user: {},
            collapsed: false,
            current: "0",
            isLogined: false
        };
    }

    componentDidMount() {
        this.authService.getUser().then((user) => {
            console.log(user);
            if (user != null && user.access_token != null) {
                this.setState({ user: user, isLogined: true });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleClick = (e: any) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        }, () => {
            if (this.state.current === "1") {
                this.authService.login().then((user) => {
                    console.log(user);
                }).catch((err) => console.log(err));
            }
            else {
                this.authService.logout(this.state.id_token);
            }
        });
    };

    render() {
        console.log(this.state);
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} onClick={this.handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            <span>Home</span>
                        </Menu.Item>
                        {this.state.isLogined === false
                            ? <Menu.Item key="1">
                                <Icon type="user" />
                                <span>Login</span>
                            </Menu.Item>
                            :
                            <Menu.Item key="2">
                                <Icon type="user" />
                                <span>Logout</span>
                            </Menu.Item>
                        }
                        {/* <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>Register</span>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <Row>
                            <Col span={6}>&nbsp;</Col>
                            {this.state.current === "0" && <Col span={6}>&nbsp;</Col>}
                            {/* {this.state.current === "1" && <Col span={12}><ModalLogin title="Form Login" content={<WrappedHorizontalLoginForm />} /></Col>}
                            {this.state.current === "2" && <Col span={12}><ModalLogin title="Form Register" content={<WrappedRegistrationForm />} /></Col>} */}
                        </Row>,
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
