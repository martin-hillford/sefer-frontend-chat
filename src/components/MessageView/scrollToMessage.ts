import { RefObject } from 'react';

export default (ref : RefObject<HTMLDivElement>, messageId: number | undefined) => {
  if (!messageId) return;
  const parent = ref.current ? ref.current as any : undefined;
  const envelop = parent?.querySelector(`[data-id="${messageId}"]`) as HTMLDivElement;
  if (!envelop) return;
  const rect = envelop.getBoundingClientRect();
  parent!.scroll({ top: rect.top + 180, behavior: 'instant' });
  envelop.scrollIntoView();
};