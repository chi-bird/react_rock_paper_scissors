interface ScoreboardProps {
  wins: number;
  losses: number;
  draws: number;
}

export function Scoreboard({ wins, losses, draws }: ScoreboardProps) {
  return (
    <div className="scoreboard" aria-label="現在のスコア">
      <span>勝ち: {wins}</span>
      <span>負け: {losses}</span>
      <span>あいこ: {draws}</span>
    </div>
  );
}

export default Scoreboard;


