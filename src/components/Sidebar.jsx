import React from "react";
import { MessageCircle, MessageSquare } from "lucide-react";

const Sidebar = ({ height }) => {
  return (
    <aside
      className="w-80 bg-white shadow-xl flex flex-col items-center p-6 overflow-y-auto"
      style={{ height: height }}
    >
      {/* Card */}
      <div className="mt-4 w-full bg-[#F5F7FA] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-tr from-[#2D5BE3] to-[#6B8CFF] flex items-center justify-center text-white">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#212529]">Live Chat</h3>
          <p className="text-sm text-[#6C757D] mt-1">
            Add live chat to your website
          </p>
        </div>
      </div>

      {/* Section below card */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-[#212529]">
          Monitor and chat with the visitors on your website
        </h2>
        <p className="text-sm text-[#6C757D] mt-2 max-w-[250px]">
          Let's get you setup with the basics, so that you can instantly see the
          visitors on your website, and get the widget installed. <br />
          <br />
          Don't worry, there are many more advanced features (all free) which
          can be customized in the administration area after initial setup.
          <br /> <br />
          If you get stuck, initiate a chat below:
        </p>

        <div className="">
          <button className="mt-4 px-6 py-2 rounded-full bg-[#2D5BE3] text-white font-medium shadow hover:brightness-95 transition flex items-center gap-2">
            Chat Us
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
