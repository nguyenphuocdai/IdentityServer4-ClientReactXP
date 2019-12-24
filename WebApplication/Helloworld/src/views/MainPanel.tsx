//import { Table } from 'antd';
import { Button, Form, Icon, Input } from 'antd';
import * as React from 'react';
import * as RX from 'reactxp';




interface MainPanelProps {
    onPressNavigate: () => void;
    form : any;
}

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const _styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5fcff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12
    }),
    instructions: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#aaa',
        marginBottom: 16
    }),
    docLink: RX.Styles.createLinkStyle({
        fontSize: 16,
        color: 'blue',
        marginBottom: 16
    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    })
};
//const columns: any = [
//    {
//        title: 'Name',
//        dataIndex: 'name',
//        filters: [
//            {
//                text: 'Joe',
//                value: 'Joe',
//            },
//            {
//                text: 'Jim',
//                value: 'Jim',
//            },
//            {
//                text: 'Submenu',
//                value: 'Submenu',
//                children: [
//                    {
//                        text: 'Green',
//                        value: 'Green',
//                    },
//                    {
//                        text: 'Black',
//                        value: 'Black',
//                    },
//                ],
//            },
//        ],
//        // specify the condition of filtering result
//        // here is that finding the name started with `value`
//        onFilter: (value: any, record: { name: { indexOf: (arg0: any) => number; }; }) => record.name.indexOf(value) === 0,
//        sorter: (a: { name: { length: number; }; }, b: { name: { length: number; }; }) => a.name.length - b.name.length,
//        sortDirections: ['descend'],
//    },
//    {
//        title: 'Age',
//        dataIndex: 'age',
//        defaultSortOrder: 'descend',
//        sorter: (a: { age: number; }, b: { age: number; }) => a.age - b.age,
//    },
//    {
//        title: 'Address',
//        dataIndex: 'address',
//        filters: [
//            {
//                text: 'London',
//                value: 'London',
//            },
//            {
//                text: 'New York',
//                value: 'New York',
//            },
//        ],
//        filterMultiple: false,
//        onFilter: (value: any, record: { address: { indexOf: (arg0: any) => number; }; }) => record.address.indexOf(value) === 0,
//        sorter: (a: { address: { length: number; }; }, b: { address: { length: number; }; }) => a.address.length - b.address.length,
//        sortDirections: ['descend', 'ascend'],
//    },
//];

//const data = [
//    {
//        key: '1',
//        name: 'John Brown',
//        age: 32,
//        address: 'New York No. 1 Lake Park',
//    },
//    {
//        key: '2',
//        name: 'Jim Green',
//        age: 42,
//        address: 'London No. 1 Lake Park',
//    },
//    {
//        key: '3',
//        name: 'Joe Black',
//        age: 32,
//        address: 'Sidney No. 1 Lake Park',
//    },
//    {
//        key: '4',
//        name: 'Jim Red',
//        age: 32,
//        address: 'London No. 2 Lake Park',
//    },
//];

export class MainPanel extends RX.Component<MainPanelProps, RX.Stateless> {
    //private _translationValue: RX.Animated.Value;
    //private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;

    constructor(props: MainPanelProps) {
        super(props);

        //this._translationValue = RX.Animated.createValue(-100);
        //this._animatedStyle = RX.Styles.createAnimatedTextStyle({
        //    transform: [{ translateY: this._translationValue }]
        //});
    }
    //onChange(pagination: any, filters: any, sorter: any, extra: any) {
    //    console.log('params', pagination, filters, sorter, extra);
    //}
    //componentDidMount() {
    //    RX.Animated.timing(this._translationValue, {
    //        duration: 500,
    //        toValue: 0,
    //        easing: RX.Animated.Easing.OutBack()
    //    }).start();
    //}


    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    //render() {
    //    return (
    //        <RX.View useSafeInsets={true}>
    //            <Table columns={columns} dataSource={data} onChange={this.onChange}></Table>
    //            <RX.ScrollView style={_styles.scroll}>
    //                <RX.View style={_styles.container}>
    //                    <RX.Animated.Text style={[_styles.helloWorld, this._animatedStyle]}>
    //                        Hello World
    //                    </RX.Animated.Text>

    //                    <RX.Text style={_styles.welcome}>
    //                        Welcome to ReactXP
    //                    </RX.Text>
    //                    <RX.Text style={_styles.instructions}>
    //                        Edit App.tsx to get started
    //                    </RX.Text>
    //                    <RX.Link style={_styles.docLink} url={'https://microsoft.github.io/reactxp/docs'}>
    //                        View ReactXP documentation
    //                    </RX.Link>

    //                    <RX.Button style={_styles.roundButton} onPress={this._onPressNavigate}>
    //                        <RX.Text style={_styles.buttonText}>
    //                            See More Examples
    //                        </RX.Text>
    //                    </RX.Button>
    //                </RX.View>
    //            </RX.ScrollView>
    //        </RX.View>
    //    );
    //}
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
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
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>

                    <RX.Button style={_styles.roundButton} onPress={this._onPressNavigate}>
                                                <RX.Text style={_styles.buttonText}>
                                                        See More Examples
                                                    </RX.Text>
                                            </RX.Button>
                </Form.Item>
            </Form>
        );
    }

    private _onPressNavigate = () => {
        this.props.onPressNavigate();
    }
}
