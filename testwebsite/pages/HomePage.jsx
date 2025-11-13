import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const controller = new AbortController();


    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:3001/api/features", {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load features");
      } finally {
        setLoading(false);
      }
    }


    load();
    return () => controller.abort();
  }, []);

  const slides = [
    {
      image: "https://picsum.photos/1600/900?random=1",
      title: "Empowering Minds, Shaping Futures",
      text: "Join a vibrant community of scholars and leaders at MyAcademia, where we nurture talent and inspire innovation."
    },
    {
      image: "https://picsum.photos/1600/900?random=2",
      title: "Excellence in Education",
      text: "Discover world-class programs and cutting-edge research opportunities that prepare you for tomorrow's challenges."
    },
    {
      image: "https://picsum.photos/1600/900?random=3",
      title: "Innovation & Research",
      text: "Be part of groundbreaking research and innovative solutions that make a real impact on the world."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{slide.title}</h1>
              <p className="text-lg md:text-xl max-w-3xl mb-8">{slide.text}</p>
              <Link to="/about" className="bg-sky-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-sky-600 transition-all duration-300 text-lg transform hover:scale-105">
                Discover More
              </Link>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Choose MyAcademia?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">We provide a world-class education with a focus on practical skills and holistic development.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card title="Expert Faculty" description="Learn from renowned professors and industry experts who are passionate about teaching and research." imageUrl="https://picsum.photos/400/300?random=2" />
            <Card title="State-of-the-Art Campus" description="Experience our modern facilities, advanced labs, and a sprawling green campus designed for learning." imageUrl="https://picsum.photos/400/300?random=3" />
            <Card title="Global Opportunities" description="Participate in international exchange programs, research collaborations, and global internships." imageUrl="https://picsum.photos/400/300?random=4" />
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
            Featured Programs
          </h2>


          {loading && (
            <div className="text-center text-slate-500">Loading features…</div>
          )}


          {error && (
            <div className="max-w-xl mx-auto mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}


          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.length === 0 ? (
                <div className="col-span-full text-center text-slate-500">No features found.</div>
              ) : (
                items.map((f) => (
                  <article
                    key={f.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <h3 className="font-bold text-xl text-sky-600 mb-2">{f.heading}</h3>
                    <p className="text-slate-600">{f.description}</p>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;