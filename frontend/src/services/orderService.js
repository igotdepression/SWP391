// src/services/orderService.js

// Dữ liệu mẫu về đơn đặt hàng
const ordersData = [
    {
      id: "DH001",
      name: "Nguyễn Văn A",
      status: "Chưa giao",
      date: "01/06/2025",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      items: [
        { name: "Kit xét nghiệm DNA", quantity: 1, price: 2500000 }
      ]
    },
    {
      id: "DH002",
      name: "Trần Thị B",
      status: "Đang giao",
      date: "02/06/2025",
      address: "456 Đường Lê Lợi, Quận 3, TP.HCM",
      phone: "0912345678",
      email: "tranthib@example.com",
      items: [
        { name: "Kit xét nghiệm DNA", quantity: 2, price: 5000000 }
      ]
    },
    {
      id: "DH003",
      name: "Lê Văn C",
      status: "Đã giao",
      date: "03/06/2025",
      address: "789 Đường Hai Bà Trưng, Quận 5, TP.HCM",
      phone: "0923456789",
      email: "levanc@example.com",
      items: [
        { name: "Kit xét nghiệm DNA", quantity: 1, price: 2500000 }
      ]
    },
    {
      id: "DH004",
      name: "Phạm Thị D",
      status: "Chưa giao",
      date: "04/06/2025",
      address: "101 Đường Võ Văn Tần, Quận 10, TP.HCM",
      phone: "0934567890",
      email: "phamthid@example.com",
      items: [
        { name: "Kit xét nghiệm DNA", quantity: 3, price: 7500000 }
      ]
    },
    {
      id: "DH005",
      name: "Hoàng Văn E",
      status: "Đang giao",
      date: "05/06/2025",
      address: "202 Đường Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM",
      phone: "0945678901",
      email: "hoangvane@example.com",
      items: [
        { name: "Kit xét nghiệm DNA", quantity: 1, price: 2500000 }
      ]
    }
  ];
  
  // Hàm để lấy tất cả đơn hàng
  const getAllOrders = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersData), 500);
    });
  };
  
  // Hàm để lấy đơn hàng theo ID
  const getOrderById = async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = ordersData.find((order) => order.id === id);
        if (order) {
          resolve(order);
        } else {
          reject(new Error("Không tìm thấy đơn hàng"));
        }
      }, 500);
    });
  };
  
  // Hàm để cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (id, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderIndex = ordersData.findIndex((order) => order.id === id);
        if (orderIndex !== -1) {
          ordersData[orderIndex].status = status;
          resolve(ordersData[orderIndex]);
        } else {
          reject(new Error("Không tìm thấy đơn hàng"));
        }
      }, 500);
    });
  };
  
  // Export tất cả dưới dạng default object
  export default {
    ordersData,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
  };
  