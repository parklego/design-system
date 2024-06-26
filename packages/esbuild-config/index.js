const { build } = require('esbuild')

const run = ({ entryPoints = ['src/index.ts'], pkg, config = {} }) => {
  const watch = process.argv.includes('--watch')

  // 라이브러리를 번들에 포함하지 않고 외부에 유지함으로써 번들 크기를 최적화
  const external = Object.keys({
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  })

  const baseConfig = {
    entryPoints,
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'dist',
    target: 'es2019',
    watch,
    external,
    ...config,
  }

  // 디버깅, 개발시간 단축을 위해 프로덕션환경에서만 활성화 하기
  if (process.env.NODE_ENV !== 'production') {
    baseConfig.minify = false
  }

  // mjs, cjs 병렬로 처리하기
  // Node.js와 브라우저 환경 모두에서 호환되는 라이브러리를 개발할 때, 일반적으로 CommonJS와 ECMAScript 모듈 형식을 모두 지원하는 것이 좋다
  Promise.all([
    build({
      ...baseConfig,
      format: 'esm',
    }),
    build({
      ...baseConfig,
      format: 'cjs',
      outExtension: {
        '.js': '.cjs',
      },
    }),
  ]).catch(() => {
    console.error('Build failed')
    process.exit(1)
  })
}

module.exports = run
