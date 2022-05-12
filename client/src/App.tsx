import { useState } from 'react';
import GameTitle from './components/gameTitle';
import RootSelect from './components/rootSelect';
import Battle from './components/battle';

const App = () => {
  const [gameTitleDisable, setGameTitleDisable] = useState(false);
  const [rootSelectDisable, setRootSelectDisable] = useState(true);

  const gameStart = (): void => {
    setGameTitleDisable(true);
    setRootSelectDisable(false);
  }

  return (
    <div>
      <GameTitle
        disable={gameTitleDisable}
        onClick={gameStart}
      />
      <RootSelect disable={rootSelectDisable} />
      <Battle />
    </div>
  )
}

export default App;
