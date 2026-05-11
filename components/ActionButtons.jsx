import Link from "next/link";

const ActionButtons = ({ formDetails }) => {
  return (
    <div className={`w-full flex gap-4 mt-4 ${formDetails && "flex-1"}`}>
      <button className="w-full bg-indigo-600 hover:bg-indigo-800">
        Interested
      </button>

      <Link
        href="/payment"
        className="w-full text-center bg-[#464849] py-2 px-2 rounded-md border border-[#5f5f5f]/50 shadow-sm cursor-pointer hover:bg-[#3c3d3d] transition-colors active:translate-y-1"
      >
        Going
      </Link>
    </div>
  );
};

export default ActionButtons;
