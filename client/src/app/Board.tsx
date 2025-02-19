import { FC, useEffect } from 'react';
import useChatStore from '../store/useChatStore';
import { chatService } from '../services/chatService';
import { useScrollToBottom } from '../hooks/useScrollToBottom';

const Board: FC = () => {
  const {
    currentUser,
    users,
    sendMessage,
    receiver,
    setReceiver,
    setMessages,
    messages,
  } = useChatStore();
  const containerRef = useScrollToBottom(messages);

  const handleSubmitMessage = (formData: FormData) => {
    const newMessage = formData.get('message') as string;
    if (newMessage) {
      sendMessage(newMessage);
    }
  };

  useEffect(() => {
    if (!receiver || !currentUser) return;
    const fetchChatHistory = async () => {
      try {
        const res = await chatService.fetchMessages(
          currentUser.id as string,
          receiver.id
        );
        if (res.length) {
          setMessages(res);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    fetchChatHistory();
  }, [receiver]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-x-2 bg-[#F2F2F2] min-h-screen">
      <div className="flex justify-center lg:justify-end items-start lg:items-center py-2">
        <div
          className={`w-full max-w-md bg-white rounded-xl shadow-lg ${
            !receiver && 'lg:translate-x-1/2'
          }`}
        >
          <div className="divide-y divide-gray-200">
            <div className="flex p-5">
              <div className="flex flex-col ml-5 my-auto">
                <div className="font-medium text-lg">
                  {currentUser?.username}
                </div>
                <div className="text-green-600 text-sm">Active now</div>
              </div>
            </div>
            <div className="px-5">
              <div className="divide-y divide-gray-200">
                {users.length ? (
                  users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setReceiver(user)}
                      className="cursor-pointer flex py-3"
                    >
                      <div className="flex flex-col ml-5 my-auto">
                        <div className="font-medium text-lg">
                          {user.username}
                        </div>
                      </div>
                      <div className="ml-auto mr-4 my-auto">
                        <div className="bg-green-600 p-1.5 rounded-full"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center p-5 text-gray-400">
                    No users online!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {receiver && (
        <div className="flex justify-center lg:justify-start items-start lg:items-center h-screen py-2">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg h-full">
            <div className="divide-y divide-white flex flex-col h-full">
              <div className="flex p-5">
                <div
                  onClick={() => setReceiver(null)}
                  className="cursor-pointer my-auto"
                  aria-label="close chat"
                >
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="16px"
                    height="16px"
                    viewBox="0 0 121.31 122.876"
                    enableBackground="new 0 0 121.31 122.876"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col ml-3 my-auto">
                  <div className="font-medium text-md">{receiver.username}</div>
                  <div className="text-green-600 text-sm">Active now</div>
                </div>
              </div>
              <div
                ref={containerRef}
                className="bg-[#F7F7F7] p-5 space-y-2 shadow-inner flex-grow overflow-auto"
              >
                {messages.map((data) =>
                  receiver.id === data.receiver.id ? (
                    <div key={data.id} className="flex justify-end">
                      <div className="bg-[#333333] px-3 py-2 text-white rounded-2xl rounded-br-none shadow-md max-w-[75%]">
                        {data.message}
                      </div>
                    </div>
                  ) : (
                    <div key={data.id} className="flex justify-start">
                      <div className="bg-white px-3 py-2 text-gray-700 rounded-2xl rounded-bl-none shadow-md max-w-[75%]">
                        {data.message}
                      </div>
                    </div>
                  )
                )}
              </div>
              <form action={handleSubmitMessage} className="p-5">
                <div className="flex w-full">
                  <input
                    name="message"
                    className="w-full outline-none border border-gray-200 px-3 py-1.5 rounded-l-md"
                    placeholder="Type message here..."
                    aria-label="type message"
                  />
                  <button
                    type="submit"
                    className="bg-[#333333] px-2.5 rounded-r-md"
                    aria-label="send message"
                    data-testid="submit-message"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#FFFFFF"
                      version="1.1"
                      id="Layer_1"
                      viewBox="796 707.122 200 200"
                      enableBackground="new 796 707.122 200 200"
                      xmlSpace="preserve"
                    >
                      <path d="M798.671,800.534c-1.559,0.651-2.6,2.148-2.667,3.837s0.849,3.264,2.351,4.039l49.397,25.494l10.707,58.754  c0.312,1.707,1.608,3.066,3.3,3.457s3.453-0.262,4.481-1.66l27.193-36.976l65.524,33.817c1.226,0.633,2.679,0.646,3.916,0.037  c1.237-0.61,2.112-1.771,2.358-3.128L996,718.017L798.671,800.534z M869.045,844.893l-21.294-10.99l112.881-81.413L869.045,844.893z  " />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
