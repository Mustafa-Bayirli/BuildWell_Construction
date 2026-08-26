// components/DebugStorage.tsx
'use client';

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Update the import path if needed, for example:
// import { storage } from '../../lib/firebase-client';
import { storage } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
const DebugStorage = () => {
  const { user, isAdmin } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const testUpload = async () => {
    setUploading(true);
    setTestResult('Testing...');

    try {
      // Create a simple test file
      const testFile = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
      
      // Test upload to the same path that's failing
      const testPath = 'projects/temp/test-debug-file.txt';
      const storageRef = ref(storage, testPath);
      
      console.log('🔍 Debug Info:');
      console.log('User:', user);
      console.log('User email:', user?.email);
      console.log('Is admin:', isAdmin);
      console.log('Upload path:', testPath);
      console.log('Storage ref:', storageRef);
      
      const snapshot = await uploadBytes(storageRef, testFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setTestResult(`✅ SUCCESS! File uploaded to: ${downloadURL}`);
    } catch (error) {
      console.error('❌ Upload failed:', error);
      setTestResult(`❌ FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const checkAuthToken = async () => {
    if (!user) {
      setTestResult('❌ No user logged in');
      return;
    }

    try {
      const token = await user.getIdTokenResult();
      console.log('🔍 Auth Token Debug:');
      console.log('Full token:', token);
      console.log('Claims:', token.claims);
      console.log('Email in token:', token.claims.email);
      
      setTestResult(`
        ✅ Auth Token Info:
        - Email: ${token.claims.email}
        - Admin check: ${token.claims.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL}
        - Expected email: ${process.env.NEXT_PUBLIC_ADMIN_EMAIL}
      `);
    } catch (error) {
      setTestResult(`❌ Token error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">🔧 Storage & Auth Debug</h2>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Current Auth Status:</h3>
          <p>User: {user ? user.email : 'Not logged in'}</p>
          <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
          <p>Expected Admin Email: {process.env.NEXT_PUBLIC_ADMIN_EMAIL}</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={checkAuthToken}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Check Auth Token
          </button>
          
          <button
            onClick={testUpload}
            disabled={uploading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {uploading ? 'Testing Upload...' : 'Test Upload'}
          </button>
        </div>

        {testResult && (
          <div className="bg-white dark:bg-gray-700 p-4 rounded">
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugStorage;