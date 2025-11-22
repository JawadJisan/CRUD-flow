import { useLoaderData, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// STUDENTS: This is Method 1 - React Router Loader
// Data is fetched BEFORE the component renders
// Uncomment this loader function and export it in App.jsx routing
export async function studentsLoader() {
  try {
    const response = await fetch('http://localhost:5000/api/students');
    if (!response.ok) throw new Error('Failed to fetch students');
    const data = await response.json();
    return { students: data };
  } catch (error) {
    console.error('Error loading students:', error);
    return { students: [] };
  }
}


const Students = () => {
  // STUDENTS: Data comes from loader - no loading state needed!
  const { students } = useLoaderData() 

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete student');
      
      toast.success('Student deleted successfully');
      window.location.reload(); // In production, use proper state management
    } catch (error) {
      toast.error('Failed to delete student');
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground mt-1">
            📚 Method 1: React Router Loader (Data fetched before render)
          </p>
        </div>
        <Link to="/students/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-10 text-center text-muted-foreground">
              No students found. Add your first student to get started!
            </CardContent>
          </Card>
        ) : (
          students.map((student) => (
            <Card key={student._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg">{student.name}</span>
                  <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                    {student.grade}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Email:</span> {student.email}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Age:</span> {student.age} years
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/students/edit/${student._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDelete(student._id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
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

export default Students;
