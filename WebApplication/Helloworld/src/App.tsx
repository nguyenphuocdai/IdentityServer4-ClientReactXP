import * as React from 'react';
import * as RX from 'reactxp';
import { DEBUG, DEV } from './config';
import { RootView } from './views/RootView';
import 'antd/dist/antd.css';

class App {
    init() {
        RX.App.initialize(DEBUG, DEV);
        RX.UserInterface.setMainView(this._renderRootView());
    }

    handleClick(e: any) {
        console.log('click ', e);
    };

    private _renderRootView() {
        return (
            <RootView />
        );
    }
}

export default new App();
