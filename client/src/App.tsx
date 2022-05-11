import { useState } from 'react';
import GameTitle from './components/gameTitle';
import RootSelect from './components/rootSelect';

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
    </div>
  )
}

export default App;
