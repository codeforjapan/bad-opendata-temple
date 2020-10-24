import * as React from 'react'
import Header from './header'
import Helmet from 'react-helmet'

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: any
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps> {
  public render() {
    return (
      <div>
        <Helmet
          title="BADオープンデータ供養寺"
          meta={[
            { name: 'description', content: '「BADオープンデータ供養寺」は世の中に災厄をもたらすBADなデータが二度とこの世を彷徨わないように「供養（データクレンジング）」するために建立されました。' },
            { name: 'keywords', content: 'オープンデータ, データ活用, データクレンジング, データエンジニアリング, データマネジメント, シビックテック, Code for Japan' },
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
    )
  }
}

export default DefaultLayout
