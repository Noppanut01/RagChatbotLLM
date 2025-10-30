import { useState } from 'react';

function UploadModal({ onClose, onUpload }) {
    // 1. เปลี่ยนจาก single file → array
    const [selectedFiles, setSelectedFiles] = useState([]); // เปลี่ยนจาก null เป็น []
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // 2. แก้ handleFileChange
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // แปลงเป็น array

        // Validation แบบง่ายๆ
        const validFiles = files.filter(file => {
            const allowedTypes = ['application/pdf', 'text/plain',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const isValidType = allowedTypes.includes(file.type);
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

            return isValidType && isValidSize;
        });

        if (validFiles.length !== files.length) {
            setError('บางไฟล์ไม่ถูกต้อง (ต้องเป็น PDF/TXT/DOCX และไม่เกิน 10MB)');
        } else {
            setError('');
        }

        setSelectedFiles(validFiles);
    };

    // Upload all files at once
    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        setError('');

        try {
            // Upload all files as array
            await onUpload(selectedFiles);

            alert(`อัปโหลดสำเร็จ ${selectedFiles.length} ไฟล์!`);
            onClose();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.detail || 'อัปโหลดไม่สำเร็จ กรุณาลองใหม่');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Upload Documents</h3>
                    <button onClick={onClose} className="text-gray-500">✕</button>
                </div>

                {/* File Input - เพิ่ม multiple */}
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.txt,.docx"
                        multiple
                        className="w-full"
                        disabled={uploading}
                    />
                </div>

                {/* แสดงรายการไฟล์ที่เลือก */}
                {selectedFiles.length > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium mb-2">
                            เลือกไฟล์: {selectedFiles.length} ไฟล์
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            {selectedFiles.map((file, index) => (
                                <li key={index}>• {file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Info */}
                <div className="mb-4 text-sm text-gray-500">
                    <p>รองรับเฉพาะไฟล์ PDF, TXT, DOCX</p>
                    <p>ขนาดสูงสุดไม่เกิน 10MB ต่อไฟล์</p>

                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={uploading}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={selectedFiles.length === 0 || uploading}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {uploading ? 'กำลังอัปโหลด...' : `Upload ${selectedFiles.length} ไฟล์`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadModal;