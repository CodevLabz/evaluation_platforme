'use client'
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
const participantData = [
  {
    name: "Jan",
    count: 40,
  },
  {
    name: "Feb",
    count: 30,
  },
  {
    name: "Mar",
    count: 45,
  },
  {
    name: "Apr",
    count: 50,
  },
  {
    name: "May",
    count: 65,
  },
];
const salleData = [
  {
    name: "Salle 1",
    value: 30,
  },
  {
    name: "Salle 2",
    value: 25,
  },
  {
    name: "Salle 3",
    value: 35,
  },
  {
    name: "Salle 4",
    value: 20,
  },
];
const paymentStatusData = [
  {
    name: "Paid",
    value: 65,
  },
  {
    name: "Pending",
    value: 25,
  },
  {
    name: "Failed",
    value: 10,
  },
];
const certificateStatusData = [
  {
    name: "Generated",
    value: 45,
  },
  {
    name: "Pending",
    value: 55,
  },
];
const categoryData = [
  {
    name: "Student",
    value: 120,
  },
  {
    name: "Teacher",
    value: 45,
  },
  {
    name: "Professional",
    value: 75,
  },
  {
    name: "Other",
    value: 25,
  },
];
const scanData = [
  {
    name: "Mon",
    scans: 24,
  },
  {
    name: "Tue",
    scans: 30,
  },
  {
    name: "Wed",
    scans: 45,
  },
  {
    name: "Thu",
    scans: 35,
  },
  {
    name: "Fri",
    scans: 28,
  },
  {
    name: "Sat",
    scans: 15,
  },
  {
    name: "Sun",
    scans: 20,
  },
];
const attendanceData = [
  {
    name: "1 Session",
    value: 150,
  },
  {
    name: "2 Sessions",
    value: 100,
  },
  {
    name: "3+ Sessions",
    value: 50,
  },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export default function Statistics ()  {
  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800">Platform Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Registration</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <BarChart data={participantData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1a365d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
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
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
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
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weekly Scan Activity</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <LineChart data={scanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="scans"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Attendance Distribution
          </h3>
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
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
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Certificate Status</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={certificateStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {certificateStatusData.map((entry, index) => (
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
    </div>
  );
};
