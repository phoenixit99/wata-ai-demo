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

  it('TC-10-02: sửa tên công việc và giữ sau khi tải lại', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.type(screen.getByLabelText('Công việc mới'), 'Viết báo cáo');
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    await user.click(screen.getByRole('button', { name: 'Sửa "Viết báo cáo"' }));
    const input = screen.getByLabelText('Sửa tên: Viết báo cáo');
    await user.clear(input);
    await user.type(input, 'Viết báo cáo tuần{Enter}');
    expect(screen.getByText('Viết báo cáo tuần')).toBeInTheDocument();
    unmount();
    render(<App />);
    expect(screen.getByText('Viết báo cáo tuần')).toBeInTheDocument();
  });

  it('TC-10-03: bấm Esc thì huỷ sửa, giữ tên cũ', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Công việc mới'), 'Gọi khách hàng');
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    await user.click(screen.getByRole('button', { name: 'Sửa "Gọi khách hàng"' }));
    await user.type(screen.getByLabelText('Sửa tên: Gọi khách hàng'), ' gấp{Escape}');
    expect(screen.getByText('Gọi khách hàng')).toBeInTheDocument();
    expect(screen.queryByLabelText('Sửa tên: Gọi khách hàng')).not.toBeInTheDocument();
  });

  it('TC-10-04: lưu tên rỗng thì giữ tên cũ', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Công việc mới'), 'Họp sprint');
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    await user.click(screen.getByRole('button', { name: 'Sửa "Họp sprint"' }));
    const input = screen.getByLabelText('Sửa tên: Họp sprint');
    await user.clear(input);
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(screen.getByText('Họp sprint')).toBeInTheDocument();
  });
});
