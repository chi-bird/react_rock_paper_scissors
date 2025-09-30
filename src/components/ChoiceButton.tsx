import type { Choice } from '../lib/game';

interface ChoiceButtonProps {
  choice: Choice;
  onSelect: (choice: Choice) => void;
}

export function ChoiceButton({ choice, onSelect }: ChoiceButtonProps) {
  const labelMap: Record<Choice, string> = {
    rock: 'グー',
    paper: 'パー',
    scissors: 'チョキ',
  };

  return (
    <button
      type="button"
      className="choice-btn"
      aria-label={`プレイヤーの手: ${labelMap[choice]}`}
      onClick={() => onSelect(choice)}
    >
      {labelMap[choice]}
    </button>
  );
}

export default ChoiceButton;


