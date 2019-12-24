import { Modal, Button } from 'antd';
import * as React from 'react';
import * as RX from 'reactxp';

interface IProps {
    content: any;
    title: string;
}


export class ModalLogin extends RX.Component<IProps, any> {


    constructor(props: IProps) {
        super(props);

        this.state = { visible: false };
        console.log(this.props);
    }

    componentDidMount() {
        this.showModal();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    {this.props.content}
                </Modal>
            </div>
        );
    }
}