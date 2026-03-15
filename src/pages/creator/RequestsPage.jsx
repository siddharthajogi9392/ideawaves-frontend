import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Card, Button } from '../../components/common/Components';
import { Check, X, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestsPage = () => {
 const [requests, setRequests] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 const fetchRequests = async () => {
  try {
   const res = await api.get('/requests/received');
   setRequests(res.data);
  } catch (error) {
   console.error("Error fetching requests", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchRequests();
 }, []);

 const handleAction = async (requestId, action) => {
  try {
   // action is 'approve' or 'reject'
   await api.post(`/requests/${action}`, { requestId });
   // update local state
   setRequests(requests.map(req =>
    req._id === requestId ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected' } : req
   ));
   toast.success(`Request ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
  } catch (error) {
   console.error(`Failed to ${action} request`, error);
   toast.error(`Failed to ${action} request`);
  }
 };

 const handleChat = (ideaId) => {
  // Chat format: /chat/:ideaId
  navigate(`/chat/${ideaId}`);
 };

 if (loading) return <div>Loading...</div>;

 return (
  <div>
   <h1 className="text-2xl font-bold mb-6">Manage Join Requests</h1>
   {requests.length === 0 ? (
    <Card><p className="text-gray-500">No requests found.</p></Card>
   ) : (
    <div className="space-y-4">
     {requests.map((req) => (
      <Card key={req._id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
       <div>
        <h3 className="font-semibold text-lg">{req.ideaId?.title || 'Unknown Idea'}</h3>
        <p className="text-sm text-gray-600">Student: <span className="font-medium text-gray-900">{req.requesterId?.name}</span> ({req.requesterId?.email})</p>
        <div className="mt-1">
         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                     ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
           req.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {req.status}
         </span>
        </div>
       </div>

       <div className="flex gap-3">
        {req.status === 'Pending' && (
         <>
          <Button variant="primary" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(req._id, 'approve')}>
           <Check className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button variant="danger" onClick={() => handleAction(req._id, 'reject')}>
           <X className="w-4 h-4 mr-1" /> Reject
          </Button>
         </>
        )}
        {req.status === 'Approved' && (
         <Button variant="outline" onClick={() => handleChat(req.ideaId._id, req.requesterId._id)}>
          <MessageCircle className="w-4 h-4 mr-1" /> Chat with Student
         </Button>
        )}
       </div>
      </Card>
     ))}
    </div>
   )}
  </div>
 );
};

export default RequestsPage;
