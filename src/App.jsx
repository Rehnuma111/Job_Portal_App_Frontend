import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import NotFound from "./components/NotFound";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompaniesCreate from "./components/admin/CompaniesCreate";
import CompaniesSetup from "./components/admin/CompaniesSetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import AllUsers from "./components/admin/AllUsers";
import ForgotPassword from "./components/ui/ForgotPassword";
import ResetPassword from "./components/ui/ResetPassword";
import SavedJobs from "./components/SavedJobs";
import Applicants from "./components/admin/Applicants";
// import { useSelector } from 'react-redux';
// import Loader from './components/ui/Loader';

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
  { path: "/saved-jobs", element: <SavedJobs /> },
  { path: "*", element: <NotFound /> },
  //admin ke lie
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CompaniesCreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompaniesSetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />,
  },
  {
    path: "/admin/users",
    element: <AllUsers />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
]);

function App() {
  // const isLoading = useSelector(state => state.loader.isLoading);
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;