import React from 'react';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return <div className={css.loader}>Завантаження...</div>;
};

export default Loader;
