import { AppStates, FilterTypes } from './app';

const HintTexts = {
  listEmpty: 'Click New Event to create your first point',
  pastFilterEmpty: 'There are no past events',
  presentListEmpty: 'There are no present events',
  futureListEmpty: 'There are no future events',
  loading: 'Loading...',
  dataLoadError: 'Failed to load latest route information',
};

const FilterEmptyHints = {
  [FilterTypes.FUTURE]: HintTexts.futureListEmpty,
  [FilterTypes.PRESENT]: HintTexts.presentListEmpty,
  [FilterTypes.PAST]: HintTexts.pastFilterEmpty,
  [FilterTypes.EVERYTHING]: HintTexts.listEmpty,
};

const AppStateHints = {
  [AppStates.IsLoading]: HintTexts.loading,
  [AppStates.IsError]: HintTexts.dataLoadError,
};

export { HintTexts, FilterEmptyHints, AppStateHints };
