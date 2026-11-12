import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('hiển thị trạng thái rỗng khi chưa có công việc', () => {
    render(<App />);
    expect(screen.getByText(/Chưa có công việc nào/)).toBeInTheDocument();
  });

  it('thêm công việc mới lên đầu danh sách', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Công việc mới'), 'Viết báo cáo');
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    expect(screen.getByText('Viết báo cáo')).toBeInTheDocument();
    expect(screen.getByText('1 công việc')).toBeInTheDocument();
  });

  it('xoá công việc', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Công việc mới'), 'Gọi khách hàng');
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    await user.click(screen.getByRole('button', { name: 'Xoá "Gọi khách hàng"' }));
    expect(screen.queryByText('Gọi khách hàng')).not.toBeInTheDocument();
  });

  it('giữ công việc sau khi tải lại', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.type(screen.getByLabelText('Công việc mới'), 'Họp sprint');
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    unmount();
    render(<App />);
    expect(screen.getByText('Họp sprint')).toBeInTheDocument();
  });
});
