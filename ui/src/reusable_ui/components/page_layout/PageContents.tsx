// Libraries
import React, {MouseEvent, Component} from 'react'
import classnames from 'classnames'

// Components
import FancyScrollbar from 'src/shared/components/FancyScrollbar'

import {ErrorHandling} from 'src/shared/decorators/errors'

interface Props {
  children: JSX.Element[] | JSX.Element
  fullWidth?: boolean
  scrollable?: boolean
  inPresentationMode?: boolean
  setScrollTop?: (e: MouseEvent<HTMLElement>) => void
  scrollTop?: number
  scrollLeft?: number
  className?: string
}

@ErrorHandling
class PageContents extends Component<Props> {
  public static defaultProps: Partial<Props> = {
    fullWidth: false,
    scrollable: true,
    inPresentationMode: false,
  }

  public render() {
    const {scrollable, setScrollTop, scrollTop, scrollLeft} = this.props

    if (scrollable) {
      return (
        <FancyScrollbar
          className={this.className}
          setScrollTop={setScrollTop}
          scrollTop={scrollTop}
          scrollLeft={scrollLeft}
        >
          {this.children}
        </FancyScrollbar>
      )
    }
    return <div className={this.className}>{this.children}</div>
  }

  private get children(): JSX.Element[] | JSX.Element {
    const {children, fullWidth} = this.props

    if (fullWidth) {
      return children
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">{children}</div>
        </div>
      </div>
    )
  }

  private get className(): string {
    const {fullWidth, inPresentationMode, className} = this.props

    return classnames('page-contents', {
      'full-width': fullWidth,
      'presentation-mode': inPresentationMode,
      [`${className}`]: className,
    })
  }
}

export default PageContents
