'use client';

import { useEffect, useState } from 'react';
import Sidebar from "@/layouts/sidebar";
import { Card, Typography, Table, Tag } from 'antd';
import dayjs from 'dayjs';

interface Event {
  id: string;
  name: string;
  organizingUnit: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Organizing Unit',
      dataIndex: 'organizingUnit',
      key: 'organizingUnit',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => dayjs(text).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => dayjs(text).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <Tag color={String(status) === 'active' ? 'green' : 'red'}>
          {String(status || 'UNKNOWN').toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <Card className="shadow-md">
          <Typography.Title level={2} className="mb-6">
            Events
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={events}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </div>
  );
}
