import { FC } from 'react';
import useChatStore from '../store/useChatStore';

const Board: FC = () => {
  const { currentUser, users } = useChatStore();

  return (
      <div
        className="grid grid-cols-1 lg:grid-cols-2 items-start gap-x-20 bg-[#F2F2F2] min-h-screen"
      >
        <div className="flex justify-center lg:justify-end items-start lg:items-center mt-5">
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-lg"
          >
            <div className="divide-y divide-gray-200">
              <div className="flex p-5">
                <div className="flex flex-col ml-5 my-auto">
                  <div className="font-medium text-lg">{currentUser?.username}</div>
                  <div className="text-green-600 text-sm">Active now</div>
                </div>
              </div>
              <div className="px-5">
                <div className="divide-y divide-gray-200">
                  {users.map(user => (
                    <div key={user.id} className="cursor-pointer flex py-3">
                      <div className="flex flex-col ml-5 my-auto">
                        <div className="font-medium text-lg">{user.username}</div>
                      </div>
                      <div className="ml-auto mr-4 my-auto">
                        <div className="bg-green-600 p-1.5 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center lg:justify-start items-start lg:items-center mt-5">
          <div
            id="chat-content"
            className="w-full max-w-md bg-white rounded-xl shadow-lg"
          >
            <div className="divide-y divide-white">
              <div className="flex p-5">
                <div className="cursor-pointer my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                  </svg>
                </div>

                <div className="flex flex-col ml-3 my-auto">
                  <div className="font-medium text-md">Roungridh Him</div>
                  <div className="text-green-600 text-sm">Active now</div>
                </div>
              </div>

              <div className="bg-[#F7F7F7] p-5 space-y-3 shadow-inner">
                <div className="flex justify-end">
                  <div className="bg-[#333333] px-3 py-2 text-white rounded-2xl rounded-br-none shadow-md">
                    Hello, Roungridh Him!
                  </div>
                </div>

                <div className="flex flex-col justify-start gap-3">
                  <div className="flex">
                    <div className="bg-white px-3 py-2 text-gray-700 rounded-2xl rounded-bl-none shadow-md">
                      Good morining, Anderson!
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-white px-3 py-2 text-gray-700 rounded-2xl rounded-bl-none shadow-md">
                      How are you doing?
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-[#333333] px-3 py-2 text-white rounded-2xl rounded-br-none shadow-md">
                    I'm fine... how about you?
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white px-3 py-2 text-gray-700 rounded-2xl rounded-bl-none shadow-md">
                    Great 😄
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-[#333333] px-3 py-2 text-white rounded-2xl rounded-br-none shadow-md">
                    This is a chat sample! You can use it <br /> with your
                    project.
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white px-3 py-2 text-gray-700 rounded-2xl rounded-bl-none shadow-md">
                    I really appreciated... ❤️
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex w-full">
                  <input
                    className="w-full outline-none border border-gray-200 px-3 py-1.5 rounded-l-md"
                    placeholder="Type message here..."
                  />
                  <button
                    type="button"
                    className="bg-[#333333] px-2.5 rounded-r-md"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#FFFFFF"
                      version="1.1"
                      id="Layer_1"
                      viewBox="796 707.122 200 200"
                      enable-background="new 796 707.122 200 200"
                      xmlSpace="preserve"
                    >
                      <path d="M798.671,800.534c-1.559,0.651-2.6,2.148-2.667,3.837s0.849,3.264,2.351,4.039l49.397,25.494l10.707,58.754  c0.312,1.707,1.608,3.066,3.3,3.457s3.453-0.262,4.481-1.66l27.193-36.976l65.524,33.817c1.226,0.633,2.679,0.646,3.916,0.037  c1.237-0.61,2.112-1.771,2.358-3.128L996,718.017L798.671,800.534z M869.045,844.893l-21.294-10.99l112.881-81.413L869.045,844.893z  " />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
  );
};

export default Board;
