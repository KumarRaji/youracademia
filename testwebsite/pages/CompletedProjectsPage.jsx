import React from 'react';
import Card from '../components/common/Card';

const completedProjects = [
  {
    title: "Campus-Wide Wi-Fi 6 Upgrade",
    description: "Successfully upgraded the entire campus network to Wi-Fi 6, providing faster, more reliable internet access for all students, faculty, and staff.",
    year: "2023",
  },
  {
    title: "New Science & Engineering Complex",
    description: "Completed the construction of a 100,000 sq. ft. state-of-the-art facility featuring advanced labs, collaborative workspaces, and modern classrooms.",
    year: "2022",
  },
  {
    title: "Annual Charity Marathon 2023",
    description: "Organized a successful campus-wide marathon that raised over $50,000 for local children's hospitals and engaged more than 2,000 participants.",
    year: "2023",
  },
  {
    title: "Alumni Mentorship Platform Launch",
    description: "Launched a new online platform connecting current students with alumni for mentorship, career advice, and networking opportunities.",
    year: "2021",
  }
];

const CompletedProjectsPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Completed Projects</h1>
          <p className="text-lg text-slate-300 mt-4">A Showcase of Our Accomplishments</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project, index) => (
              <Card 
                key={index}
                title={project.title}
                description={project.description}
              >
                <div className="flex justify-start items-center">
                  <span className="text-white text-xs font-semibold px-3 py-1 rounded-full bg-gray-500">
                    Completed: {project.year}
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

export default CompletedProjectsPage;