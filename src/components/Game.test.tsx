import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Game } from './Game';

describe('Game component', () => {
  it('shows initial prompt and updates score', async () => {
    render(<Game />);
    expect(screen.getByText('手を選んでください')).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /プレイヤーの手: グー/ }));

    expect(screen.getByRole('status')).toBeInTheDocument();
    const incremented =
      screen.queryByText('勝ち: 1') ||
      screen.queryByText('負け: 1') ||
      screen.queryByText('あいこ: 1');
    expect(incremented).toBeInTheDocument();
  });

  it('resets score', async () => {
    render(<Game />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /プレイヤーの手: グー/ }));
    await user.click(screen.getByRole('button', { name: 'スコアをリセット' }));
    expect(screen.getByText('勝ち: 0')).toBeInTheDocument();
    expect(screen.getByText('負け: 0')).toBeInTheDocument();
    expect(screen.getByText('あいこ: 0')).toBeInTheDocument();
  });
});


