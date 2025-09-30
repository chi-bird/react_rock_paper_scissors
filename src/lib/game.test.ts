import { determineResult, getRandomChoice, playRound, type Choice } from './game';

describe('determineResult', () => {
  it('returns draw when same', () => {
    expect(determineResult('rock', 'rock')).toBe('draw');
    expect(determineResult('paper', 'paper')).toBe('draw');
    expect(determineResult('scissors', 'scissors')).toBe('draw');
  });

  it('computes wins correctly', () => {
    expect(determineResult('rock', 'scissors')).toBe('win');
    expect(determineResult('paper', 'rock')).toBe('win');
    expect(determineResult('scissors', 'paper')).toBe('win');
  });

  it('computes losses correctly', () => {
    expect(determineResult('rock', 'paper')).toBe('lose');
    expect(determineResult('paper', 'scissors')).toBe('lose');
    expect(determineResult('scissors', 'rock')).toBe('lose');
  });
});

describe('getRandomChoice', () => {
  it('maps rng to valid choices', () => {
    const rngs = [() => 0, () => 0.3, () => 0.6, () => 0.99];
    rngs.forEach((rng) => {
      const c = getRandomChoice(rng);
      expect(['rock', 'paper', 'scissors']).toContain(c);
    });
  });
});

describe('playRound', () => {
  it('returns outcome with deterministic rng', () => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const rng = (() => {
      let i = 0;
      return () => (i++ % 3) / 3;
    })();
    const outcome = playRound('rock', rng);
    expect(outcome.player).toBe('rock');
    expect(['rock', 'paper', 'scissors']).toContain(outcome.computer);
    expect(['win', 'lose', 'draw']).toContain(outcome.result);
    void choices;
  });
});


