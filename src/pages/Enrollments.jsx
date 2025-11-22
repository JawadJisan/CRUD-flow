import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/axios';

// STUDENTS: This is Method 3 - Using Axios instance
// Axios provides better error handling and interceptors
// Notice we're using the configured 'api' instance


const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // STUDENTS: Using Axios for GET request
  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/enrollments');
      setEnrollments(response.data);
    } catch (error) {
      toast.error('Failed to load enrollments');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // STUDENTS: Using Axios for DELETE request
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;

    try {
      await api.delete(`/enrollments/${id}`);
      toast.success('Enrollment deleted successfully');
      fetchEnrollments();
    } catch (error) {
      toast.error('Failed to delete enrollment');
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'dropped':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enrollments</h1>
          <p className="text-muted-foreground mt-1">
            ⚡ Method 3: Axios Instance (Configured API client with interceptors)
          </p>
        </div>
        <Link to="/enrollments/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Enrollment
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No enrollments found. Create the first enrollment to get started!
            </CardContent>
          </Card>
        ) : (
          enrollments.map((enrollment) => (
            <Card key={enrollment._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <div>
                    <div className="text-lg mb-1">{enrollment.studentId.name}</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {enrollment.studentId.email}
                    </div>
                  </div>
                  <span className={`text-sm font-normal px-3 py-1 rounded capitalize ${getStatusColor(enrollment.status)}`}>
                    {enrollment.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="font-medium">{enrollment.courseId.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Code: {enrollment.courseId.code}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDelete(enrollment._id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Enrollments;
