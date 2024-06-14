import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DraggableCard from "../components/DraggableCard";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { paginateVideos } from "../apiRequest";

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await paginateVideos(page, 10, token);
      console.log(response)
      setVideos(response.list);
      setCurrentPage(response.page);
      setTotalPages(response.num_pages);
    } catch (error) {
      throw `Error fetching videos: ${error}`;
    }
  };

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedVideo = videos[dragIndex];
    const newVideos = [...videos];
    newVideos.splice(dragIndex, 1);
    newVideos.splice(hoverIndex, 0, draggedVideo);
    setVideos(newVideos);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container w-full mx-auto bg-[#111111] px-4 py-8">
        <div className="flex pb-6 w-full justify-between items-center">
        <h1 className="text-[40px] text-white mb-4">Today's Leaderboard</h1>
<div className="w-[35%] py-4 rounded-2xl gap-3 bg-[#1D1D1D] flex justify-center items-center">
<h4 className="text-[16px] text-white">30 May 2022</h4>
<div className="w-[8px] h-[8px] rounded-full bg-[#696969]"/>
<div className="px-4 py-2 bg-[#9BFF00] rounded-xl text-black text-[14px]">SUBMISSIONS OPEN</div>
<div className="w-[8px] h-[8px] rounded-full bg-[#696969]"/>
<h4 className="text-[16px] text-white">11:34</h4>

</div>
        </div>

        <DndProvider backend={HTML5Backend}>
          <table className="min-w-full bg-white">
            <thead className="bg-black">
              <tr>
                <th className="py-2 text-white">#</th>
                <th className="py-2  text-white">Title</th>
                <th className="py-2  text-white">Author</th>
                <th className="py-2  text-white">Most Liked</th>
              </tr>
            </thead>
            <tbody className="bg-black">
              {videos.map((video, index) => (
                <DraggableCard key={video.id} video={video} index={index} moveCard={moveCard} />
              ))}
            </tbody>
          </table>
        </DndProvider>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevPage}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;