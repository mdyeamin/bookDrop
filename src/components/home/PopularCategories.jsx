import Link from "next/link";
import React from "react";
import { 
  FiBookOpen, 
  FiCpu, 
  FiBriefcase, 
  FiSearch, 
  FiHeart,
  FiTrendingUp,
  FiArrowRight,
  FiStar,
  FiClock,
  FiUser,
  FiSun,
  FiSmile,
  FiFeather
} from "react-icons/fi";

const PopularCategories = () => {
  
  const categories = [
    {
      id: 1,
      name: "Fiction",
      count: "1,240+",
      icon: <FiBookOpen size={24} />,
      iconBg: "bg-blue-50 group-hover:bg-blue-500",
      iconColor: "text-blue-600 group-hover:text-white",
    },
    {
      id: 2,
      name: "Sci-Fi",
      count: "850+",
      icon: <FiCpu size={24} />,
      iconBg: "bg-purple-50 group-hover:bg-purple-500",
      iconColor: "text-purple-600 group-hover:text-white",
    },
    {
      id: 3,
      name: "Fantasy",
      count: "1,050+",
      icon: <FiStar size={24} />,
      iconBg: "bg-indigo-50 group-hover:bg-indigo-500",
      iconColor: "text-indigo-600 group-hover:text-white",
    },
    {
      id: 4,
      name: "Mystery & Thriller",
      count: "940+",
      icon: <FiSearch size={24} />,
      iconBg: "bg-orange-50 group-hover:bg-orange-500",
      iconColor: "text-orange-600 group-hover:text-white",
    },
    {
      id: 5,
      name: "Romance",
      count: "1,120+",
      icon: <FiHeart size={24} />,
      iconBg: "bg-rose-50 group-hover:bg-rose-500",
      iconColor: "text-rose-600 group-hover:text-white",
    },
    {
      id: 6,
      name: "Academic",
      count: "3,120+",
      icon: <FiBriefcase size={24} />,
      iconBg: "bg-emerald-50 group-hover:bg-emerald-500",
      iconColor: "text-emerald-600 group-hover:text-white",
    },
    {
      id: 7,
      name: "History",
      count: "730+",
      icon: <FiClock size={24} />,
      iconBg: "bg-amber-50 group-hover:bg-amber-500",
      iconColor: "text-amber-600 group-hover:text-white",
    },
    {
      id: 8,
      name: "Biography",
      count: "620+",
      icon: <FiUser size={24} />,
      iconBg: "bg-cyan-50 group-hover:bg-cyan-500",
      iconColor: "text-cyan-600 group-hover:text-white",
    },
    {
      id: 9,
      name: "Self-Help",
      count: "1,530+",
      icon: <FiSun size={24} />,
      iconBg: "bg-yellow-50 group-hover:bg-yellow-500",
      iconColor: "text-yellow-600 group-hover:text-white",
    },
    {
      id: 10,
      name: "Business & Economics",
      count: "620+",
      icon: <FiTrendingUp size={24} />,
      iconBg: "bg-teal-50 group-hover:bg-teal-500",
      iconColor: "text-teal-600 group-hover:text-white",
    },
    {
      id: 11,
      name: "Children's Books",
      count: "890+",
      icon: <FiSmile size={24} />,
      iconBg: "bg-pink-50 group-hover:bg-pink-500",
      iconColor: "text-pink-600 group-hover:text-white",
    },
    {
      id: 12,
      name: "Poetry",
      count: "410+",
      icon: <FiFeather size={24} />,
      iconBg: "bg-fuchsia-50 group-hover:bg-fuchsia-500",
      iconColor: "text-fuchsia-600 group-hover:text-white",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#FA5D39] font-extrabold tracking-widest uppercase text-[11px] mb-3 block">
              Discover
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-4 tracking-tight">
              Popular Categories
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Explore our vast collection of books spanning across various genres. Find exactly what you're looking for.
            </p>
          </div>
          
          <Link 
            href="/browse-books" 
            className="group flex items-center gap-2 text-[#0A2540] font-bold text-sm hover:text-[#FA5D39] transition-colors whitespace-nowrap"
          >
            View All Categories
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid - Adjusted to 4 columns on extra large screens for 12 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
            href={''}
            //   href={`/browse?category=${encodeURIComponent(category.name)}`}
              key={category.id}
              className="group bg-white border border-slate-200 rounded-3xl p-6 flex items-start gap-5 hover:border-[#0A2540] hover:shadow-[0_10px_30px_rgb(10,37,64,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Dynamic Icon Container */}
              <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors duration-300 ${category.iconBg} ${category.iconColor}`}>
                {category.icon}
              </div>

              {/* Text Content */}
              <div className="flex-1 mt-1">
                <h3 className="text-lg font-bold text-[#0A2540] mb-1 group-hover:text-[#FA5D39] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400">
                  {category.count} Books
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className="mt-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#0A2540]">
                <FiArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PopularCategories;