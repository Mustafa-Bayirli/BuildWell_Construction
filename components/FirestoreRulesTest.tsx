// components/FirestoreRulesTest.tsx
'use client';

import React, { useState } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';


const FirestoreRulesTest = () => {
  const { user, isAdmin } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const runTests = async () => {
    setTesting(true);
    setTestResults([]);

    try {
      // Test 1: Public read access
      addResult('🧪 Testing public read access...');
      const projects = await getDocs(collection(db, 'projects'));
      addResult(`✅ Public read: SUCCESS (found ${projects.size} projects)`);

      if (!user) {
        addResult('❌ Not authenticated - stopping tests');
        return;
      }

      // Test 2: Valid project creation (admin only)
      addResult('🧪 Testing valid project creation...');
      const validProject = {
        title: 'Test Project',
        description: 'Test description for validation',
        location: 'Test Location',
        category: 'Interior Remodeling',
        featured: false,
        completedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        images: ['https://example.com/test.jpg']
      };

      const docRef = await addDoc(collection(db, 'projects'), validProject);
      addResult(`✅ Valid project creation: SUCCESS (ID: ${docRef.id})`);

      // Test 3: Try to create invalid project (should fail validation)
      addResult('🧪 Testing invalid project creation...');
      try {
        await addDoc(collection(db, 'projects'), {
          title: '', // Invalid: empty title
          description: 'Test',
          // Missing required fields
        });
        addResult('❌ Invalid project creation: SHOULD HAVE FAILED');
      } catch (error) {
        addResult('✅ Invalid project creation: CORRECTLY BLOCKED');
      }

      // Test 4: Update project
      addResult('🧪 Testing project update...');
      await updateDoc(doc(db, 'projects', docRef.id), {
        title: 'Updated Test Project',
        updatedAt: new Date()
      });
      addResult('✅ Project update: SUCCESS');

      // Test 5: Delete project
      addResult('🧪 Testing project deletion...');
      await deleteDoc(doc(db, 'projects', docRef.id));
      addResult('✅ Project deletion: SUCCESS');

    } catch (error) {
      addResult(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">🔧 Firestore Rules Test</h2>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Current Auth Status:</h3>
          <p>User: {user ? user.email : 'Not logged in'}</p>
          <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
        </div>

        <button
          onClick={runTests}
          disabled={testing}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {testing ? 'Running Tests...' : 'Run Firestore Rules Tests'}
        </button>

        {testResults.length > 0 && (
          <div className="bg-white dark:bg-gray-700 p-4 rounded">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1 text-sm font-mono">
              {testResults.map((result, index) => (
                <div key={index} className={
                  result.includes('✅') ? 'text-green-600' :
                  result.includes('❌') ? 'text-red-600' :
                  result.includes('🧪') ? 'text-blue-600' :
                  'text-gray-600'
                }>
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirestoreRulesTest;