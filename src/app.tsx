import { useState } from 'react';
import { Tabs } from './constants';
import {
  StyledAppHeader,
  StyledAppHeading,
  StyledAppWrapper,
  StyledPhotosGallery,
  StyledTabButton,
  StyledTabButtonsWrapper,
} from './styledComponents';

export const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(Tabs.Gallery);

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
        {selectedTab === Tabs.Gallery && <p>Gallery</p>}

        {selectedTab === Tabs.Favourites && <p>Favourites</p>}
      </StyledPhotosGallery>
    </StyledAppWrapper>
  );
};
