import React from 'react';
import Card from '../components/common/Card';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">About MyAcademia</h1>
          <p className="text-lg text-slate-300 mt-4">A Legacy of Excellence and a Vision for the Future</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                To cultivate an inclusive and dynamic learning environment that empowers students to think critically, communicate effectively, and engage with the world as responsible global citizens. We are committed to fostering intellectual curiosity, creativity, and a lifelong passion for learning.
              </p>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be a globally recognized leader in higher education, renowned for our innovative research, transformative teaching, and profound impact on society. We aspire to create a sustainable and equitable future through knowledge and leadership.
              </p>
            </div>
            <div>
              <img src="https://picsum.photos/600/400?random=5" alt="Campus building" className="rounded-lg shadow-2xl"/>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <img src="https://picsum.photos/200/200?random=6" alt="Dr. Evelyn Reed" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"/>
              <h3 className="text-xl font-bold text-slate-800">Dr. Evelyn Reed</h3>
              <p className="text-sky-600">President</p>
            </div>
            <div className="text-center">
              <img src="https://picsum.photos/200/200?random=7" alt="Prof. Samuel Chen" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"/>
              <h3 className="text-xl font-bold text-slate-800">Prof. Samuel Chen</h3>
              <p className="text-sky-600">Provost & VP, Academic Affairs</p>
            </div>
            <div className="text-center">
              <img src="https://picsum.photos/200/200?random=8" alt="Ms. Maria Rodriguez" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"/>
              <h3 className="text-xl font-bold text-slate-800">Ms. Maria Rodriguez</h3>
              <p className="text-sky-600">Dean of Students</p>
            </div>
             <div className="text-center">
              <img src="https://picsum.photos/200/200?random=9" alt="Mr. David Grant" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"/>
              <h3 className="text-xl font-bold text-slate-800">Mr. David Grant</h3>
              <p className="text-sky-600">Chief Financial Officer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;