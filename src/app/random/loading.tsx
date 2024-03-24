import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
      }}
      className="flex w-screen items-center justify-center"
    >
      <AiOutlineLoading3Quarters className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}
