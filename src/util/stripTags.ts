export const stripTags = (html: string | null | undefined) => html?.replace(/<[^>]+>/g, '').replace('&nbsp;', ' ');
