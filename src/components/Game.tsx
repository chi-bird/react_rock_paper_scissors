import { useMemo, useState } from 'react';
import type { Choice, RoundOutcome } from '../lib/game';
import { playRound } from '../lib/game';
import { ChoiceButton } from './ChoiceButton';
import { Scoreboard } from './Scoreboard';

export function Game() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [lastOutcome, setLastOutcome] = useState<RoundOutcome | null>(null);

  const handleSelect = (choice: Choice) => {
    const outcome = playRound(choice);
    setLastOutcome(outcome);
    if (outcome.result === 'win') setWins((w) => w + 1);
    else if (outcome.result === 'lose') setLosses((l) => l + 1);
    else setDraws((d) => d + 1);
  };

  const resultText = useMemo(() => {
    if (!lastOutcome) return '手を選んでください';
    const jp: Record<RoundOutcome['result'], string> = {
      win: '勝ち',
      lose: '負け',
      draw: 'あいこ',
    };
    const labelMap: Record<Choice, string> = {
      rock: 'グー',
      paper: 'パー',
      scissors: 'チョキ',
    };
    return `あなた: ${labelMap[lastOutcome.player]} / コンピュータ: ${labelMap[lastOutcome.computer]} → ${jp[lastOutcome.result]}`;
  }, [lastOutcome]);

  return (
    <div className="game">
      <h2>じゃんけん</h2>
      <div className="choices" role="group" aria-label="じゃんけんの手を選択">
        <ChoiceButton choice="rock" onSelect={handleSelect} />
        <ChoiceButton choice="scissors" onSelect={handleSelect} />
        <ChoiceButton choice="paper" onSelect={handleSelect} />
      </div>
      <p aria-live="polite" className="result" role="status">{resultText}</p>
      <Scoreboard wins={wins} losses={losses} draws={draws} />
      <button type="button" className="reset-btn" onClick={() => { setWins(0); setLosses(0); setDraws(0); setLastOutcome(null); }} aria-label="スコアをリセット">
        リセット
      </button>
    </div>
  );
}

export default Game;


