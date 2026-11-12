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
    expect(screen.getByText('1 công việc · 0 đã xong')).toBeInTheDocument();
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

  async function addTask(user: ReturnType<typeof userEvent.setup>, title: string) {
    await user.type(screen.getByLabelText('Công việc mới'), title);
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
  }

  it('TC-3-01 tích hoàn thành thì việc có kiểu đã xong', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Viết báo cáo');
    const box = screen.getByRole('checkbox', { name: 'Hoàn thành: Viết báo cáo' });
    await user.click(box);
    expect(box).toBeChecked();
    expect(screen.getByText('Viết báo cáo').closest('li')).toHaveClass('done');
  });

  it('TC-3-02 bỏ tích thì việc trở lại kiểu thường', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Viết báo cáo');
    const box = screen.getByRole('checkbox', { name: 'Hoàn thành: Viết báo cáo' });
    await user.click(box);
    await user.click(box);
    expect(box).not.toBeChecked();
    expect(screen.getByText('Viết báo cáo').closest('li')).not.toHaveClass('done');
  });

  it('TC-3-03 dòng đếm hiển thị số việc và số đã xong', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'A');
    await addTask(user, 'B');
    expect(screen.getByText('2 công việc · 0 đã xong')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Hoàn thành: A' }));
    expect(screen.getByText('2 công việc · 1 đã xong')).toBeInTheDocument();
  });

  it('TC-3-04 xoá việc đã xong thì cả hai số giảm', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'A');
    await addTask(user, 'B');
    await user.click(screen.getByRole('checkbox', { name: 'Hoàn thành: A' }));
    await user.click(screen.getByRole('button', { name: 'Xoá "A"' }));
    expect(screen.getByText('1 công việc · 0 đã xong')).toBeInTheDocument();
  });
});
