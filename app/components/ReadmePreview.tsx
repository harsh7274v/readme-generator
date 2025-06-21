import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ReadmePreviewProps {
  content: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function ReadmePreview({ content }: ReadmePreviewProps) {
    return (
    <div
      className="prose max-w-4xl w-full mx-auto rounded-2xl p-12 border border-gray-100 shadow-lg min-h-[600px]"
      style={{ backgroundColor: 'transparent' }} // Remove white background
    >
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            return inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <span>{children}</span>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 