'use client';
import React, { useEffect, useState, useRef } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  Activity,
  DollarSign,
  FileCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
const participantTrend = [
  {
    name: "Mon",
    count: 20,
  },
  {
    name: "Tue",
    count: 25,
  },
  {
    name: "Wed",
    count: 30,
  },
  {
    name: "Thu",
    count: 22,
  },
  {
    name: "Fri",
    count: 28,
  },
  {
    name: "Sat",
    count: 15,
  },
  {
    name: "Sun",
    count: 18,
  },
];
const paymentStatus = [
  {
    name: "Paid",
    value: 65,
  },
  {
    name: "Pending",
    value: 25,
  },
  {
    name: "Not Started",
    value: 10,
  },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export default function Dashboard (){
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <p className="text-xl sm:text-2xl font-semibold">245</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-green-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Payments Received</p>
              <p className="text-xl sm:text-2xl font-semibold">182</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <FileCheck className="text-purple-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Certificates Generated</p>
              <p className="text-xl sm:text-2xl font-semibold">156</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" ref={containerRef}>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            Weekly Participant Trend
          </h3>
          <div
            className="w-full"
            style={{
              height: "300px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={participantTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1a365d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Payment Distribution</h3>
          <div
            className="w-full"
            style={{
              height: "300px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[
              {
                action: "Payment Confirmed",
                participant: "John Doe",
                time: "2 minutes ago",
                status: "success",
              },
              {
                action: "Certificate Generated",
                participant: "Jane Smith",
                time: "5 minutes ago",
                status: "info",
              },
              {
                action: "New Registration",
                participant: "Mike Johnson",
                time: "10 minutes ago",
                status: "warning",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-green-500" : item.status === "info" ? "bg-blue-500" : "bg-yellow-500"}`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">
                      {item.action} - {item.participant}
                    </p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
