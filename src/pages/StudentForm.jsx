import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    grade: '',
  });

  useEffect(() => {
    if (isEditMode) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`);
      if (!response.ok) throw new Error('Failed to fetch student');
      const data = await response.json();
      setFormData({
        name: data.name,
        email: data.email,
        age: data.age.toString(),
        grade: data.grade,
      });
    } catch (error) {
      toast.error('Failed to load student data');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditMode
        ? `http://localhost:5000/api/students/${id}`
        : 'http://localhost:5000/api/students';

      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
        }),
      });

      if (!response.ok) throw new Error('Failed to save student');

      toast.success(isEditMode ? 'Student updated successfully' : 'Student created successfully');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to save student');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate('/students')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Students
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Student' : 'Add New Student'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="18"
                  min="1"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  placeholder="A"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {isEditMode ? 'Update Student' : 'Create Student'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/students')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
