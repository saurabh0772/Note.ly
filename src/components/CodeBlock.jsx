import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedLine = (line, lineIdx) => {
    const trimmed = line.trim();
    
    // Full line comment
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return <span key={lineIdx} className="text-slate-400 italic">{line}</span>;
    }

    // Split line into code and trailing inline comment if any
    const commentIndex = line.indexOf('//');
    let codePart = line;
    let commentPart = '';
    if (commentIndex !== -1) {
      codePart = line.substring(0, commentIndex);
      commentPart = line.substring(commentIndex);
    }

    // Simple robust tokenizer for JS code part
    // Tokens: strings, keywords, builtins, numbers, identifiers/punctuation
    const tokenRegex = /('.*?'|".*?"|`.*?`|\b(?:const|let|var|function|async|await|try|catch|finally|if|else|return|new|require)\b|\b(?:resolve|reject|then|catch|finally|readFile|log|error|on|once|emit|off|removeAllListeners|listenerCount|eventNames)\b|\b\d+\b|[a-zA-Z_$][a-zA-Z0-9_$]*|[^\s\w])/g;

    const keywords = new Set(['const', 'let', 'var', 'function', 'async', 'await', 'try', 'catch', 'finally', 'if', 'else', 'return', 'new', 'require']);
    const builtins = new Set(['resolve', 'reject', 'then', 'catch', 'finally', 'readFile', 'log', 'error', 'on', 'once', 'emit', 'off', 'removeAllListeners', 'listenerCount', 'eventNames']);
    const vars = new Set(['err', 'data', 'dataA', 'dataB', 'dataC', 'promise', 'emitter', 'EventEmitter', 'name', 'event', 'listener', 'fs']);

    const tokens = [];
    let lastIdx = 0;
    let match;

    while ((match = tokenRegex.exec(codePart)) !== null) {
      // Non-matching whitespace before token
      if (match.index > lastIdx) {
        tokens.push({ text: codePart.substring(lastIdx, match.index), type: 'plain' });
      }

      const str = match[0];
      if (str.startsWith("'") || str.startsWith('"') || str.startsWith('`')) {
        tokens.push({ text: str, type: 'string' });
      } else if (keywords.has(str)) {
        tokens.push({ text: str, type: 'keyword' });
      } else if (builtins.has(str)) {
        tokens.push({ text: str, type: 'builtin' });
      } else if (vars.has(str)) {
        tokens.push({ text: str, type: 'var' });
      } else if (/^\d+$/.test(str)) {
        tokens.push({ text: str, type: 'number' });
      } else {
        tokens.push({ text: str, type: 'plain' });
      }

      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < codePart.length) {
      tokens.push({ text: codePart.substring(lastIdx), type: 'plain' });
    }

    return (
      <div key={lineIdx} className="leading-relaxed whitespace-pre">
        {tokens.map((tok, tIdx) => {
          if (tok.type === 'keyword') return <span key={tIdx} className="text-pink-400 font-semibold">{tok.text}</span>;
          if (tok.type === 'builtin') return <span key={tIdx} className="text-blue-300 font-medium">{tok.text}</span>;
          if (tok.type === 'var') return <span key={tIdx} className="text-emerald-300">{tok.text}</span>;
          if (tok.type === 'string') return <span key={tIdx} className="text-amber-300">{tok.text}</span>;
          if (tok.type === 'number') return <span key={tIdx} className="text-purple-300">{tok.text}</span>;
          return <span key={tIdx} className="text-slate-200">{tok.text}</span>;
        })}
        {commentPart && <span className="text-slate-400 italic ml-2">{commentPart}</span>}
      </div>
    );
  };

  return (
    <div className="relative group my-2 rounded-lg bg-[#0F172A] border border-slate-700/60 shadow-md text-xs font-mono overflow-hidden">
      {title && (
        <div className="bg-slate-800/80 px-3 py-1 text-[10px] text-slate-400 border-b border-slate-700/50 flex justify-between items-center">
          <span>{title}</span>
        </div>
      )}
      <div className="p-3 text-slate-200 overflow-x-auto">
        {code.split('\n').map((line, idx) => renderHighlightedLine(line, idx))}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600/50 transition-all opacity-80 group-hover:opacity-100 flex items-center gap-1 text-[10px]"
        title="Copy code to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-sans font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden group-hover:inline font-sans">Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
