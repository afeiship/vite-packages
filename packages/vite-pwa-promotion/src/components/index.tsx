import React, { HTMLAttributes } from 'react';
import cx from 'classnames';

const CLASS_NAME = 'vite-pwa-promotion';
const locals = {
  'en-US': {
    'update-available': '🚀 New content available, click on reload button to update.',
    'reload': 'Reload',
    'close': 'Close'
  },
  'zh-CN': {
    'update-available': '有新内容可用，点击重新加载按钮更新。',
    'reload': '⚡️ 重新加载',
    'close': '🧨 关闭'
  }
};

type VitePwaPromotionProps = {
  className?: string;
  lang?: string;
  interval?: number;
  mute?: boolean;
  useRegisterSW: any;
} & HTMLAttributes<any>;

const VitePwaPromotion = (inProps: VitePwaPromotionProps) => {
  const { className, lang, mute, interval, useRegisterSW, ...props } = inProps;
  const t = (key: string) => locals[lang!][key] || key;
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`);
      r &&
        setInterval(() => {
          !mute && console.log('Checking for sw update');
          void r.update();
        }, interval /* 20s for testing purposes */);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });

  if (!needRefresh) return null;

  return (
    <div className={cx(CLASS_NAME, className)} {...props}>
      <header className={`${CLASS_NAME}__header`}>{t('update-available')}</header>
      <footer className={`${CLASS_NAME}__footer`}>
        <button onClick={() => updateServiceWorker(true)}>{t('reload')}</button>
        <button onClick={() => setNeedRefresh(false)}>{t('close')}</button>
      </footer>
    </div>
  );
};

VitePwaPromotion.defaultProps = {
  lang: 'en-US',
  interval: 20 * 1000,
  mute: false
};

export default VitePwaPromotion;
