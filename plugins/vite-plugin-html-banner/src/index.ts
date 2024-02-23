import bannerDefaults from '@jswork/banner-defaults';
import '@jswork/next';
import '@jswork/next-nice-comments';

type Options = {
  banner: string[];
  pkg?: any;
};

export default (inOptions?: Options) => {
  const { banner, pkg } = nx.mix({ banner: [], pkg: {} }, inOptions);
  return {
    name: 'vite-html-banner',
    transformIndexHtml(html) {
      return nx.niceComments(banner || bannerDefaults(pkg), 'html') + html;
    },
  };
};
