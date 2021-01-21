import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const { data } = useSWR('/api/github/pull', fetcher);

  return <div>{data && <pre>{JSON.stringify(data, null, '\n')}</pre>}</div>;
};

<div>aa</div>;

export default Index;
