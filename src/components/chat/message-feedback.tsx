import { useState } from 'react';
import InputPrompt from '@/components/input-prompt';

interface MessageFeedbackProps {
  feedbackOptions: { id: number; text: string }[];
  onClose: () => void;
  onSendFeedback: (feedback: string) => void;
  msgId: string;
}

const MessageFeedback = ({
  feedbackOptions,
  onClose,
  onSendFeedback,
  msgId,
}: MessageFeedbackProps) => {
  const [feedback, setFeedback] = useState<string>('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fillFeedbackInput = (text: string) => {
    setFeedback(text);
  };

  const sendFeedback = async (text: string) => {
    try {
      const response = await fetch(`http://${apiUrl}/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text, answer_id: msgId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Feedback sent successfully:', data);
    } catch (error) {
      console.error('Failed to send feedback:', error);
    }

    setFeedback('');
    onClose();
  };

  return (
    <div className="absolute border border-gray text-sm text-gray-darker rounded bg-gray-dark z-10 p-3 top-[calc(100%+12px)]">
      <div className="flex justify-between mb-3">
        <div>
          <h4>Tell us more:</h4>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="close"
          fill="#C6C6C6"
          className="cursor-pointer"
          onClick={onClose}
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
        </svg>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {feedbackOptions.map((el) => (
          <div
            className="border border-gray py-1 px-2 rounded transition hover:text-gray-light hover:bg-gray cursor-pointer"
            key={el.id}
            onClick={() => fillFeedbackInput(el.text)}
          >
            {el.text}
          </div>
        ))}
      </div>
      <InputPrompt
        onSend={sendFeedback}
        message={feedback}
        placeholder="Type your feedback"
        border={false}
        small={true}
      />
    </div>
  );
};

export default MessageFeedback;
