import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, UserPlus, Code } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Management System</h1>
        <p className="text-muted-foreground mt-2">
          Educational Demo: Three Different Data Fetching Methods in React
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>React Router Loader</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Students page uses React Router's loader function for server-side data fetching before component renders.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <CardTitle>useEffect Hook</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Courses page demonstrates traditional component-level data fetching using useEffect and useState hooks.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-warning/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-warning" />
              <CardTitle>Axios Instance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Enrollments page uses a configured Axios instance with interceptors for API communication.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <CardTitle>Project Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">✅ Full CRUD Operations</h3>
            <p className="text-sm text-muted-foreground">
              Create, Read, Update, and Delete operations for Students, Courses, and Enrollments
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🔍 Query-Based Search</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter functionality with URL query parameters
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎓 Educational Code</h3>
            <p className="text-sm text-muted-foreground">
              Well-commented code showing three different data fetching patterns - easy to comment/uncomment for teaching
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🗄️ Backend Included</h3>
            <p className="text-sm text-muted-foreground">
              Complete Node.js/Express/MongoDB backend in a single file (check backend.js)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
