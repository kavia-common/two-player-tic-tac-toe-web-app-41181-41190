import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ChatWidget provides a minimal OpenAI-powered chat interface.
 * It renders a floating chat button and panel. When enabled via env, it sends
 * messages to the OpenAI Responses API-compatible endpoint specified by
 * REACT_APP_OPENAI_API_BASE, using a model in REACT_APP_OPENAI_MODEL.
 *
 * Environment variables required:
 * - REACT_APP_OPENAI_API_KEY: Bearer token for OpenAI-compatible API.
 * - REACT_APP_OPENAI_API_BASE: Base URL for API (e.g., https://api.openai.com/v1).
 * - REACT_APP_OPENAI_MODEL: Model name, default "gpt-4o-mini" if not set.
 * - REACT_APP_ENABLE_CHATBOT: "true" to enable the widget; if not true, component renders null.
 *
 * Accessibility:
 * - Button has aria-labels and focuses input on open.
 */
export default function ChatWidget() {
  // Hooks must be called unconditionally to satisfy react-hooks rules
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about this Tic Tac Toe game.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Static config derived from env
  const enabled = String(process.env.REACT_APP_ENABLE_CHATBOT || '').toLowerCase() === 'true';
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
  const apiBase = (process.env.REACT_APP_OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini';

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const canSend = useMemo(() => {
    return !!apiKey && !!apiBase && !!model && input.trim().length > 0 && !loading;
  }, [apiKey, apiBase, model, input, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    const userText = input.trim();
    setInput('');
    const nextMessages = [...messages, { role: 'user', content: userText }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          input: nextMessages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n') + '\nAssistant:',
        })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }

      const data = await res.json();
      let assistantText = '';
      if (data && data.output && Array.isArray(data.output)) {
        const first = data.output[0];
        if (first && first.content && Array.isArray(first.content) && first.content[0] && first.content[0].text) {
          assistantText = first.content[0].text;
        }
      } else if (data && data.choices && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
        assistantText = data.choices[0].message.content;
      } else if (data && typeof data.output_text === 'string') {
        assistantText = data.output_text;
      }
      if (!assistantText) {
        assistantText = 'Sorry, I could not parse the response.';
      }
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  // Only gate the render output, not the hook calls.
  // Rendering null avoids any runtime work when chatbot is disabled in env.
  if (!enabled) {
    return null;
  }

  return (
    <>
      <button
        className="chat-launcher"
        aria-label="Open AI chat assistant"
        onClick={() => setOpen(o => !o)}
      >
        {open ? '×' : 'AI'}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="AI Chat Assistant">
          <div className="chat-header">
            <div>AI Assistant</div>
            <button className="chat-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-messages" ref={listRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-message ${m.role}`}>
                <div className="bubble">{m.content}</div>
              </div>
            ))}
            {loading && <div className="chat-message assistant"><div className="bubble">Thinking…</div></div>}
          </div>
          <form className="chat-input-row" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              placeholder={apiKey ? "Type your message..." : "Missing API key (REACT_APP_OPENAI_API_KEY)"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!apiKey || loading}
              aria-label="Type a message"
            />
            <button className="btn" type="submit" disabled={!canSend}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}
