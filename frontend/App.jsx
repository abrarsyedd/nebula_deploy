import React, { useState, useEffect } from 'react';
import { 
  Rocket, Server, Cloud, Shield, Activity, Menu, X, 
  Github, Database, Code, CheckCircle, AlertCircle, ChevronRight 
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Logic
  const navigate = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
              <Rocket className="h-8 w-8 text-blue-400 mr-2" />
              <span className="font-bold text-xl tracking-wider">NebulaDeploy</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem title="Home" onClick={() => navigate('home')} active={currentPage === 'home'} />
                <NavItem title="Services" onClick={() => navigate('services')} active={currentPage === 'services'} />
                <NavItem title="Infrastructure" onClick={() => navigate('infrastructure')} active={currentPage === 'infrastructure'} />
                <NavItem title="System Status" onClick={() => navigate('status')} active={currentPage === 'status'} />
                <NavItem title="Contact" onClick={() => navigate('contact')} active={currentPage === 'contact'} />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 pb-3 pt-2">
            <div className="px-2 space-y-1 sm:px-3">
              <MobileNavItem title="Home" onClick={() => navigate('home')} active={currentPage === 'home'} />
              <MobileNavItem title="Services" onClick={() => navigate('services')} active={currentPage === 'services'} />
              <MobileNavItem title="Infrastructure" onClick={() => navigate('infrastructure')} active={currentPage === 'infrastructure'} />
              <MobileNavItem title="System Status" onClick={() => navigate('status')} active={currentPage === 'status'} />
              <MobileNavItem title="Contact" onClick={() => navigate('contact')} active={currentPage === 'contact'} />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && <HomePage setPage={navigate} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'infrastructure' && <InfrastructurePage />}
        {currentPage === 'status' && <StatusPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Rocket className="h-6 w-6 text-blue-400 mr-2" />
            <span className="font-semibold text-white">NebulaDeploy</span>
          </div>
          <p>© {new Date().getFullYear()} NebulaDeploy. Powered by Jenkins & Docker.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Github className="h-6 w-6 hover:text-white cursor-pointer transition" />
            <Cloud className="h-6 w-6 hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --- Navigation Components --- */

const NavItem = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {title}
  </button>
);

const MobileNavItem = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
      active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {title}
  </button>
);

/* --- Page Components --- */

const HomePage = ({ setPage }) => (
  <div className="flex-grow flex flex-col">
    {/* Hero Section */}
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Cloud className="h-24 w-24 text-blue-400 absolute opacity-50 -top-4 -left-8 animate-pulse" />
            <Rocket className="h-20 w-20 text-white relative z-10" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Automate Your Deployments. <br className="hidden md:block"/> Scale with Confidence.
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-3xl mx-auto font-light">
          NebulaDeploy is the modern CI/CD engine that containerizes your workflow, running Jenkins, React, Node, and MySQL in perfect harmony.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => setPage('status')}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1 flex items-center justify-center"
          >
            <Activity className="mr-2 h-5 w-5" /> View Live Status
          </button>
          <button 
            onClick={() => setPage('infrastructure')}
            className="bg-transparent border-2 border-blue-400 text-blue-300 hover:bg-blue-800 hover:text-white font-bold py-3 px-8 rounded-full transition flex items-center justify-center"
          >
            Explore Infrastructure <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    {/* Quick Feature highlights */}
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-emerald-500" />}
            title="Secure Pipelines"
            desc="Automated security scanning and isolated Docker-in-Docker (DinD) build environments."
          />
          <FeatureCard 
            icon={<Server className="h-10 w-10 text-blue-500" />}
            title="Scalable Hosting"
            desc="Easily orchestrate microservices with Docker Compose for seamless horizontal scaling."
          />
          <FeatureCard 
            icon={<Database className="h-10 w-10 text-purple-500" />}
            title="Stateful Data"
            desc="Persistent volumes configured for MySQL, ensuring your application data is safe."
          />
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="py-16 px-4 bg-gray-50 flex-grow">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Our Core Services</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide end-to-end solutions for modern containerized development and deployment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceBox icon={<Code />} title="Frontend Hosting" desc="Optimized Nginx containers serving blazing fast React applications." />
        <ServiceBox icon={<Server />} title="Backend APIs" desc="Scalable Node.js & Express containers handling your core business logic." />
        <ServiceBox icon={<Database />} title="Database Mgmt" desc="Managed MySQL instances with automated health-checks and persistence." />
        <ServiceBox icon={<Rocket />} title="CI/CD Automation" desc="Automated Jenkins pipelines that build, test, and push to DockerHub." />
      </div>
    </div>
  </div>
);

