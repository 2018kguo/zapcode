# AI agent example (Python)

Claude writes TypeScript, Zapcode runs it, and each tool call suspends the VM
so the host can run the real function and resume.

```bash
uv sync   # or: pip install zapcode anthropic
export ANTHROPIC_API_KEY=sk-ant-...
python ai_agent_anthropic.py
```
