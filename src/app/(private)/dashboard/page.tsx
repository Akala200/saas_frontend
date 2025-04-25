// app/dashboard/page.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const mockContentData = [
  { name: "Article A", views: 120 },
  { name: "Article B", views: 90 },
  { name: "Video C", views: 160 },
  { name: "Image D", views: 70 },
];

const mockEngagementData = [
  { date: "Apr 1", engagement: 30 },
  { date: "Apr 2", engagement: 50 },
  { date: "Apr 3", engagement: 40 },
  { date: "Apr 4", engagement: 60 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* KPIs Overview */}
      <Card className="col-span-1 xl:col-span-3">
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          <KPI label="Total Content" value="128" />
          <KPI label="Active Users" value="342" />
          <KPI label="Engagement Rate" value="64%" />
          <KPI label="Rec Accuracy" value="87%" />
        </CardContent>
      </Card>

      {/* Content Performance Chart */}
      <Card>
        <CardContent className="py-4">
          <h3 className="text-lg font-medium mb-4">Top Performing Content</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockContentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement Over Time */}
      <Card>
        <CardContent className="py-4">
          <h3 className="text-lg font-medium mb-4">User Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockEngagementData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Manage Content Card */}
      <Card>
        <CardContent className="flex flex-col justify-between h-full py-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Manage Content</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Add, update, or remove content items.
            </p>
          </div>
          <Button className="w-full">Go to Content Manager</Button>
        </CardContent>
      </Card>

      {/* Recommendations Preview */}
      <Card>
        <CardContent className="py-6">
          <h3 className="text-lg font-medium mb-2">AI Recommendations Preview</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>"Try this new article on productivity"</li>
            <li>"Based on your interest in tech, check this out"</li>
            <li>"Users like you also enjoyed..."</li>
          </ul>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      <Card>
        <CardContent className="py-6">
          <h3 className="text-lg font-medium mb-2">AI Model Insights</h3>
          <p className="text-sm text-muted-foreground">Last trained: 2 days ago</p>
          <p className="text-sm text-muted-foreground">Accuracy: 87%</p>
          <Button className="mt-4 w-full">Retrain Model</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
