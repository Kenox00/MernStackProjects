
// frontend/src/components/Stock/StockHistory.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const StockHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStockHistory();
  }, []);

  const fetchStockHistory = async () => {
    try {
      const { data } = await axios.get('/api/stock/history', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Stock History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Updated By</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record._id} className="border-b">
                <td className="px-4 py-2">
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{record.product.name}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      record.type === 'in'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-2">{record.quantity}</td>
                <td className="px-4 py-2">{record.updatedBy.name}</td>
                <td className="px-4 py-2">{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockHistory;