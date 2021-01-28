import { format } from 'prettier/standalone';
import parserMarkdown from 'prettier/parser-markdown';

const formatText = (text: string) => {
  return format(text, {
    parser: 'markdown',
    plugins: [parserMarkdown],
  });
};

export { formatText };
