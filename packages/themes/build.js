import run from '@parklego/esbuild-config'
import pkg from './package.json' assert { type: 'json' }

run({ pkg })
