// /*
// // pages/Manager/BlogPost.jsx
// import React, { useEffect, useState } from 'react';
// import { Card, Button } from '../../components/ui/ui';
// import { Plus, Edit, Trash2, Eye, Image, Search } from 'lucide-react';
// import "./BlogPost.css";

// // Sample data based on SQL structure
// const sampleBlogPosts = [
//     {
//         postID: 1,
//         userID: 101,
//         title: "Giới thiệu dịch vụ xét nghiệm DNA mới",
//         content: "Chúng tôi vừa ra mắt dịch vụ xét nghiệm DNA với công nghệ tiên tiến nhất, mang lại kết quả chính xác và nhanh chóng cho khách hàng...",
//         createdDate: "2024-07-01T09:30:00",
//         image: "/images/blog/dna-service.jpg",
//         status: "active",
//         updatedDate: "2024-07-02T14:20:00",
//         updateBy: 101,
//         authorName: "Nguyễn Văn Admin"
//     },
//     {
//         postID: 2,
//         userID: 102,
//         title: "Khuyến mãi đặc biệt tháng 7",
//         content: "Ưu đãi giảm giá 25% cho tất cả các gói xét nghiệm gia đình. Áp dụng từ ngày 1/7 đến 31/7/2024...",
//         createdDate: "2024-07-03T16:45:00",
//         image: "/images/blog/promotion-july.jpg",
//         status: "active",
//         updatedDate: "2024-07-03T16:45:00",
//         updateBy: 102,
//         authorName: "Trần Thị Manager"
//     },
//     {
//         postID: 3,
//         userID: 103,
//         title: "Quy trình lấy mẫu tại nhà",
//         content: "Hướng dẫn chi tiết về quy trình lấy mẫu xét nghiệm tại nhà an toàn và hiệu quả...",
//         createdDate: "2024-06-28T11:15:00",
//         image: null,
//         status: "non-active",
//         updatedDate: "2024-06-30T09:00:00",
//         updateBy: 101,
//         authorName: "Lê Văn Doctor"
//     }
// ];

