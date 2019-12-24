
import { Button, Form, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

import { ApiService } from '../services/ApiService';
import { AuthService } from '../services/AuthService';

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {

    public authService: AuthService;
    public apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.authService = new AuthService();
        this.apiService = new ApiService();

        this.state = {
            access_token: "",
            expires_in: 0,
            scope: "",
            token_type: "",
            resultAPI: [],
            userInfo: {}
        };
    }


    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.authService.loginAPI(values.username, values.password).then((val) => {
                    this.setState({
                        ...this.state,
                        access_token: val.data.access_token,
                        expires_in: val.data.expires_in,
                        scope: val.data.scope,
                        token_type: val.data.token_type,
                    });
                });
            }
        });
    };

    handleApi = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.authService.testIdentityAuth(this.state.access_token).then((val) => {
                    this.setState({
                        ...this.state,
                        resultAPI: val.data
                    });
                });
            }
        });
    };

    handleUserInfo = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.authService.handleUserInfo(this.state.access_token).then((val) => {
                    this.setState({
                        ...this.state,
                        userInfo: val.data
                    });
                });
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                {this.state.access_token === "" && <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Log in
                    </Button>
                    </Form.Item>


                </Form>
                }
                <div>
                    <div><pre>{JSON.stringify(this.state, null, 2)}</pre></div>
                </div>

                {this.state.access_token !== "" &&
                    <Form layout="inline" onSubmit={this.handleApi}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                API Authorization
                    </Button>
                        </Form.Item>
                    </Form>
                },

                {this.state.access_token !== "" &&
                    <Form layout="inline" onSubmit={this.handleUserInfo}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                UserInfo
                    </Button>
                        </Form.Item>
                    </Form>
                }
            </div>
        );
    }
}

export const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

