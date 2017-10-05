import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const styles = require('./Hello.scss');

export interface IHelloProps { compiler: string; framework: string; }

// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<IHelloProps, undefined> {

    public render() {
        return <h1 className={styles.heading}>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
