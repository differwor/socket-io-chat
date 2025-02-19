import { FC } from 'react';
import useChatStore from '../store/useChatStore';

const Login: FC = () => {
  const { login } = useChatStore();

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    if (username) {
      sessionStorage.setItem('currentUser', username);
      login(username);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <form action={handleSubmit} className="relative w-full max-w-xs">
        <input
          name="username"
          className="shadow-lg shadow-slate-200 peer transition-all px-5 py-3 w-full text-lg rounded-md border border-gray-200 outline-none select-all"
          type="text"
          placeholder=""
        />
        <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
          Enter your username
        </label>
      </form>
    </div>
  );
};

export default Login;
