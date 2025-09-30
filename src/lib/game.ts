export type Choice = 'rock' | 'paper' | 'scissors';

export type Result = 'win' | 'lose' | 'draw';

export interface RoundOutcome {
  player: Choice;
  computer: Choice;
  result: Result;
}

const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

export function getRandomChoice(random: () => number = Math.random): Choice {
  const index = Math.floor(random() * CHOICES.length);
  return CHOICES[index] ?? 'rock';
}

export function determineResult(player: Choice, computer: Choice): Result {
  if (player === computer) return 'draw';
  const winsAgainst: Record<Choice, Choice> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };
  return winsAgainst[player] === computer ? 'win' : 'lose';
}

export function playRound(player: Choice, rng: () => number = Math.random): RoundOutcome {
  const computer = getRandomChoice(rng);
  return { player, computer, result: determineResult(player, computer) };
}


