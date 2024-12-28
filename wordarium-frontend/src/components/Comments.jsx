import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "../utils/userAxios";
import moment from "moment";
import { toast} from "react-toastify";

const Comments = ({ id, auth }) => {
  const [comments, setComments] = useState([]);
  const contentRef = useRef();

  const handlePostComment = async (e) => {
    e.preventDefault();

    if (!contentRef.current.value) {
      toast.warn("Please fill in the comment.");
      return;
    }

    const commentData = {
      content: contentRef.current.value,
    };

    try {
      const response = await axios.post(
        `http://localhost:4002/blog/comment/${id}`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Posted")
        contentRef.current.value = "";
        handleGetComment(id);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleGetComment = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(
        `http://localhost:4002/blog/comment/${id}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommmentDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4002/blog/deleteComment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setComments(comments.filter((comment) => comment._id !== id));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    handleGetComment(id);
  }, [id]);

  return (
    <div className="w-full sm:w-[80%] mt-auto mx-auto bg-gray-900 bg-opacity-80 backdrop-blur-md p-5 rounded-t-xl">

      <div className="max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-orange-600">
            {comments.length} Comments
          </h1>
        </div>
        <hr className="h-[2px] bg-white rounded-full mb-16" />

        {auth?.token && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden">
              <img
                src={auth?.profileImage || "/default-profile.png"}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="flex-1 relative">
              <input
                ref={contentRef}
                className="w-full h-12 sm:h-14 px-4 text-sm sm:text-lg text-gray-300 rounded-lg outline-none bg-gray-800 placeholder-gray-500"
                placeholder="Join the Discussion..."
              />
            </div>
            <button
              onClick={handlePostComment}
              className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all"
            >
              Post
            </button>
          </div>
        )}

        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          {comments.map((com, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md flex gap-8"
            >
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl overflow-hidden">
                <img src={com.profileImageURL} alt="" />
              </div>
              <div className="w-full flex flex-col">
                <div className="w-full flex mb-1 items-center justify-between gap-3">
                  <div>
                    <p className="text-[1.5rem] text-white font-medium">
                      {com.authorName}
                    </p>
                    <p className="text-md text-zinc-500 font-medium">
                      {moment(com.createdAt || Date.now()).format(
                        "MMMM DD, YYYY"
                      )}
                    </p>
                  </div>
                  {auth.userName === com.authorName && (
                    <div
                      onClick={() => handleCommmentDelete(com._id)}
                      className="h-8 w-8 rounded-full flex justify-center items-center cursor-pointer hover:scale-[1.05]"
                    >
                      <MdDelete size={25} className="text-orange-600" />
                    </div>
                  )}
                </div>
                <p className="text-2xl text-zinc-300 font-normal">
                  {com.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
