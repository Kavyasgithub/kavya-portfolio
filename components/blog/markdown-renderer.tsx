import { marked } from 'marked'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = marked.parse(content, { async: false }) as string

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
