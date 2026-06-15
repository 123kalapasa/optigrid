import React from "react";
import * as Icons from "lucide-react";
import { ServiceItem } from "../types";

interface ServiceCardProps {
  service: ServiceItem;
  key?: string;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Map icon name safely to Lucide icons
  const IconComponent = (Icons as any)[service.iconName] || Icons.Code2;

  return (
    <div className="relative group overflow-hidden rounded-none bg-gradient-to-b from-[#111111]/90 to-[#070707]/95 border border-white/5 p-8 transition-all duration-500 hover:border-accent/40 hover:scale-[1.02] hover:shadow-[0_15px_45px_rgba(0,255,209,0.08)] flex flex-col justify-between h-full backdrop-blur-md">
      
      {/* Premium Glow effect behind card on hover */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-[65px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Structural visual grid accents - premium fine lines */}
      <div className="absolute top-0 left-0 w-3 h-[1px] bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-[1px] h-3 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-3 h-[1px] bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-[1px] h-3 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tiny structural layout label */}
      <div className="absolute top-4 right-6 font-mono text-[8px] text-white/10 tracking-widest font-bold group-hover:text-accent/20 transition-colors">
        SPEC_LAYER_v{service.id === "opti-web" ? "1.09" : service.id === "edge-ai" ? "3.24" : "5.02"}
      </div>

      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/5 text-accent group-hover:text-brand-black group-hover:bg-accent border border-white/10 group-hover:border-accent transition-all duration-300 rounded-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <IconComponent className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors duration-300 uppercase tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/65 text-xs leading-relaxed mb-8 font-sans">
          {service.shortDesc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {service.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[9px] font-mono px-2.5 py-1 bg-white/5 text-white/40 border border-white/5 rounded-none group-hover:border-accent/15 group-hover:text-accent transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

