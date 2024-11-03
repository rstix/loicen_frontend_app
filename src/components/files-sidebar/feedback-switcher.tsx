import React, { useState } from 'react';
import Image from 'next/image';
import tick from '../../../public/tick.svg';
// import cross from '../../../public/cross.svg';
// import dash from '../../../public/minus.svg';
import CrossIcon from '../icon/cross-icon';
import DashIcon from '../icon/dash-icon';
import TickIcon from '../icon/tick-icon';

interface FeedbackSwitcherProps {
  // onSendFeedback: (feedback: string) => void;
  getFeedbackLike: (val: number) => void;
}

const FeedbackSwitcher = ({ getFeedbackLike }: FeedbackSwitcherProps) => {
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialLeft, setInitialLeft] = useState(0);
  const [currentLeft, setCurrentLeft] = useState(-1);

  const icons = [CrossIcon, DashIcon, TickIcon];

  const handleClick = (nbr: number) => {
    getFeedbackLike(nbr);
    console.log(currentLeft, nbr * 33.33, dragging);
    setCurrentLeft(nbr * 33.33);
  };

  const handleMouseDown = (e: any) => {
    setDragStartX(e.clientX);
    setInitialLeft(currentLeft);
    setDragging(true);
  };

  const handleMouseMove = (e: any) => {
    if (dragging) {
      const diff = e.clientX - dragStartX;
      const container = e.currentTarget.getBoundingClientRect();
      const newLeft =
        (((initialLeft / 100) * container.width + diff) / container.width) *
        100;
      const boundedLeft = Math.max(0, Math.min(66.66, newLeft));
      setCurrentLeft(boundedLeft);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  return (
    <div
      className="flex w-[124px] border rounded cursor-pointer relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {currentLeft > -1 && (
        <div
          className={`absolute w-[40px] h-full bg-background_second_hover  transition-[left] ${
            currentLeft == 0 && 'rounded-l'
          } ${currentLeft / 33.33 == 2 && 'rounded-r'}`}
          style={{
            left: `calc(${(40 * currentLeft) / 33.33}px + ${
              currentLeft / 33.33
            }px)`,
          }}
          onMouseDown={handleMouseDown}
          onClick={() => {
            !dragging && handleClick(-1);
          }}
        >
          <div
            className={`flex-1 flex justify-center items-center  h-6 w-full p-[6px] z-10`}
          >
            {/* <Image
              className="max-h-[12px]"
              src={icons[currentLeft / 33.33]}
              alt="file icon"
              width={11}
              height={11}
            /> */}
            {React.createElement(icons[Math.round(currentLeft / 33.33)], {
              className: 'h-6 w-6',
            })}
          </div>
        </div>
      )}

      {icons &&
        icons.map((IconComponent, i) => (
          <div
            className={`flex-1 flex justify-center items-center p-[6px] h-6 w-6 ${
              i == 1 && 'border-x'
            }`}
            key={i}
            onClick={() => handleClick(i)}
          >
            <IconComponent />
            {/* <Image
              key={i}
              className="max-h-[12px]"
              src={icon}
              alt="file icon"
              width={11}
              height={11}
            /> */}
          </div>
        ))}

      {/* <div
        className="flex-1 flex justify-center items-center"
        onClick={() => handleClick(0)}
      >
        x
      </div>
      <div
        className="flex-1 flex justify-center items-center border-l border-r"
        onClick={() => handleClick(1)}
      >
        o
      </div>
      <div
        className="flex-1 flex justify-center items-center"
        onClick={() => handleClick(2)}
      >
        ?
      </div> */}
    </div>
  );
};

export default FeedbackSwitcher;
