type Payload = {
  title: string;
  summary: string;
  publishedAt: string;
  tags: string;
  body: string;
};

const composeMarkDown = ({
  title,
  summary,
  publishedAt,
  tags,
  body,
}: Payload) => {
  const markDown = `---
title: ${title}
publishedAt: ${publishedAt}
summary: ${summary}
tags: ['${tags}']
---

${body}
`;

  return markDown;
};

export { composeMarkDown };
