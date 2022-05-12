import { useState } from 'react';
import GameTitle from './components/gameTitle';
import RootSelect from './components/rootSelect';
import Battle from './components/battle';

const App = () => {
  const [gameTitleDisable, setGameTitleDisable] = useState(false);
  const [rootSelectDisable, setRootSelectDisable] = useState(true);
  const [battleDisable, setBattleDisable] = useState(true);

  const gameStart = (): void => {
    setGameTitleDisable(true);
    setRootSelectDisable(false);
  }

  const battleStart = (): void => {
    setRootSelectDisable(true);
    setBattleDisable(false);
  }

  return (
    <div>
      <GameTitle
        disable={gameTitleDisable}
        onClick={gameStart}
      />
      <RootSelect
        disable={rootSelectDisable}
        onClick={battleStart}
      />
      <Battle disable={battleDisable} />
    </div>
  )
}

export default App;
