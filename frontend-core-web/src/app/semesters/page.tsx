'use client';

import { useEffect, useState } from 'react';
import Sidebar from "@/layouts/sidebar";
import { Card, Typography, Table, Button, message, Modal, Upload, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Semester {
  id: string;
  name: string;
  status: number;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester: Semester | null;
  uploadType: string;
  onUpload: (file: File, semesterId: string, type: string) => Promise<void>;
}

const UploadModal = ({ isOpen, onClose, semester, uploadType, onUpload }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (info: any) => {
    if (info.file) {
      setFile(info.file.originFileObj);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      message.error('Vui lòng chọn tệp trước');
      return;
    }
    if (!semester) {
      message.error('Không có học kỳ nào được chọn');
      return;
    }

    try {
      setUploading(true);
      await onUpload(file, semester.id, uploadType);
      message.success(`Tải lên ${uploadType} thành công`);
      setFile(null);
      onClose();
    } catch (error) {
      message.error(`Lỗi khi tải lên ${uploadType}, vui lòng thử lại.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title={`Upload Excel - ${uploadType}`}
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Upload"
      cancelText="Cancel"
      confirmLoading={uploading}
      okButtonProps={{ disabled: !file }}
    >
      <h3>Học kỳ: {semester?.name}</h3>
      <Upload
        accept=".xlsx,.xls"
        showUploadList={true}
        beforeUpload={() => false}
        onChange={handleFileChange}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Chọn tệp Excel</Button>
      </Upload>
    </Modal>
  );
};

export default function SemestersPage() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [uploadType, setUploadType] = useState<string>('');

  const fetchSemesters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/semester');
      if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách học kỳ');
      }
      const data = await response.json();
      setSemesters(data);
    } catch (error) {
      console.error('Lỗi lấy danh sách học kỳ:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleUpload = async (file: File, semesterId: string, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('semesterId', semesterId);
    formData.append('type', type);

    try {
      const response = await fetch('http://localhost:5000/api/research/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      message.success(`Tải lên ${type} thành công`);
      fetchSemesters();
    } catch (error) {
      message.error(`Lỗi khi tải lên ${type}, vui lòng thử lại.`);
      throw error;
    }
  };

  const showUploadModal = (semester: Semester, type: string) => {
    if (semester.status === 2) {
      message.success("Đã upload điểm thành công");
      return;
    }
    setSelectedSemester(semester);
    setUploadType(type);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Học kỳ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 2 ? "green" : "red"}>
          {status === 2 ? "Hoàn thành" : "Chưa hoàn thành"}
        </Tag>
      ),
    },
    {
      title: 'Điểm học tập',
      key: 'academic',
      render: (_: any, record: Semester) => (
        <Button
          icon={<UploadOutlined />}
          disabled={record.status === 2}
          onClick={() => showUploadModal(record, 'Điểm học tập')}
        >
          {record.status === 2 ? "Đã tải lên" : "Upload"}
        </Button>
      ),
    },
    {
      title: 'Điểm NCKH',
      key: 'research',
      render: (_: any, record: Semester) => (
        <Button
          icon={<UploadOutlined />}
          disabled={record.status === 2}
          onClick={() => showUploadModal(record, 'Điểm NCKH')}
        >
          {record.status === 2 ? "Đã tải lên" : "Upload"}
        </Button>
      ),
    },
    {
      title: 'Điểm tham gia CLB',
      key: 'club',
      render: (_: any, record: Semester) => (
        <Button
          icon={<UploadOutlined />}
          disabled={record.status === 2}
          onClick={() => showUploadModal(record, 'Điểm tham gia CLB')}
        >
          {record.status === 2 ? "Đã tải lên" : "Upload"}
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <Card className="shadow-md">
          <Typography.Title level={2} className="mb-6">
            Học kỳ
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={semesters}
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
