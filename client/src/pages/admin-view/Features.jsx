import React, { useEffect } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent
} from '@/components/ui/card';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deletesubscribeUser, getAllsubscribeUser } from '@/services/admin/OrderService';
import { toast } from 'sonner';

const Features = () => {
  const { serviceList } = useSelector(state => state.adminOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllsubscribeUser());
  }, [dispatch]);

  const handleDelete = async (id) => {
    // console.log("Delete subscriber with id:", id);
    try {
      const response = await dispatch(deletesubscribeUser(id)).unwrap()
      if (response.success) {
        dispatch(getAllsubscribeUser())
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }


    } catch (error) {
      // console.log(error)
      toast.error("Server Error")
    }
  };

  // console.log(serviceList)

  return (
    <Card className="border border-gray-300 rounded-2xl overflow-x-auto">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Subscribers & Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {serviceList && serviceList.length > 0 ? (
          <div className="min-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>User Email</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceList.map(subscriber => (
                  <TableRow key={subscriber._id}>

                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{subscriber.userId?.userName}</TableCell>
                    <TableCell>{subscriber.userId?.email || '-'}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800"
                      >
                        {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(subscriber._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No subscribers found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default Features;
