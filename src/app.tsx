import { useState } from 'react';
import { Tabs } from './constants';
import {
  StyledAppHeader,
  StyledAppHeading,
  StyledAppWrapper,
  StyledPhotosGallery,
  StyledTabButton,
  StyledTabButtonsWrapper,
} from './components/styledComponents';
import { usePhotos } from './hooks/usePhotos';
import { InfiniteScrollGallery } from './components';

export const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(Tabs.Gallery);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isLoading, hasMore, photos } = usePhotos(pageNumber);

  return (
    <StyledAppWrapper>
      <StyledAppHeader>
        <StyledAppHeading>Pexels Photos Previewer</StyledAppHeading>

        <StyledTabButtonsWrapper>
          <StyledTabButton
            disabled={Tabs.Gallery === selectedTab}
            onClick={() => setSelectedTab(Tabs.Gallery)}
          >
            Gallery
          </StyledTabButton>

          <StyledTabButton
            disabled={Tabs.Favourites === selectedTab}
            onClick={() => setSelectedTab(Tabs.Favourites)}
          >
            Favourites
          </StyledTabButton>
        </StyledTabButtonsWrapper>
      </StyledAppHeader>

      <StyledPhotosGallery>
        {selectedTab === Tabs.Gallery && (
          <InfiniteScrollGallery
            photos={photos}
            hasMore={hasMore}
            isLoading={isLoading}
            setPageNumber={setPageNumber}
          />
        )}

        {selectedTab === Tabs.Favourites && <p>Favourites</p>}
      </StyledPhotosGallery>
    </StyledAppWrapper>
  );
};