const InfrastructurePage = () => (
  <div className="py-16 px-4 bg-white flex-grow">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">Under the Hood</h2>
      
      <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          This project runs an entirely containerized architecture. We utilize Docker Compose to map networks and volumes dynamically, allowing Jenkins to build fresh images via a mounted Docker socket.
        </p>

        <div className="space-y-6">
          <InfraRow title="React Frontend (Port 3000)" tech="Nginx + Alpine" />
          <InfraRow title="Node.js Backend (Port 5000)" tech="Express + MySQL2" />
          <InfraRow title="MySQL Database (Port 3306)" tech="MySQL 8.0 + Volume Mounts" />
          <InfraRow title="Jenkins Server (Port 8080)" tech="Jenkins LTS + DinD" />
        </div>
      </div>
    </div>
  </div>
);

const StatusPage = () => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Attempt to fetch from the local Node.js backend
    fetch('http://localhost:5000/api/status')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setStatusData(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Backend not reachable. Loading mock data for preview.", err);
        // Fallback for UI preview when backend container isn't running
        setTimeout(() => {
          setStatusData([
            { id: 1, service_name: 'Frontend UI Engine', status: 'Operational', last_updated: new Date().toISOString() },
            { id: 2, service_name: 'Backend API Service', status: 'Simulated (Backend Down)', last_updated: new Date().toISOString() },
            { id: 3, service_name: 'MySQL Database', status: 'Simulated (DB Down)', last_updated: new Date().toISOString() },
            { id: 4, service_name: 'Jenkins CI/CD Pipeline', status: 'Operational', last_updated: new Date().toISOString() }
          ]);
          setLoading(false);
          setError("Viewing in Mock Mode. Start backend containers to see live DB data.");
        }, 1000);
      });
  }, []);

  return (
    <div className="py-16 px-4 bg-slate-50 flex-grow">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center">
            <Activity className="mr-3 h-8 w-8 text-blue-500" /> System Status
          </h2>
          {loading ? (
            <span className="flex items-center text-sm font-medium text-gray-500">
              <span className="animate-spin mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></span>
              Polling...
            </span>
          ) : (
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              <CheckCircle className="mr-1 h-4 w-4" /> Live
            </span>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Last Checked</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && statusData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">Connecting to database...</td>
                </tr>
              ) : (
                statusData.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{service.service_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status.includes('Operational') || service.status.includes('Healthy') 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(service.last_updated).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Message sent! Our deployment engineers will be in touch.');
    e.target.reset();
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <div className="py-16 px-4 bg-white flex-grow">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">Contact DevOps Team</h2>
        
        <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="John Doe" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="john@company.com" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea required rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="How can we help optimize your pipeline?"></textarea>
          </div>
          
          {formStatus && (
            <div className="mb-6 p-3 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
              {formStatus}
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

/* --- Small Helpers --- */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition duration-300">
    <div className="flex justify-center mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const ServiceBox = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-default">
    <div className="text-blue-500 mb-4 h-8 w-8">{icon}</div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const InfraRow = ({ title, tech }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
    <span className="font-semibold text-gray-800 mb-2 sm:mb-0">{title}</span>
    <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-mono">{tech}</span>
  </div>
);