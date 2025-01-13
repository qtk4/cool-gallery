import { useState } from 'react';
import { Tabs } from './constants';
import {
  StyledAppHeader,
  StyledAppHeading,
  StyledAppWrapper,
  StyledError,
  StyledLoader,
  StyledPhotosGallery,
  StyledTabButton,
  StyledTabButtonsWrapper,
} from './components/styledComponents';
import { usePhotos, useFavouritePhotos, usePersistentFavouritePhotoIds } from './hooks';
import { InfiniteScrollGallery, FavouritePhotos, ScrollToTopButton } from './components';

export const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(Tabs.Gallery);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isLoading, hasMore, photos, isApiError } = usePhotos(pageNumber);

  const [favouritePhotoIds, handleAddToFavourites, handleRemoveFromFavourites] =
    usePersistentFavouritePhotoIds();

  const { favouritePhotos, isApiErrorFavourites, isLoadingFavourites } =
    useFavouritePhotos(favouritePhotoIds);

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
            {`Favourites (${favouritePhotoIds.length})`}
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
            favouritePhotoIds={favouritePhotoIds}
            handleAddToFavourites={handleAddToFavourites}
            handleRemoveFromFavourites={handleRemoveFromFavourites}
          />
        )}

        {selectedTab === Tabs.Favourites && (
          <FavouritePhotos
            favouritePhotos={favouritePhotos}
            handleAddToFavourites={handleAddToFavourites}
            handleRemoveFromFavourites={handleRemoveFromFavourites}
          />
        )}
      </StyledPhotosGallery>

      {(isApiError || isApiErrorFavourites) && (
        <StyledError>
          <b>Error!</b> Failed to load photos...
        </StyledError>
      )}

      {(isLoading || isLoadingFavourites) && <StyledLoader />}

      <ScrollToTopButton />
    </StyledAppWrapper>
  );
};
