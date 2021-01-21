import React from 'react';
import { useForm } from 'react-hook-form';
import { composeMarkDown } from 'utility/composeMarkdown';
// import useSWR from 'swr';
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

type FormData = {
  title: string;
  summary: string;
  publishedAt: string;
  tags: string;
  body: string;
};

const Index = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    const md = composeMarkDown({
      ...data,
      publishedAt: new Date()
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .join('-'),
    });

    console.log(md);
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">
        Title
        <input id="title" name="title" ref={register} />
      </label>

      <label htmlFor="summary">
        Summary
        <input id="summary" name="summary" ref={register} />
      </label>

      <label htmlFor="tags">
        Tags
        <input id="tags" name="tags" ref={register} />
      </label>

      <label htmlFor="body">
        Body
        <textarea id="body" name="body" ref={register} />
      </label>

      <button type="submit">submit</button>
    </form>
  );
};

export default Index;
