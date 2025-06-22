import { CircleX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

type ChangeAccountModalProps = {
  setChangeAccount: Dispatch<SetStateAction<boolean>>;
};

type FormType = {
  password: string;
};

function ChangeAccountModal({ setChangeAccount }: ChangeAccountModalProps) {
  const { register, handleSubmit, formState } = useForm<FormType>();
  const { errors } = formState;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white w-[70%] z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-2xl"
    >
      {/* Close Modal Button */}
      <CircleX
        className="absolute right-2 top-2 text-red-700 cursor-pointer"
        onClick={() => setChangeAccount(false)}
      />
      {/* Modal Heading */}
      <h2 className="text-center text-2xl font-medium uppercase">
        Change Account
      </h2>

      {/* Modal Form Label */}
      <label htmlFor="username" className="font-semibold text-xl mb-2 block">
        Password
      </label>

      {/* Modal Form Input */}
      <input
        type="password"
        placeholder="Enter yuor password"
        className="w-full p-2 text-xl border-2 border-gray-300 outline-0 rounded"
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors.password && (
        <p className="text-red-800 font-semibold">{errors.password.message}</p>
      )}

      {/* Modal Send Button */}
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-800 py-2 font-semibold text-white border-0 rounded mt-3 cursor-pointer"
      >
        Change Account
      </button>
    </motion.div>
  );
}

export default ChangeAccountModal;
