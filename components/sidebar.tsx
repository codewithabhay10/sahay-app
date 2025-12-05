"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Central Dashboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M7.5 2.5H2.5V7.5H7.5V2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 2.5H12.5V7.5H17.5V2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 12.5H12.5V17.5H17.5V12.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 12.5H2.5V17.5H7.5V12.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/central",
    },
    {
      title: "State Overview",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2.5 7.5L10 2.5L17.5 7.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V7.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 17.5V10H12.5V17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/state/MH",
    },
    {
      title: "IA Dashboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3.33334 5.83333L10 1.66667L16.6667 5.83333V14.1667C16.6667 14.6087 16.4911 15.0326 16.1785 15.3452C15.8659 15.6577 15.442 15.8333 15 15.8333H5C4.55798 15.8333 4.13405 15.6577 3.82149 15.3452C3.50893 15.0326 3.33334 14.6087 3.33334 14.1667V5.83333Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 15.8333V10H12.5V15.8333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/ia/IA001",
    },
    {
      title: "Fund Queue",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07953 2.5 5V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V5C17.5 4.07953 16.7538 3.33333 15.8333 3.33333Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 8.33333H17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 11.6667H13.3417"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 11.6667H10.0083"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/funds/queue",
    },
    {
      title: "SNA Reconciliation",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M17.5 5.83333L10 10.8333L2.5 5.83333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18.3333V10.8333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 14.1667V5.83333L10 1.66667L2.5 5.83333V14.1667L10 18.3333L17.5 14.1667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 5.83333L10 10.8333L17.5 5.83333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/funds/sna",
    },
    {
      title: "Reports",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5.83333 2.5H14.1667C15.5 2.5 16.6667 3.66667 16.6667 5V15C16.6667 16.3333 15.5 17.5 14.1667 17.5H5.83333C4.5 17.5 3.33333 16.3333 3.33333 15V5C3.33333 3.66667 4.5 2.5 5.83333 2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66667 7.5H13.3333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66667 10.8333H13.3333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66667 14.1667H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/reports",
    },
    {
      title: "Schemes",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M16.6667 5.83333L10 10L3.33333 5.83333L10 1.66667L16.6667 5.83333Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33333 14.1667L10 18.3333L16.6667 14.1667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33333 10L10 14.1667L16.6667 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/schemes",
    },
    {
      title: "Projects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 5V15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 10H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/projects",
    },
    {
      title: "Beneficiaries",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H5C4.11595 12.5 3.2681 12.8512 2.64298 13.4763C2.01786 14.1014 1.66667 14.9493 1.66667 15.8333V17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.91667 9.16667C9.75762 9.16667 11.25 7.67428 11.25 5.83333C11.25 3.99238 9.75762 2.5 7.91667 2.5C6.07572 2.5 4.58333 3.99238 4.58333 5.83333C4.58333 7.67428 6.07572 9.16667 7.91667 9.16667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3333 17.5V15.8333C18.3328 15.0948 18.0857 14.3773 17.6319 13.7936C17.1782 13.2099 16.5431 12.7928 15.8333 12.6083"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 2.60834C14.0447 2.79192 14.6813 3.20892 15.1361 3.79302C15.5909 4.37712 15.8384 5.09578 15.8384 5.83501C15.8384 6.57423 15.5909 7.29289 15.1361 7.87699C14.6813 8.46109 14.0447 8.87809 13.3333 9.06167"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/beneficiaries",
    },
    {
      title: "Alerts",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15 6.66667L10 11.6667L5 6.66667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/alerts",
    },
    {
      title: "Settings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.1667 12.5C16.0555 12.7513 16.0235 13.0301 16.0747 13.2996C16.126 13.5692 16.2581 13.8171 16.4542 14.0083L16.5042 14.0583C16.6585 14.2124 16.7809 14.3955 16.8644 14.5969C16.9479 14.7983 16.991 15.0141 16.991 15.2321C16.991 15.45 16.9479 15.6658 16.8644 15.8672C16.7809 16.0686 16.6585 16.2517 16.5042 16.4058C16.35 16.5601 16.1669 16.6826 15.9655 16.766C15.7641 16.8495 15.5483 16.8926 15.3304 16.8926C15.1124 16.8926 14.8966 16.8495 14.6952 16.766C14.4938 16.6826 14.3107 16.5601 14.1567 16.4058L14.1067 16.3558C13.9154 16.1597 13.6675 16.0277 13.398 15.9764C13.1284 15.9252 12.8496 15.9571 12.5983 16.0683C12.3516 16.1749 12.1423 16.3527 11.9971 16.5797C11.8518 16.8068 11.7771 17.0732 11.7817 17.3442V17.5C11.7817 17.9421 11.6061 18.3659 11.2935 18.6785C10.9809 18.9911 10.5571 19.1667 10.115 19.1667C9.67294 19.1667 9.24912 18.9911 8.93656 18.6785C8.624 18.3659 8.44833 17.9421 8.44833 17.5V17.425C8.43771 17.1458 8.35114 16.8747 8.19827 16.6418C8.04541 16.4089 7.83235 16.2233 7.58167 16.105C7.33035 15.9938 7.05155 15.9618 6.78202 16.013C6.51248 16.0643 6.26458 16.1964 6.07333 16.3925L6.02333 16.4425C5.8693 16.5968 5.68619 16.7192 5.48479 16.8027C5.28339 16.8861 5.06758 16.9293 4.84963 16.9293C4.63168 16.9293 4.41587 16.8861 4.21447 16.8027C4.01307 16.7192 3.82996 16.5968 3.67593 16.4425C3.52163 16.2885 3.39918 16.1053 3.31574 15.904C3.23229 15.7026 3.18913 15.4868 3.18913 15.2688C3.18913 15.0508 3.23229 14.835 3.31574 14.6336C3.39918 14.4322 3.52163 14.2491 3.67593 14.095L3.72593 14.045C3.92204 13.8538 4.05408 13.6059 4.10531 13.3363C4.15655 13.0668 4.12461 12.788 4.01333 12.5367C3.90674 12.29 3.72891 12.0807 3.50186 11.9354C3.27482 11.7902 3.00839 11.7155 2.7375 11.72H2.58167C2.13957 11.72 1.71575 11.5444 1.40318 11.2318C1.09062 10.9192 0.915 10.4954 0.915 10.0533C0.915 9.61123 1.09062 9.18741 1.40318 8.87485C1.71575 8.56229 2.13957 8.38667 2.58167 8.38667H2.65667C2.93585 8.37605 3.20693 8.28948 3.43985 8.13661C3.67277 7.98375 3.85838 7.77069 3.97667 7.52C4.08794 7.26868 4.11989 6.98988 4.06865 6.72035C4.01741 6.45081 3.88537 6.20291 3.68927 6.01167L3.63927 5.96167C3.48497 5.80764 3.36252 5.62453 3.27908 5.42313C3.19563 5.22173 3.15247 5.00592 3.15247 4.78797C3.15247 4.57002 3.19563 4.35421 3.27908 4.15281C3.36252 3.95141 3.48497 3.76829 3.63927 3.61427C3.7933 3.45996 3.97641 3.33751 4.17781 3.25407C4.37921 3.17063 4.59502 3.12747 4.81297 3.12747C5.03092 3.12747 5.24673 3.17063 5.44813 3.25407C5.64953 3.33751 5.83264 3.45996 5.98667 3.61427L6.03667 3.66427C6.22791 3.86037 6.47581 3.99241 6.74535 4.04365C7.01488 4.09489 7.29368 4.06294 7.545 3.95167H7.58167C7.82836 3.84507 8.03766 3.66724 8.18293 3.4402C8.3282 3.21316 8.40288 2.94672 8.39833 2.67583V2.52C8.39833 2.0779 8.57395 1.65408 8.88652 1.34152C9.19908 1.02896 9.6229 0.853333 10.065 0.853333C10.5071 0.853333 10.9309 1.02896 11.2435 1.34152C11.5561 1.65408 11.7317 2.0779 11.7317 2.52V2.595C11.7362 2.86589 11.8109 3.13233 11.9562 3.35937C12.1014 3.58641 12.3107 3.76424 12.5574 3.87083C12.8087 3.98211 13.0875 4.01405 13.357 3.96281C13.6266 3.91157 13.8745 3.77953 14.0657 3.58343L14.1157 3.53343C14.2698 3.37913 14.4529 3.25668 14.6543 3.17323C14.8557 3.08979 15.0715 3.04663 15.2894 3.04663C15.5074 3.04663 15.7232 3.08979 15.9246 3.17323C16.126 3.25668 16.3091 3.37913 16.4631 3.53343C16.6174 3.68746 16.7399 3.87057 16.8233 4.07197C16.9068 4.27337 16.9499 4.48918 16.9499 4.70713C16.9499 4.92508 16.9068 5.14089 16.8233 5.34229C16.7399 5.54369 16.6174 5.7268 16.4631 5.88083L16.4131 5.93083C16.217 6.12207 16.085 6.36997 16.0337 6.63951C15.9825 6.90904 16.0144 7.18784 16.1257 7.43917V7.47583C16.2323 7.72252 16.4101 7.93182 16.6372 8.07709C16.8642 8.22236 17.1307 8.29704 17.4015 8.2925H17.5574C17.9995 8.2925 18.4233 8.46812 18.7359 8.78068C19.0484 9.09324 19.224 9.51706 19.224 9.95917C19.224 10.4013 19.0484 10.8251 18.7359 11.1377C18.4233 11.4502 17.9995 11.6258 17.5574 11.6258H17.4824C17.2115 11.6304 16.945 11.7051 16.718 11.8503C16.491 11.9956 16.3131 12.2049 16.2065 12.4517V12.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        isHovered ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {isHovered && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#EA9000] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">स</span>
            </div>
            <span className="font-bold text-xl text-[#2C3E50]">सहाय</span>
          </div>
        )}
        {!isHovered && (
          <div className="w-8 h-8 bg-[#EA9000] rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">स</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#EA9000] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${!isHovered ? "justify-center" : ""}`}
                  title={!isHovered ? item.title : ""}
                >
                  <span className={isActive ? "text-white" : "text-gray-600"}>
                    {item.icon}
                  </span>
                  {isHovered && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
            !isHovered ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 bg-[#EA9000] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">M</span>
          </div>
          {isHovered && (
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">Ministry</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
