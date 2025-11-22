import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    credits: '',
    description: '',
  });

  useEffect(() => {
    if (isEditMode) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      if (!response.ok) throw new Error('Failed to fetch course');
      const data = await response.json();
      setFormData({
        title: data.title,
        code: data.code,
        credits: data.credits.toString(),
        description: data.description,
      });
    } catch (error) {
      toast.error('Failed to load course data');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditMode
        ? `http://localhost:5000/api/courses/${id}`
        : 'http://localhost:5000/api/courses';

      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          credits: parseInt(formData.credits),
        }),
      });

      if (!response.ok) throw new Error('Failed to save course');

      toast.success(isEditMode ? 'Course updated successfully' : 'Course created successfully');
      navigate('/courses');
    } catch (error) {
      toast.error('Failed to save course');
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
      <Button variant="ghost" onClick={() => navigate('/courses')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Course' : 'Add New Course'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Introduction to Computer Science"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="CS101"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  value={formData.credits}
                  onChange={handleChange}
                  required
                  placeholder="3"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Course description and objectives..."
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {isEditMode ? 'Update Course' : 'Create Course'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/courses')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseForm;
