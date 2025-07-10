import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetallJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetallJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-10">
        <section className="mb-8 mt-4">
          <HeroSection />
        </section>
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4B2996] text-center mb-4 drop-shadow-lg tracking-tight">Browse by Category</h2>
          <CategoryCarousel />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F83002] text-center mb-4 drop-shadow-lg tracking-tight">Latest Jobs</h2>
          <LatestJobs />
        </section>
      </main>
      <Footer />
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none fixed top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#6A38C2]/30 to-[#F83002]/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-[#F83002]/30 to-[#6A38C2]/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
    </div>
  );
}

export default Home