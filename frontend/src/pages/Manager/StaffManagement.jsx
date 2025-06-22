// pages/Manager/StaffManagement.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Adjust path if needed

export default function StaffManagement({ employees, setDetailEmployee }) {
    return (
        <Card className="data-table-card">
            {/* Re-use the table structure from the original ManagerPage */}
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td><span className={`role-badge role-${emp.role.toLowerCase()}`}>{emp.role}</span></td>
                                <td><span className={`status-badge status-${emp.status.toLowerCase()}`}>{emp.status}</span></td>
                                <td>
                                    <Button size="sm" onClick={() => setDetailEmployee(emp)}>Xem</Button>
                                    <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                                </td>
                            </tr>
                        ))}
                        {/* Thêm 10 dòng ví dụ về nhân viên */}
                        <tr key={3}>
                            <td>3</td>
                            <td>Lê Văn C</td>
                            <td>c@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 3, name: "Lê Văn C", email: "c@example.com", role: "Nhân viên", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={4}>
                            <td>4</td>
                            <td>Phạm Thị D</td>
                            <td>d@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 4, name: "Phạm Thị D", email: "d@example.com", role: "Nhân viên", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={5}>
                            <td>5</td>
                            <td>Hoàng Đình E</td>
                            <td>e@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-inactive`}>Inactive</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 5, name: "Hoàng Đình E", email: "e@example.com", role: "Nhân viên", status: "Inactive" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={6}>
                            <td>6</td>
                            <td>Đỗ Thị F</td>
                            <td>f@example.com</td>
                            <td><span className={`role-badge role-quanly`}>Quản lý</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 6, name: "Đỗ Thị F", email: "f@example.com", role: "Quản lý", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={7}>
                            <td>7</td>
                            <td>Ngô Văn G</td>
                            <td>g@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 7, name: "Ngô Văn G", email: "g@example.com", role: "Nhân viên", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={8}>
                            <td>8</td>
                            <td>Bùi Thị H</td>
                            <td>h@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-inactive`}>Inactive</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 8, name: "Bùi Thị H", email: "h@example.com", role: "Nhân viên", status: "Inactive" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={9}>
                            <td>9</td>
                            <td>Trương Văn I</td>
                            <td>i@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 9, name: "Trương Văn I", email: "i@example.com", role: "Nhân viên", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={10}>
                            <td>10</td>
                            <td>Đặng Thị K</td>
                            <td>k@example.com</td>
                            <td><span className={`role-badge role-quanly`}>Quản lý</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 10, name: "Đặng Thị K", email: "k@example.com", role: "Quản lý", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={11}>
                            <td>11</td>
                            <td>Võ Văn L</td>
                            <td>l@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-active`}>Active</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 11, name: "Võ Văn L", email: "l@example.com", role: "Nhân viên", status: "Active" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                        <tr key={12}>
                            <td>12</td>
                            <td>Cao Thị M</td>
                            <td>m@example.com</td>
                            <td><span className={`role-badge role-nhanvien`}>Nhân viên</span></td>
                            <td><span className={`status-badge status-inactive`}>Inactive</span></td>
                            <td>
                                <Button size="sm" onClick={() => setDetailEmployee({ id: 12, name: "Cao Thị M", email: "m@example.com", role: "Nhân viên", status: "Inactive" })}>Xem</Button>
                                <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
}