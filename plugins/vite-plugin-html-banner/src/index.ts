import bannerDefaults from '@jswork/banner-defaults';
import '@jswork/next';
import '@jswork/next-nice-comments';

type Options = {
  banner: string[];
};

export default (inOptions?: Options) => {
  return {
    name: 'vite-html-banner',
    transformIndexHtml(html: string) {
      return nx.niceComments(inOptions?.banner || bannerDefaults(), 'html') + html;
    },
  };
};
