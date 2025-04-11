'use client';

import { useState } from 'react';
import Sidebar from "@/layouts/sidebar";
import { Card, Typography, Table, Button, message, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useGetSemesterQuery } from '@/services/semester.service';
import type { ColumnsType } from 'antd/es/table';
import UploadModal from '@/components/UploadModal';

interface Semester {
  semester_id: string;
  number: number;
  year: number;
  status?: number;
}

export default function SemestersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [uploadType, setUploadType] = useState<string>('');

  const { data: semesterData, isLoading } = useGetSemesterQuery();

  const handleUpload = async (file: File, metadata?: Record<string, any>) => {
    const semesterId = metadata?.semesterId;
    const type = metadata?.type;

    if (!semesterId || !type) {
      message.error('Thiếu thông tin học kỳ hoặc loại upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester_id', semesterId);

    let uploadUrl = '';
    if (type === 'Điểm học tập') {
      uploadUrl = 'http://localhost:8000/file-processing/academic';
    } else if (type === 'Điểm NCKH') {
      uploadUrl = 'http://localhost:8000/file-processing/research';
    } else if (type === 'Điểm CLB'){
      uploadUrl = 'http://localhost:8000/file-processing/club';
    }else {
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

  const openUploadModal = (semester: Semester, type: string) => {
    setSelectedSemester(semester);
    setUploadType(type);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<Semester> = [
    {
      title: 'Học kỳ',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (_: any, record: Semester) => (
        <span>Kì {record.number} năm {record.year}</span>
      ),
    },
    {
      title: 'Điểm học tập',
      key: 'academic',
      align: 'center',
      render: (_: any, record: Semester) => (
        <Button
          icon={<UploadOutlined />}
          onClick={() => openUploadModal(record, 'Điểm học tập')}
        />
      ),
    },
    {
      title: 'Điểm NCKH',
      key: 'research',
      align: 'center',
      render: (_: any, record: Semester) => (
        <Button
          icon={<UploadOutlined />}
          onClick={() => openUploadModal(record, 'Điểm NCKH')}
        />
      ),
    },
    {
      title: 'Điểm CLB',
      key: 'research',
      align: 'center',
      render: (_: any, record: Semester) => (
        <Button
          icon={<UploadOutlined />}
          onClick={() => openUploadModal(record, 'Điểm CLB')}
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) => (
        <Tag color={status === 2 ? "green" : "red"}>
          {status === 2 ? "Hoàn thành" : "Chưa hoàn thành"}
        </Tag>
      ),
    },
  ];

  if (!semesterData) return <div>Đang load thông tin học kì</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <Card className="shadow-md">
          <Typography.Title level={2} className="mb-6 text-center">
            Học kỳ
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={semesterData}
            rowKey="semester_id"
            loading={isLoading}
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
