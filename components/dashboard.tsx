"use client";
import Header from "./header";
import { FaPlus, FaClock } from "react-icons/fa6";
import { BiRefresh } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import JsonData from "@/data/data.json";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toogle } from "@/redux/slices/sideNav";

// Register the components needed for the doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Conected", "Not Conected"],
  datasets: [
    {
      label: "Votes",
      data: [2, 2],
      backgroundColor: ["#d8ddf7", "#8093f4"],
      borderColor: ["#d8ddf7", "#8093f4"],
      borderWidth: 0,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  //   maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "right", // Positions the legend inside the chart, to the right side
      align: "center", // Aligns the legend to the center of the chart
      labels: {
        usePointStyle: true, // Use point styles instead of full rectangles
        padding: 12, // Adjust the padding around the legend
      },
    },
    title: {
      display: true,
      text: "Votes Distribution",
    },
  },
  layout: {
    padding: {
      bottom: 50,
      right: 0,
      left: 0,
    },
  },
};

export default function Dashboard() {
  const { categories } = useAppSelector((state) => state.widgetData);
  const dispatch = useAppDispatch();
  // const [widgetData, setWidgetData] = useState([...categories]);
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Dashboard section  */}
      <div className="bg-blue-50 md:px-16 px-4 md:py-10 py-6">
        {/* top header  */}
        <TopHeader />

        <div className="mt-6 space-y-8">
          {categories.map((item, index) => (
            <div className="space-y-3" key={item.id}>
              <h2 className="font-bold text-sm">{item.name}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {item.widgets.map(
                  (item) =>
                    item.isShow && <WidgetCard key={item.id} {...item} />
                )}

                <div className="bg-white p-4 rounded-lg space-y-2 h-[240px] flex justify-center items-center shadow-lg">
                  <div
                    className="flex gap-2 items-center border px-3 py-2 rounded-sm shadow-md cursor-pointer text-sm"
                    onClick={() => dispatch(toogle(index))}
                  >
                    <FaPlus /> Add Widget
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const TopHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      {/* cnapp dashboard and add widget top section */}
      <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">CNAPP Dashboard</h2>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 text-xs border shadow-md bg-white p-2 rounded-sm cursor-pointer text-gray-500"
            onClick={() => {
              dispatch(toogle(0));
            }}
          >
            Add Widget <FaPlus size={12} />
          </div>

          <div className="text-gray-500 rounded-md bg-white p-2 shadow-md">
            <BiRefresh size={16} />
          </div>

          <div className="text-gray-500 rounded-md bg-white p-2 shadow-md">
            <BsThreeDotsVertical size={16} />
          </div>

          <div className="flex items-center border border-blue-900 py-2 px-1 text-sm text-blue-950 rounded-sm shadow-md">
            <div className="border-r border-r-blue-950 pr-1">
              <FaClock size={14} />
            </div>
            <select name="" id="" className="text-xs font-medium outline-none">
              <option value="">Last 2 Days</option>
              <option value="">Last 7 Days</option>
              <option value="">Last Month</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WidgetCard = ({ name, text }: { name: string; text: string }) => {
  return (
    <div className="bg-white p-4 rounded-lg space-y-2 h-[240px] shadow-lg">
      <div>
        <h2 className="font-bold text-sm">{name}</h2>
      </div>

      <div className="w-full h-full overflow-hidden">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
