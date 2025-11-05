import React, { useState, useMemo } from 'react';
import { Api } from '../types';
import ApiCard from './ApiCard';
import ApiDetailsPage from './ApiDetailsPage';
import { SearchIcon } from './icons';

interface ApiDirectoryPageProps {
  navigateToHome: () => void;
}

const allApis: Api[] = [
  { 
    name: 'Aadhaar e-KYC API',
    description: 'Verify user identity securely using Aadhaar number and biometrics.',
    category: 'Utilities',
    longDescription: 'The Aadhaar e-KYC API provides a secure and instant way to verify a user\'s identity. By using the Aadhaar number and biometric authentication (fingerprint or iris scan), you can retrieve demographic details like name, address, date of birth, and gender directly from the UIDAI database, ensuring authenticity and reducing fraud.',
    endpoint: 'https://api.hub.gov/v1/kyc/aadhaar',
    pricing: '₹2.50 per successful e-KYC',
    documentationUrl: '#',
    usageExample: {
      language: 'cURL',
      code: `curl -X POST \\
  https://api.hub.gov/v1/kyc/aadhaar \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "aadhaar_number": "XXXXXXXXXXXX",
    "biometric_data": "..."
  }'`
    }
  },
  { 
    name: 'DigiLocker API',
    description: 'Access and share digital documents issued by various government agencies.',
    category: 'Utilities',
    longDescription: 'Integrate with DigiLocker to allow users to access their official documents such as driving licenses, vehicle registration certificates, and academic mark sheets in a digital format. This API simplifies document verification processes and promotes a paperless ecosystem.',
    endpoint: 'https://api.hub.gov/v1/digilocker/documents',
    pricing: 'Free for limited use',
    documentationUrl: '#',
    usageExample: {
      language: 'javascript',
      code: `fetch('https://api.hub.gov/v1/digilocker/documents', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    }
  },
  { 
    name: 'Unified Payments Interface (UPI) API',
    description: 'Enable real-time, inter-bank payments and financial transactions.',
    category: 'Finance',
    longDescription: 'The UPI API allows you to integrate a powerful real-time payment system into your application. Enable users to send and receive money, pay bills, and perform other financial transactions directly from their bank accounts using a Virtual Payment Address (VPA).',
    endpoint: 'https://api.hub.gov/v1/upi/payment',
    pricing: '0.5% per transaction',
    documentationUrl: '#',
    usageExample: {
      language: 'python',
      code: `import requests

url = "https://api.hub.gov/v1/upi/payment"
payload = {
    "payee_vpa": "receiver@bank",
    "payer_vpa": "sender@bank",
    "amount": "100.00",
    "remarks": "Test payment"
}
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
    }
  },
  { 
    name: 'National Health Stack API',
    description: 'A comprehensive set of APIs for building digital health applications.',
    category: 'Health',
    longDescription: 'The National Health Stack provides foundational components for building health-tech solutions. Use this API to manage electronic health records (EHR), verify doctors, schedule appointments, and process health insurance claims in a standardized way.',
    endpoint: 'https://api.hub.gov/v1/health/records',
    pricing: 'Free',
    documentationUrl: '#',
    usageExample: {
      language: 'cURL',
      code: `curl https://api.hub.gov/v1/health/records/USER_ID \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  },
  { 
    name: 'CBSE Results API',
    description: 'Access academic results data for students from the CBSE board.',
    category: 'Education',
    longDescription: 'This API provides programmatic access to the academic results of students from the Central Board of Secondary Education (CBSE). Fetch mark sheets, grades, and other examination data for verification and integration into educational platforms.',
    endpoint: 'https://api.hub.gov/v1/education/cbse/results',
    pricing: 'Free for educational institutions',
    documentationUrl: '#',
    usageExample: {
      language: 'javascript',
      code: `async function getResult(rollNumber) {
  const response = await fetch(\`https://api.hub.gov/v1/education/cbse/results?roll=\${rollNumber}\`, {
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  });
  const data = await response.json();
  return data;
}`
    }
  },
  { 
    name: 'Vahan - Vehicle Registration API',
    description: 'Retrieve details of registered vehicles across India.',
    category: 'Transport',
    longDescription: 'The Vahan API allows you to fetch registration details of any vehicle in India using its registration number. Get information such as owner name, vehicle model, registration date, fuel type, and fitness validity for verification purposes.',
    endpoint: 'https://api.hub.gov/v1/transport/vehicle/info',
    pricing: '₹1.00 per lookup',
    documentationUrl: '#',
    usageExample: {
      language: 'cURL',
      code: `curl "https://api.hub.gov/v1/transport/vehicle/info?reg_no=DL01AB1234" \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  },
  { 
    name: 'Soil Health Card API',
    description: 'Get access to soil health data and recommendations for farmers.',
    category: 'Agriculture',
    longDescription: 'This API provides data from the Soil Health Card scheme, offering information on soil nutrient status and recommendations for fertilizer application. It helps in building applications that provide crop-specific advice to farmers, promoting sustainable agriculture.',
    endpoint: 'https://api.hub.gov/v1/agriculture/soil/report',
    pricing: 'Free',
    documentationUrl: '#',
    usageExample: {
      language: 'python',
      code: `import requests

params = {'latitude': 28.6139, 'longitude': 77.2090}
headers = {'Authorization': 'Bearer YOUR_API_KEY'}
response = requests.get('https://api.hub.gov/v1/agriculture/soil/report', params=params, headers=headers)
print(response.json())`
    }
  },
  { 
    name: 'GST Identification Number API',
    description: 'Verify GSTIN details of businesses and taxpayers.',
    category: 'Finance',
    longDescription: 'The GSTIN Verification API allows you to validate the Goods and Services Tax Identification Number of any business in India. It returns details such as the legal name of the business, registration date, and taxpayer type, which is crucial for B2B transactions and compliance.',
    endpoint: 'https://api.hub.gov/v1/finance/gstin/verify',
    pricing: '₹0.50 per verification',
    documentationUrl: '#',
    usageExample: {
      language: 'cURL',
      code: `curl "https://api.hub.gov/v1/finance/gstin/verify?gstin=22AAAAA0000A1Z5" \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  },
  { 
    name: 'e-Hospital API',
    description: 'Integrate with hospital management systems for appointments and records.',
    category: 'Health',
    longDescription: 'The e-Hospital API provides a gateway to the Online Registration System (ORS) linking various hospitals across the country. It allows developers to create applications for booking appointments, viewing lab reports, and checking blood availability in participating hospitals.',
    endpoint: 'https://api.hub.gov/v1/health/ehospital/appointment',
    pricing: 'Free',
    documentationUrl: '#',
    usageExample: {
      language: 'javascript',
      code: `fetch('https://api.hub.gov/v1/health/ehospital/appointment', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    hospital_id: 123,
    department_id: 45,
    patient_id: "P789",
    appointment_date: "2024-10-26"
  })
});`
    }
  },
];

const categories = ['All', 'Health', 'Finance', 'Education', 'Transport', 'Agriculture', 'Utilities'];

const ApiDirectoryPage: React.FC<ApiDirectoryPageProps> = ({ navigateToHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);

  const filteredApis = useMemo(() => {
    return allApis.filter(api => {
      const matchesCategory = selectedCategory === 'All' || api.category === selectedCategory;
      const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            api.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);
  
  const handleViewDetails = (api: Api) => {
    setSelectedApi(api);
    window.scrollTo(0, 0);
  };
  
  const handleBackToDirectory = () => {
    setSelectedApi(null);
  };

  if (selectedApi) {
    return <ApiDetailsPage api={selectedApi} onBack={handleBackToDirectory} />;
  }


  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-api-blue">API Directory</h1>
          <p className="text-gray-600 mt-1">Discover and integrate with our comprehensive suite of APIs.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-[88px] z-30 bg-gray-50/80 backdrop-blur-md py-4 mb-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="search"
                placeholder="Search APIs by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-api-blue"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-api-blue h-full"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        {filteredApis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApis.map(api => (
              <ApiCard key={api.name} api={api} onViewDetails={() => handleViewDetails(api)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">No APIs Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
      
      <div className="text-center py-8">
        <button 
          onClick={navigateToHome} 
          className="text-api-blue hover:underline font-semibold"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default ApiDirectoryPage;