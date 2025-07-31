import React, { useEffect, useState } from "react";
import { Trash2, SquareArrowOutUpRight } from "lucide-react";
import { UserStore } from "../../ApiStore/UserStore";
import { toast } from "react-hot-toast";
import SingleUserSkeleton from "../skeleton/SingleUserSkeleton";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../Pagination";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { fetchUsers, isLoading, allUsers, deleteUser, setuser, adminToggle } =
    UserStore();
  const [deleteMail, setDeleteMail] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [userPerPage, setUserPerPage] = useState(10);

  const lastUserIndex = currentPage * userPerPage;
  const firstUserIndex = lastUserIndex - userPerPage;
  const currentUser = allUsers?.slice(firstUserIndex, lastUserIndex);

  const [isAdmin, setIsAdmin] = useState({});

  useEffect(() => {
    fetchUsers();
    const initialAdminState = {};
    if (Array.isArray(allUsers)) {
      allUsers.forEach((user) => {
        initialAdminState[user._id] = user.is_Admin;
      });
      setIsAdmin(initialAdminState);
    }
  }, []);

  const handleDeleteAcc = async () => {
    try {
      if (setuser.email === deleteMail) {
        toast.error("You cannot delete your self !!");
        return;
      }
      await deleteUser(deleteMail);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    }
  };

  const handleAdminToggle = async (userId) => {
    try {
      if (setuser._id === userId) {
        toast.error("You cannot toggle your self !!");
        return;
      }

      await adminToggle(userId);

      setIsAdmin((prevAdmin) => ({
        ...prevAdmin,
        [userId]: !prevAdmin[userId],
      }));
    } catch (error) {
      console.log("Error in Admin Toggle AdminUser ", error);
    }
  };

  if (isLoading) return <SingleUserSkeleton />;

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email/Id</th>
              <th>Join since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentUser?.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <Link to={`/dashboard/${user._id}`}>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user?.profilepic || "/profile.png"}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </Link>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div
                        className={`text-sm ${
                          isAdmin[user._id] ? "text-red-500" : "text-teal-500"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{isAdmin[user._id] ? "Admin" : "User"}</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-info toggle-sm"
                            checked={isAdmin[user?._id]}
                            onChange={() => handleAdminToggle(user._id)} // Call API when toggled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    _id : {user._id}
                  </span>
                </td>
                <td>{user.createdAt?.split("T")[0]}</td>
                <th>
                  <button
                    onClick={() => {
                      setDeleteMail(user.email);
                      document.getElementById("my_modal_12").showModal();
                    }}
                    className="btn bg-transparent btn-sm me-6 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/${user._id}`)}
                    className="btn bg-transparent btn-sm text-sky-300 hover:text-sky-500"
                  >
                    <SquareArrowOutUpRight className="size-4" />
                  </button>
                </th>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
          {/* foot */}
        </table>
        <div className=" flex justify-end">
          <Pagination
            totalItems={allUsers?.length}
            itemsPerPage={userPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>

      <>
        <dialog id="my_modal_12" className="modal">
          <div className="modal-box">
            <p>
              sure want to delete{" "}
              <span className="font-bold text-red-500 text-lg">
                {deleteMail}?
              </span>
            </p>
            <br />
            <button
              onClick={handleDeleteAcc}
              className="btn btn-sm text-red-600"
            >
              confirm
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    </>
  );
};

export default AdminUsers;
