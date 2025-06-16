import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';

interface ReadmePreviewProps {
  content: string;
}

interface CodeProps {
  node?: any;
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
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={vscDarkPlus as any}
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