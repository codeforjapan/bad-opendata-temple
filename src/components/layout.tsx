import * as React from 'react';
import Header from './header';
import Helmet from 'react-helmet';

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: any;
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps> {
  public render() {
    return (
      <div>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
