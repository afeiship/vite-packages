import bannerDefaults from '@jswork/banner-defaults';
import "@jswork/next";
import "@jswork/next-nice-comments";

export default () => {
  return {
    name: 'banner-html',
    transformIndexHtml(html) {
      return (
        nx.niceComments(
          bannerDefaults(),
          'html'
        ) + html
      );
    }
  };
};
