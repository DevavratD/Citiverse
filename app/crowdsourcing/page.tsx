"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function CrowdFunding() {
  const [goal] = useState("50000");
  const [deadline] = useState(Date.now() + 3 * 86400000);
  const [amountRaised] = useState("12340");
  const [contributionsHistory] = useState([
    { time: "09:00", amount: 1000 },
    { time: "12:30", amount: 500 },
    { time: "15:45", amount: 840 },
  ]);

  const progress = (Number(amountRaised) / Number(goal)) * 100;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Community Funding</h2>
          <p className="text-muted-foreground">Support blockchain-powered urban projects</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Smart City Infrastructure Fund</CardTitle>
            <CardDescription>Goal: ₹{goal} | Deadline: {new Date(deadline).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-grey p-4 rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-muted-foreground">Raised</span>
                <span className="text-sm font-semibold text-blue-600">₹{`${amountRaised}/${goal}`}</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
              </Progress>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="h-12 bg-green-600 hover:bg-green-700 text-white"
              >
                Contribute ₹1,000
              </Button>
              <Button 
                className="h-12 bg-red-600 hover:bg-red-700 text-white"
              >
                Request Refund
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contributions</CardTitle>
            <CardDescription>Last 24 hours activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={contributionsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="time" stroke="#334155" />
                <YAxis stroke="#334155" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Blockchain Verification</CardTitle>
            <CardDescription>Immutable transaction records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Network</span>
                <span className="text-sm font-semibold text-purple-500">UPI Payment Gateway</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Status</span>
                <span className="text-sm font-semibold text-green-500">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
