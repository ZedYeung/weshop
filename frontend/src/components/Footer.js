import React, { Component } from 'react';
import { Layout, Icon } from 'antd';


export class Footer extends Component {
    render() {
        return (
            <Layout >
                <Layout.Footer className="footer">
                    <Icon type="copyright" /> ZedYeung; All Rights Reserved.
                </Layout.Footer>
            </Layout>
        );
    }
}