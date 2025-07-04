import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FaUser, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDonations: 0,
    pendingRequests: 0
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    setStats({
      totalUsers: 150,
      activeUsers: 120,
      totalDonations: 500,
      pendingRequests: 25
    });
  }, []);

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary">
            <Card.Body>
              <FaUsers className="mb-2" size={24} />
              <h5>Total Users</h5>
              <h3>{stats.totalUsers}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success">
            <Card.Body>
              <FaUser className="mb-2" size={24} />
              <h5>Active Users</h5>
              <h3>{stats.activeUsers}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info">
            <Card.Body>
              <FaChartBar className="mb-2" size={24} />
              <h5>Total Donations</h5>
              <h3>{stats.totalDonations}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning">
            <Card.Body>
              <FaCog className="mb-2" size={24} />
              <h5>Pending Requests</h5>
              <h3>{stats.pendingRequests}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Activity</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-03-20</td>
                    <td>John Doe</td>
                    <td>Blood Donation Request</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                    <td>
                      <Button variant="outline-primary" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2024-03-19</td>
                    <td>Jane Smith</td>
                    <td>Registration</td>
                    <td><span className="badge bg-success">Completed</span></td>
                    <td>
                      <Button variant="outline-primary" size="sm">View</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin; 