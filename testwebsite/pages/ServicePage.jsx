import React from 'react';
import Card from '../components/common/Card';

const services = [
  {
    title: "Career Development Center",
    description: "We provide comprehensive career counseling, resume workshops, interview preparation, and connect students with top employers for internships and full-time positions.",
    imageUrl: "https://picsum.photos/400/300?random=10"
  },
  {
    title: "Academic Advising",
    description: "Our dedicated advisors help students plan their academic journey, select courses, and ensure they meet all graduation requirements to achieve their educational goals.",
    imageUrl: "https://picsum.photos/400/300?random=11"
  },
  {
    title: "Library & Research Hub",
    description: "Access a vast collection of digital and print resources, quiet study spaces, and get research assistance from our expert librarians to excel in your studies.",
    imageUrl: "https://picsum.photos/400/300?random=12"
  },
  {
    title: "Student Health & Wellness",
    description: "We offer medical services, mental health counseling, and wellness programs to support the physical and emotional well-being of our students.",
    imageUrl: "https://picsum.photos/400/300?random=13"
  },
  {
    title: "Technology & IT Support",
    description: "Get assistance with campus Wi-Fi, software access, and technical issues from our IT Help Desk, ensuring you stay connected and productive.",
    imageUrl: "https://picsum.photos/400/300?random=14"
  },
  {
    title: "Disability Support Services",
    description: "We are committed to providing equal access and reasonable accommodations for students with disabilities to ensure an inclusive learning environment.",
    imageUrl: "https://picsum.photos/400/300?random=15"
  }
];

const ServicePage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Student Services</h1>
          <p className="text-lg text-slate-300 mt-4">Supporting Your Success Every Step of the Way</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;