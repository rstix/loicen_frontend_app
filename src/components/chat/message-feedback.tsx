import { useState } from 'react';
import InputPrompt from '@/components/input-prompt';
import CloseIcon from '../icon/close-icon';

interface MessageFeedbackProps {
  feedbackOptions: { id: number; text: string }[];
  onClose: () => void;
  msgId: string;
}

const MessageFeedback = ({
  feedbackOptions,
  onClose,
  msgId,
}: MessageFeedbackProps) => {
  const [feedback, setFeedback] = useState<string>('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fillFeedbackInput = (text: string) => {
    setFeedback(text);
  };

  const sendFeedback = async (text: string) => {
    try {
      const response = await fetch(`${apiUrl}/feedback/`, {
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
    <div className="absolute border border-border text-sm text-text rounded bg-background z-10 p-3 top-[calc(100%+12px)]">
      <div className="flex justify-between mb-3">
        <div>
          <h4>Erzählen Sie uns mehr:</h4>
        </div>
        <div className="w-6 h-6 cursor-pointer" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {feedbackOptions.map((el) => (
          <div
            className="border border-border py-1 px-2 rounded transition hoverr:text-text/80 hover:bg-background_second cursor-pointer"
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
        placeholder="Provide your feedback..."
        border={true}
        small={true}
      />
    </div>
  );
};

export default MessageFeedback;
