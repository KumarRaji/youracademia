import React from 'react';
import Card from '../components/common/Card';

const liveProjects = [
  {
    title: "AI-Powered Campus Assistant Chatbot",
    description: "Developing a chatbot to assist students with campus navigation, course registration, and general inquiries. Currently in the user testing phase.",
    status: "In Progress",
    statusColor: "bg-blue-500",
  },
  {
    title: "Sustainable Campus Initiative",
    description: "A multi-phase project to reduce the campus's carbon footprint through renewable energy adoption, waste reduction programs, and green building certifications.",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    title: "Digital Archive of College History",
    description: "Digitizing and cataloging historical documents, photographs, and artifacts to create a publicly accessible online archive. Data collection is ongoing.",
    status: "In Progress",
    statusColor: "bg-blue-500",
  },
  {
    title: "Community Tutoring Program",
    description: "An outreach program where college students provide free tutoring to local K-12 students. Currently recruiting tutors for the upcoming semester.",
    status: "Planning Phase",
    statusColor: "bg-yellow-500",
  }
];

const LiveProjectsPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Live Projects</h1>
          <p className="text-lg text-slate-300 mt-4">Witness Innovation in Action</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveProjects.map((project, index) => (
              <Card 
                key={index}
                title={project.title}
                description={project.description}
              >
                <div className="flex justify-start items-center">
                  <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveProjectsPage;