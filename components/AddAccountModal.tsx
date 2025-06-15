import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  image: FileList;
  username: string;
  password: string;
};

function AddAccountModal() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <motion.form
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[80vw] p-5 rounded"
    >
      <h2 className="text-center font-semibold text-2xl mb-4">
        Add New Account
      </h2>

      {/* File Input */}
      <div className="flex items-center justify-center w-full mb-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            {...register("image", {
              required: "Image is required",
            })}
          />
        </label>
      </div>

      {/* Username Input And Label */}
      <div className="mb-4">
        <label htmlFor="username" className="font-semibold text-xl mb-2 block">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter yuor username"
          className="w-full p-2 text-xl border-2 border-gray-300 outline-0 rounded"
          {...register("username", {
            required: "Username is required",
          })}
        />
      </div>

      {/* Password Input And Label */}
      <div className="mb-4">
        <label htmlFor="username" className="font-semibold text-xl mb-2 block">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter yuor password"
          className="w-full p-2 text-xl border-2 border-gray-300 outline-0 rounded"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </div>

      {/* Create Account Button */}
      <button
        type="submit"
        className="w-full bg-blue-800 py-2 font-semibold text-white border-0 rounded"
      >
        Create Account
      </button>
    </motion.form>
  );
}

export default AddAccountModal;
