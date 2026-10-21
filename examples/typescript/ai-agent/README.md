# AI agent example (TypeScript)

Claude writes TypeScript, Zapcode runs it, and each tool call suspends the VM
so the host can run the real function and resume. Uses only the core
`@2018kguo/zapcode` package and the Anthropic SDK.

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run agent
```

For the higher-level loop (tool validation, parallel batches, sessions), see
`execute()` in [`packages/zapcode`](../../../packages/zapcode) and the
[workflows example](../workflows).
