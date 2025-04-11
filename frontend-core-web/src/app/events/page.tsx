'use client';

import { useEffect, useState } from 'react';
import Sidebar from "@/layouts/sidebar";
import dayjs from 'dayjs';
import { Card, Typography, Table, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UploadModal from '@/components/UploadModal';

interface Semester {
  semester_id: string;
  number: number;
  year: number;
}

interface Event {
  id: string;
  name: string;
  organizing_unit: string;
  start_time: string;
  end_time: string;
  location: string;
  semester_id: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [uploadType, setUploadType] = useState<string>('');

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

  const handleUpload = async (file: File, metadata?: Record<string, any>) => {
    const semesterId = metadata?.semesterId;
    const type = metadata?.type;
    console.log(semesterId)
    if (!semesterId || !type) {
      message.error('Thiếu thông tin học kỳ hoặc loại upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester_id', semesterId);

    let uploadUrl = '';
    if (type === 'Điểm sự kiện') {
      uploadUrl = 'http://localhost:8000/file-processing/event';
    } else {
      message.error('Không xác định được loại upload');
      return;
    }

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      message.success(`Tải lên ${type} thành công`);
    } catch (error) {
      message.error(`Lỗi khi tải lên ${type}, vui lòng thử lại.`);
      throw error;
    }
  };

  const openUploadModal = (semesterId: string, type: string) => {
    setSelectedSemester({ semester_id: semesterId, number: 0, year: 0 });
    setUploadType(type);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn vị tổ chức',
      dataIndex: 'organizing_unit',
      key: 'organizing_unit',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (text: string) => dayjs(text).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (text: string) => dayjs(text).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Danh sách tổ chức',
      key: 'eventScore',
      align: 'center' as const,
      render: (_: any, record: Event) => (
        <Button
          icon={<UploadOutlined />}
          onClick={() => openUploadModal(record.semester_id, 'Điểm sự kiện')}
        />
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

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSemester(null);
        }}
        semester={selectedSemester}
        uploadType={uploadType}
        onUpload={handleUpload}
      />
    </div>
  );
}