// export default function BlogPost() {
//     const [posts, setPosts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [showViewModal, setShowViewModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         // Simulate API fetch
//         setTimeout(() => {
//             setPosts(sampleBlogPosts);
//             setIsLoading(false);
//         }, 500);
//     }, []);

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         return new Date(dateString).toLocaleDateString('vi-VN', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     const getStatusBadge = (status) => {
//         return (
//             <span className={`status-badge ${status === 'active' ? 'status-active' : 'status-inactive'}`}>
//                 {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
//             </span>
//         );
//     };

//     const handleViewPost = (post) => {
//         setSelectedPost(post);
//         setShowViewModal(true);
//     };

//     const handleEditPost = (post) => {
//         setSelectedPost(post);
//         setShowAddModal(true);
//     };

//     const handleDeletePost = (postID) => {
//         if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
//             setPosts(posts.filter(post => post.postID !== postID));
//         }
//     };

//     const handleToggleStatus = (postID) => {
//         setPosts(posts.map(post => 
//             post.postID === postID 
//                 ? { ...post, status: post.status === 'active' ? 'non-active' : 'active' }
//                 : post
//         ));
//     };

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredPosts = posts.filter(post =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (isLoading) {
//         return (
//             <div className="blogpost-container">
//                 <div className="loading-spinner">Đang tải...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="blogpost-container">
//             {/* Header Section */}
//             <div className="blogpost-header">
//                 <div className="header-content">
//                     <div className="header-top">
//                         <div className="header-title-section">
//                             <h1 className="page-title">Quản lý Bài đăng</h1>
//                         </div>
//                         <div className="header-actions">
//                             <button 
//                                 className="create-post-btn"
//                                 onClick={() => setShowAddModal(true)}
//                             >
//                                 <Plus size={20} />
//                                 Tạo bài đăng mới
//                             </button>
//                         </div>
//                     </div>
//                     <div className="header-bottom">
//                         <div className="header-description-section">
//                             <p className="page-description">Quản lý tất cả bài đăng trên website</p>
//                         </div>
//                         <div className="header-search">
//                             <div className="search-container">
//                                 <input
//                                     type="text"
//                                     placeholder="Tìm kiếm bài đăng..."
//                                     value={searchTerm}
//                                     onChange={handleSearch}
//                                     className="search-input"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Statistics Cards */}
//             <div className="stats-container">
//                 <div className="stat-card">
//                     <div className="stat-content">
//                         <div className="stat-number">{filteredPosts.length}</div>
//                         <div className="stat-label">TỔNG BÀI ĐĂNG</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-content">
//                         <div className="stat-number">
//                             {filteredPosts.filter(p => p.status === 'active').length}
//                         </div>
//                         <div className="stat-label">BÀI ĐĂNG HOẠT ĐỘNG</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-content">
//                         <div className="stat-number">
//                             {filteredPosts.filter(p => p.status === 'non-active').length}
//                         </div>
//                         <div className="stat-label">BÀI ĐĂNG TẠM DỪNG</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-content">
//                         <div className="stat-number">
//                             {filteredPosts.filter(p => {
//                                 const postDate = new Date(p.createdDate);
//                                 const weekAgo = new Date();
//                                 weekAgo.setDate(weekAgo.getDate() - 7);
//                                 return postDate >= weekAgo;
//                             }).length}
//                         </div>
//                         <div className="stat-label">BÀI ĐĂNG MỚI</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Posts Table */}
//             <Card className="posts-table-card">
//                 <div className="table-responsive">
//                     <table className="posts-table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Hình ảnh</th>
//                                 <th>Tiêu đề</th>
//                                 <th>Tác giả</th>
//                                 <th>Trạng thái</th>
//                                 <th>Ngày tạo</th>
//                                 <th>Cập nhật cuối</th>
//                                 <th>Thao tác</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {posts.map((post) => (
//                                 <tr key={post.postID}>
//                                     <td className="post-id">#{post.postID}</td>
//                                     <td className="post-image">
//                                         {post.image ? (
//                                             <img src={post.image} alt="Post" className="thumbnail" />
//                                         ) : (
//                                             <div className="no-image">
//                                                 <Image size={24} />
//                                             </div>
//                                         )}
//                                     </td>
//                                     <td className="post-title">
//                                         <div className="title-content">
//                                             <span className="title">{post.title}</span>
//                                             <span className="content-preview">
//                                                 {post.content.substring(0, 60)}...
//                                             </span>
//                                         </div>
//                                     </td>
//                                     <td className="post-author">{post.authorName}</td>
//                                     <td className="post-status">
//                                         {getStatusBadge(post.status)}
//                                     </td>
//                                     <td className="post-date">{formatDate(post.createdDate)}</td>
//                                     <td className="post-date">{formatDate(post.updatedDate)}</td>
//                                     <td className="post-actions">
//                                         <div className="action-buttons">
//                                             <button 
//                                                 className="action-btn view"
//                                                 onClick={() => handleViewPost(post)}
//                                                 title="Xem chi tiết"
//                                             >
//                                                 <Eye size={16} />
//                                             </button>
//                                             <button 
//                                                 className="action-btn edit"
//                                                 onClick={() => handleEditPost(post)}
//                                                 title="Chỉnh sửa"
//                                             >
//                                                 <Edit size={16} />
//                                             </button>
//                                             <button 
//                                                 className="action-btn delete"
//                                                 onClick={() => handleDeletePost(post.postID)}
//                                                 title="Xóa"
//                                             >
//                                                 <Trash2 size={16} />
//                                             </button>
//                                             <button 
//                                                 className="action-btn status"
//                                                 onClick={() => handleToggleStatus(post.postID)}
//                                                 title={post.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
//                                             >
//                                                 {post.status === 'active' ? <Eye size={16} /> : <Eye size={16} style={{ opacity: 0.3 }} />}
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>

//             {/* Add/Edit Modal */}
//             {showAddModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h3>{selectedPost ? 'Chỉnh sửa bài đăng' : 'Tạo bài đăng mới'}</h3>
//                             <button className="close-btn" onClick={() => { setShowAddModal(false); setSelectedPost(null); }}>×</button>
//                         </div>
//                         <div className="modal-body">
//                             {/* Form nội dung modal ở đây */}
//                             <p>Chức năng này đã bị tạm dừng bởi quản lý.</p>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* View Modal */}
//             {showViewModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h3>Chi tiết bài đăng</h3>
//                             <button className="close-btn" onClick={() => { setShowViewModal(false); setSelectedPost(null); }}>×</button>
//                         </div>
//                         <div className="modal-body">
//                             {/* Nội dung chi tiết bài đăng ở đây */}
//                             <p>Chức năng này đã bị tạm dừng bởi quản lý.</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
// */