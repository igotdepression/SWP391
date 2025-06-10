import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import ordersData from "../services/orderService";

export default function OrderManagement() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = ordersData.filter(
    (order) =>
      order.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === "" || order.status === statusFilter)
  );

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-500 text-white py-8 px-6 space-y-6">
        <div className="text-3xl font-extrabold">Staff</div>
        <div className="text-red-500 font-semibold">Menu</div>
        <nav className="space-y-2">
          <div className="hover:underline cursor-pointer">Dashboard</div>
          <div className="hover:underline cursor-pointer font-semibold text-white/80">
            Danh sách đơn giao/nhận kit
          </div>
          <div className="hover:underline cursor-pointer font-semibold text-white">
            Danh sách đơn nhận mẫu
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <header className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">Quản lý đơn/nhận kit</h1>
          <div className="text-right">
            <div className="font-semibold">ABC</div>
            <div className="text-sm text-gray-700">ID: 123456789</div>
          </div>
        </header>

        <div className="flex gap-4 mb-6 items-center">
          <Input
            placeholder="Tìm kiếm theo tên..."
            className="rounded-md border border-gray-300 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tất cả</SelectItem>
              <SelectItem value="Chưa giao">Chưa giao</SelectItem>
              <SelectItem value="Đang giao">Đang giao</SelectItem>
              <SelectItem value="Đã giao">Đã giao</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="overflow-x-auto shadow-md">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 font-semibold">MÃ ĐƠN</th>
                <th className="p-3 font-semibold">HỌ & TÊN</th>
                <th className="p-3 font-semibold">TRẠNG THÁI</th>
                <th className="p-3 font-semibold">NGÀY YÊU CẦU</th>
                <th className="p-3 font-semibold">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3 whitespace-nowrap">{order.id}</td>
                  <td className="p-3 whitespace-nowrap">{order.name}</td>
                  <td className="p-3 whitespace-nowrap">{order.status}</td>
                  <td className="p-3 whitespace-nowrap">{order.date}</td>
                  <td className="p-3">
                    <Button variant="outline" size="sm">
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6 gap-2 p-4">
            <Button variant="outline" size="sm">
              &lt;
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              &gt;
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
