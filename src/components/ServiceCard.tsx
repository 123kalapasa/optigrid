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
    <div className="relative group overflow-hidden rounded-none bg-[#0e0e0e]/95 border border-white/10 p-8 transition-all duration-300 hover:border-accent hover:bg-black hover:shadow-[0_0_25px_rgba(0,255,209,0.1)] flex flex-col justify-between h-full">
      {/* Structural visual grid accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/5 text-accent group-hover:text-accent group-hover:bg-accent/10 border border-white/10 group-hover:border-accent/30 transition-all duration-300 rounded-none">
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-lg text-white group-hover:text-accent transition-colors duration-300 uppercase tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/70 text-xs leading-relaxed mb-6 font-sans">
          {service.longDesc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {service.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-2.5 py-1 bg-white/5 text-white/60 border border-white/5 group-hover:border-accent/20 group-hover:text-accent transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

