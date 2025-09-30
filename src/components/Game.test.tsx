import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Game } from './Game';
import * as game from '../lib/game';

// playRoundをモック化
jest.mock('../lib/game', () => ({
  ...jest.requireActual('../lib/game'),
  playRound: jest.fn(),
}));

const mockedPlayRound = game.playRound as jest.Mock;

describe('Game component', () => {
  beforeEach(() => {
    mockedPlayRound.mockClear();
  });

  it('shows initial prompt and updates score correctly', async () => {
    mockedPlayRound.mockReturnValue({
      player: 'rock',
      computer: 'scissors',
      result: 'win',
    });

    render(<Game />);
    expect(screen.getByText('手を選んでください')).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /プレイヤーの手: グー/ }));

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('勝ち: 1')).toBeInTheDocument();
    expect(screen.getByText('負け: 0')).toBeInTheDocument();
    expect(screen.getByText('あいこ: 0')).toBeInTheDocument();
  });

  it('updates loss score correctly', async () => {
    mockedPlayRound.mockReturnValue({
      player: 'rock',
      computer: 'paper',
      result: 'lose',
    });

    render(<Game />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /プレイヤーの手: グー/ }));

    expect(screen.getByText('勝ち: 0')).toBeInTheDocument();
    expect(screen.getByText('負け: 1')).toBeInTheDocument();
    expect(screen.getByText('あいこ: 0')).toBeInTheDocument();
  });

  it('updates draw score correctly', async () => {
    mockedPlayRound.mockReturnValue({
      player: 'rock',
      computer: 'rock',
      result: 'draw',
    });

    render(<Game />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /プレイヤーの手: グー/ }));

    expect(screen.getByText('勝ち: 0')).toBeInTheDocument();
    expect(screen.getByText('負け: 0')).toBeInTheDocument();
    expect(screen.getByText('あいこ: 1')).toBeInTheDocument();
  });

  it('resets score', async () => {
    mockedPlayRound.mockReturnValue({
      player: 'rock',
      computer: 'scissors',
      result: 'win',
    });

    render(<Game />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /プレイヤーの手: グー/ }));
    await user.click(screen.getByRole('button', { name: 'スコアをリセット' }));
    expect(screen.getByText('勝ち: 0')).toBeInTheDocument();
    expect(screen.getByText('負け: 0')).toBeInTheDocument();
    expect(screen.getByText('あいこ: 0')).toBeInTheDocument();
  });
});


