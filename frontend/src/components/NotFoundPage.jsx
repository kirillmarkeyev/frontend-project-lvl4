import React from 'react';
import { useTranslation } from 'react-i18next';

import notFoundPic from '../assets/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notFoundPic} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        {' '}
        <a href="/">{t('notFound.linkText')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
