import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/utils';

const DraggableCard = ({ video, index, moveCard }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <tr
      ref={(node) => dragRef(dropRef(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className=" rounded-2xl mb-2  border w-full border-gray-600"
    >
      <td className="w-8 text-center px-4 text-white">{video.id}</td>
      <td className="flex items-center py-6">
        <img src={video.photo} alt={video.title} className="w-24 h-16 object-cover text-[12px] text-white rounded-lg mr-4" />
        <span className="text-13px font-semibold text-white">{video.title}</span>
      </td>
      <td className="flex-1 ml-4">
        <p className="text-md font-meidum text-white">{video.username?.toUpperCase()}</p>
      </td>
      <td className="w-16 text-right pr-4 text-white">{video.like}</td>
    </tr>
  );
};

export default DraggableCard;