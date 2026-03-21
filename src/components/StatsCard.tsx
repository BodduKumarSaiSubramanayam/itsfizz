"use client";

import React from "react";

interface StatsCardProps {
  percentage: string;
  description: string;
  bgColor?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  percentage,
  description,
  bgColor = "bg-white",
  className = ""
}) => {
  return (
    <div className={`stats-card p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between transition-all duration-700 hover:scale-110 hover:-translate-y-6 group cursor-pointer border border-white/20 backdrop-blur-md ${bgColor} ${className} relative overflow-hidden`}>
      {/* Decorative shimmer effect */}
      <div className="absolute -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite]"></div>
      
      <div className="space-y-3 relative z-10">
        <h3 className="text-8xl font-display font-black tracking-tighter italic leading-none group-hover:scale-110 transition-transform duration-700 origin-left">
          {percentage}
        </h3>
        <p className="text-[12px] font-black leading-tight uppercase tracking-[0.2em] opacity-90 whitespace-pre-line max-w-[180px]">
          {description}
        </p>
      </div>

      {/* Decorative pulse point */}
      <div className="mt-8 flex items-center justify-between">
        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30 animate-pulse"></div>
        <div className="h-[1px] flex-1 mx-4 bg-current opacity-10"></div>
        <div className="w-8 h-[2px] bg-current opacity-20"></div>
      </div>
    </div>
  );
};

export default StatsCard;
