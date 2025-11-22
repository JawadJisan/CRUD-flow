import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/axios';

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    status: 'active',
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.courseId) {
      toast.error('Please select both student and course');
      return;
    }

    try {
      await api.post('/enrollments', formData);
      toast.success('Enrollment created successfully');
      navigate('/enrollments');
    } catch (error) {
      toast.error('Failed to create enrollment');
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate('/enrollments')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Enrollments
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Select Student</Label>
              <Select
                value={formData.studentId}
                onValueChange={(value) => setFormData({ ...formData, studentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student._id} value={student._id}>
                      {student.name} - {student.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseId">Select Course</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) => setFormData({ ...formData, courseId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.code} - {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Create Enrollment
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/enrollments')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentForm;
