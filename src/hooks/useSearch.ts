import { usePost } from 'sefer-fetch';
import { useEffect, useState } from 'react';

export interface SearchResultData {
    channelId: number
    messageId: number
    content: string
}

export default (term: string | undefined) => {
  const post = usePost<SearchResultData[]>();
  const [results, setResults] = useState<SearchResultData[] | undefined>();

  useEffect(() => {
    if (!term || term.trim().length < 3) { setResults(undefined); return; }
    post('/user/channels/search-messages', { term })
      .then((response) => { if (response.ok) setResults(response.body); });
  }, [term]);

  return results;
};
