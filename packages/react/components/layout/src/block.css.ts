import { style } from '@vanilla-extract/css'
import { variables } from '@parklego/themes'

export const blockStyle = style({
  width: '100px',
  height: '100px',
  backgroundColor: variables.colors.$scale.blue[100],
})
