import bannerDefaults from '@jswork/banner-defaults';
import '@jswork/next';
import '@jswork/next-nice-comments';

type Options = {
  banner: string[];
};

export default (inOptions?: Options) => {
  const { banner } = nx.mix({ banner: [] }, inOptions);
  return {
    name: 'vite-html-banner',
    transformIndexHtml(html) {
      return nx.niceComments(banner || bannerDefaults(), 'html') + html;
    },
  };
};
