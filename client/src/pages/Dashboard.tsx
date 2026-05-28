import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { getInterviews } from "../services/interviewService";

function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState<any[]>([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const data = await getInterviews();
      setInterviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between">

        <h1 className="text-xl font-bold">
          AI Interview Prep
        </h1>

        <div className="flex gap-4 items-center">
          <span>Hi, {user.name}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

      </nav>

      {/* Content */}
      <div className="p-8">

        <h2 className="text-3xl font-bold mb-6">
          Dashboard
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Interviews</h3>
            <p className="text-3xl">
              {interviews.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Completed</h3>
            <p className="text-3xl">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Upcoming</h3>
            <p className="text-3xl">
              {interviews.length}
            </p>
          </div>

        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() =>
              navigate("/create-interview")
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            + Create Interview
          </button>
        </div>

        {/* Interview Cards */}
        <div className="mt-10 grid grid-cols-3 gap-6">

          {interviews.map((item: any) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/interview/${item._id}`)
              }
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg"
            >

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p>
                Category: {item.category}
              </p>

              <p>
                Difficulty: {item.difficulty}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;