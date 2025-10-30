import { useState, useEffect } from 'react';
import DocumentTable from '../../components/admin/DocumentTable';
import UploadModal from '../../components/admin/UploadModal';
import { documentsAPI } from '../../services/apis';


function Dashboard() {
    // States
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Fetch documents on mount
    useEffect(() => {
        fetchDocuments();
    }, []);

    // API Functions
    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const result = await documentsAPI.getList();

            if (result.success) {
                // Transform backend data to match DocumentTable format
                const transformedDocs = (result.documents || []).map(doc => {
                    // Extract file extension from title
                    const fileExt = doc.title.split('.').pop().toUpperCase();

                    return {
                        id: doc.doc_id,
                        filename: doc.title,
                        type: fileExt,
                        upload_date: new Date(doc.created_at).toLocaleDateString('th-TH'),
                        size: `${doc.chunks} chunks`,
                        // Keep original data for reference
                        _original: doc
                    };
                });

                setDocuments(transformedDocs);
            } else {
                console.error('Failed to fetch documents:', result.error);
                alert('ไม่สามารถโหลดรายการเอกสารได้');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
            alert('เกิดข้อผิดพลาดในการโหลดเอกสาร');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (files) => {
        try {
            const result = await documentsAPI.upload(files);
            console.log('Upload result:', result);

            // Refresh document list
            await fetchDocuments();

            return result;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleDelete = async (docId) => {
        // Confirmation dialog
        try {
            const result = await documentsAPI.delete(docId);

            if (result.success) {
                alert('ลบเอกสารสำเร็จ!');
                await fetchDocuments();
            } else {
                alert(`ลบเอกสารไม่สำเร็จ: ${result.error}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('เกิดข้อผิดพลาดในการลบเอกสาร');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Action Bar */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Document Management</h2>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        ➕ Upload Document
                    </button>
                </div>

                {/* Document Table */}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <DocumentTable
                        documents={documents}
                        onDelete={handleDelete}
                    />
                )}

                {/* Upload Modal */}
                {showUploadModal && (
                    <UploadModal
                        onClose={() => setShowUploadModal(false)}
                        onUpload={handleUpload}
                    />
                )}
            </main>
        </div>
    );
}

export default Dashboard;