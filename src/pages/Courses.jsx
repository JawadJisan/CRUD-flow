import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// STUDENTS: This is Method 2 - Traditional useEffect approach
// Data is fetched AFTER component mounts
// Notice the loading state management


const Courses = () => {
  // STUDENTS: State management for loading and data
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // STUDENTS: useEffect runs after component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      
      toast.success('Course deleted successfully');
      fetchCourses(); // Refetch data
    } catch (error) {
      toast.error('Failed to delete course');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">
            🔄 Method 2: useEffect Hook (Data fetched after component mounts)
          </p>
        </div>
        <Link to="/courses/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-10 text-center text-muted-foreground">
              No courses found. Add your first course to get started!
            </CardContent>
          </Card>
        ) : (
          courses.map((course) => (
            <Card key={course._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg">{course.title}</span>
                  <span className="text-sm font-normal bg-accent/10 text-accent px-2 py-1 rounded">
                    {course.credits} Credits
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-primary">Code: {course.code}</p>
                  <p className="text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/courses/edit/${course._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDelete(course._id)}
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

export default Courses;
