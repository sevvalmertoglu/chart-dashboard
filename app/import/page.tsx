'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import Link from 'next/link';

export default function ImportPage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const text = await file.text();
      const result = Papa.parse(text, { header: true });

      const response = await fetch('/api/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: result.data }),
      });

      if (!response.ok) {
        throw new Error('Veri yükleme başarısız oldu');
      }

      setSuccess('Veriler başarıyla yüklendi!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CSV Veri İçe Aktarma</h1>
        <Link 
          href="/" 
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Dashboard&apos;a Dön
        </Link>
      </div>

      <div
        {...getRootProps()}
        className={`
          p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          hover:border-blue-500 hover:bg-blue-50 transition-colors
        `}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-gray-600">Yükleniyor...</p>
        ) : isDragActive ? (
          <p className="text-blue-500">Dosyayı buraya bırakın</p>
        ) : (
          <p className="text-gray-500">
            CSV dosyasını sürükleyip bırakın veya seçmek için tıklayın
          </p>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">CSV Formatı</h2>
        <p className="text-gray-600 mb-2">CSV dosyanız aşağıdaki sütunları içermelidir:</p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>date (YYYY-MM-DD formatında)</li>
          <li>sales_amount (sayısal değer)</li>
          <li>profit (sayısal değer)</li>
          <li>fuelType (Diesel, Ad Blue, Super E5, Super E10)</li>
          <li>tankId (metin)</li>
          <li>malfunctionCount (sayısal değer)</li>
          <li>fill_rate (0-100 arası sayısal değer)</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-medium mb-2">Örnek CSV içeriği:</h3>
          <pre className="text-sm text-gray-700 overflow-x-auto">
            date,sales_amount,profit,fuelType,tankId,malfunctionCount,fill_rate
            2024-03-27,1000.50,150.75,Diesel,Tank1,0,75
            2024-03-27,500.25,75.50,Ad Blue,Tank2,1,45
            2024-03-27,750.00,112.50,Super E5,Tank3,0,60
            2024-03-27,1250.75,187.60,Super E10,Tank4,2,85
          </pre>
        </div>
      </div>
    </div>
  );
} 