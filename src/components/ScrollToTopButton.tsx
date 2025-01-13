import { useState, useEffect } from 'react';

import { StyledScrollToTop } from './styledComponents';

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleScrollVisibility = () => {
    if (window.scrollY >= 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollVisibility);
    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledScrollToTop $visible={visible} onClick={scrollToTop}>
      /\
    </StyledScrollToTop>
  );
};
