import React from 'react';

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

export default function RevenueChart({ payments, loading, error }) {
    // Lấy tất cả giao dịch, không lọc theo status
    const completed = payments;
    const totalRevenue = completed.reduce((sum, p) => sum + p.amount, 0);
    const revenueByDay = completed.reduce((acc, p) => {
        const date = p.paymentDate;
        acc[date] = (acc[date] || 0) + p.amount;
        return acc;
    }, {});
    const chartData = Object.entries(revenueByDay)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .slice(-7)
        .map(([date, revenue]) => [
            new Date(date).toLocaleDateString('vi-VN'),
            revenue
        ]);
    const maxRevenue = Math.max(...Object.values(revenueByDay), 1);

    return (
        <div className="revenue-chart-container">
            <h4>📊 Biểu đồ Doanh thu (7 ngày gần nhất)</h4>
            {loading && <div className="loading-spinner">Đang tải dữ liệu thanh toán...</div>}
            {error && <div className="error-message">{error}</div>}
            {!loading && !error && (
                <>
                    <div className="revenue-chart">
                        <div className="chart-y-axis">
                            <span>{formatCurrency(maxRevenue)}</span>
                            <span>{formatCurrency(maxRevenue * 0.75)}</span>
                            <span>{formatCurrency(maxRevenue * 0.5)}</span>
                            <span>{formatCurrency(maxRevenue * 0.25)}</span>
                            <span>0</span>
                        </div>
                        <div className="chart-bars">
                            {chartData.map(([date, revenue]) => (
                                <div key={date} className="chart-bar-container">
                                    <div
                                        className="chart-bar"
                                        style={{
                                            height: `${(revenue / maxRevenue) * 100}%`,
                                            minHeight: revenue > 0 ? '0' : '8px'
                                        }}
                                        title={`${date}: ${formatCurrency(revenue)}`}
                                    ></div>
                                    <span className="chart-date">{date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chart-total">
                        <strong>💰 Tổng doanh thu: {formatCurrency(totalRevenue)}</strong>
                    </div>
                </>
            )}
        </div>
    );
} 