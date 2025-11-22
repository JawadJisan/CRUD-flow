import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import Dashboard from "./pages/Dashboard";
import Students, { studentsLoader } from "./pages/Students";
import StudentForm from "./pages/StudentForm";
import Courses from "./pages/Courses";
import CourseForm from "./pages/CourseForm";
import Enrollments from "./pages/Enrollments";
import EnrollmentForm from "./pages/EnrollmentForm";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Dashboard /> },

      // Students
      {
        path: "students",
        element: <Students />,
        loader: studentsLoader,
      },
      { path: "students/new", element: <StudentForm /> },
      { path: "students/edit/:id", element: <StudentForm /> },

      // Courses
      { path: "courses", element: <Courses /> },
      { path: "courses/new", element: <CourseForm /> },
      { path: "courses/edit/:id", element: <CourseForm /> },

      // Enrollments
      { path: "enrollments", element: <Enrollments /> },
      { path: "enrollments/new", element: <EnrollmentForm /> },

      // Search
      { path: "search", element: <Search /> },

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
