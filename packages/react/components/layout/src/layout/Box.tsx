import * as React from 'react'
import { BoxProps } from './types'

const Box = (props: BoxProps, ref: React.Ref<HTMLElement>) => {
  const { as = 'div', children } = props

  return React.createElement(
    as,
    {
      ...props,
      ref,
      className: props.className,
      style: {
        // test
        width: '100px',
        height: '100px',
        background: 'red',
      },
    },
    children,
  )
}

const _Box = React.forwardRef(Box)

export { _Box as Box }
