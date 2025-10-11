"use client";

import React, { useState } from "react";
import domainStats from "../domain-overview/data/domainStats.json"; // ✅ direct import
import { Tooltip, TooltipTrigger as RadixTooltipTrigger, TooltipContent, TooltipProvider } from "../../../components/ui/tooltip";
import { Info } from "lucide-react";
/**
 * Complete DomainStatsBar using Radix UI Tooltip component for all tooltips.
 */
export default function DomainRequiredData() {
  const [data] = useState<any>(domainStats); // no fetch, use imported JSON directly

  return (
    <TooltipProvider>
      <section className="w-full px-4 py-3">
        <ul className="flex flex-wrap bg-white shadow-sm rounded-lg overflow-hidden">
          {data?.stats.map((item: any, idx: number) => (
            <li key={idx} className="flex-1 mb-4 min-w-[200px] border-b border-gray-300 sm:border-b-0 sm:border-r last:border-r-0">
              <CardShell>
                <HeadingWithTooltip heading={item.heading} tooltipText={item.tooltip} />

                {item.type === "authorityScore" && (
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-3">
                        {/* Circle */}
                        <ScoreCircle score={item.score} tooltipText={`Domain score: ${item.score}`} />

                        {/* Semrush Rank */}
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            Semrush Domain Rank 
                            <TooltipTrigger label={`${item.rank} ↑`} tooltipText={item.rankTooltip} />
                        </div>
                    </div>

                  </div>
                )}

                {item.type === "organicTraffic" && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <TooltipTrigger label={item.traffic} tooltipText={item.trafficTooltip} />
                      <a className="text-sm underline" href={item.viewDetails}>View details</a>
                    </div>
                    <TooltipTrigger label={item.keywords} tooltipText={item.keywordsTooltip} />
                  </div>
                )}

                {item.type === "paidTraffic" && (
                  <div className="flex flex-col gap-2">
                    <TooltipTrigger label={item.traffic} tooltipText={item.trafficTooltip} />
                    <TooltipTrigger label={item.keywords} tooltipText={item.keywordsTooltip} />
                  </div>
                )}

                {item.type === "backlinks" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold">{item.backlinks}</div>
                    <TooltipTrigger label={`Referring Domains ${item.refDomains}`} tooltipText={item.refTooltip} />
                  </div>
                )}

                {item.type === "trafficShare" && (
                  <div className="flex gap-4 items-center">
                    <div className="flex-shrink-0 w-32 h-32 relative">
                        <Tooltip>
                            <RadixTooltipTrigger asChild>
                            <div className="w-full h-full cursor-pointer">
                                <MiniDonutTooltip competitors={item.competitors}/>
                            </div>
                            </RadixTooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs p-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm font-medium mb-1">
                                    <span>Domains</span>
                                    <span>Traffic</span>
                                </div>
                                <div className="space-y-1">
                                {item.competitors.map((c: any, i: number) => (
                                    <div key={c.domain} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${donutColor(i)}`} />
                                            <span className="mr-1 text-[12px]">{c.domain}</span>
                                        </div>
                                        <div className="ml-1 text-[11px]">{`${c.pct} ${c.visits}`}</div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="mt-2">
                        <TooltipTrigger label={`Competitors ${item.totalCompetitors}`} tooltipText={`Total competitor traffic ${item.totalCompetitors}`} />
                    </div>
                  </div>
                )}
              </CardShell>
            </li>
          ))}
        </ul>
      </section>
    </TooltipProvider>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return <div className="p-4 h-full flex flex-col justify-between min-h-[130px]">{children}</div>;
}

function HeadingWithTooltip({ heading, tooltipText }: { heading: string; tooltipText: string }) {
  return (
    <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">{heading}</div>
        <TooltipTrigger tooltipText={tooltipText} small>
            <Info className="w-4 h-4 text-gray-700 cursor-pointer" />
        </TooltipTrigger>
    </div>
  );
}

function TooltipTrigger({ label, tooltipText, small, children }: { label?: string; tooltipText: string; small?: boolean; children?: React.ReactNode }) {
  return (
    <Tooltip>
      <RadixTooltipTrigger asChild>
        {children ? (
          <>{children}</>
        ) : (
          <span className={`${small ? "text-xs px-1 py-0.5" : "px-2 py-0.5 text-sm"} cursor-default bg-gray-100 rounded`}>
            {label}
          </span>
        )}
      </RadixTooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}

function ScoreCircle({ score, tooltipText }: { score: number; tooltipText: string }) {
  const color = scoreToColor(score);
  return (
    <TooltipTrigger tooltipText={tooltipText}>
      <div
        className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-white text-lg font-semibold`}
      >
        {score}
      </div>
    </TooltipTrigger>
  );
}

function scoreToColor(score: number) {
  if (score <= 20) return "bg-red-500";
  if (score <= 40) return "bg-yellow-400";
  if (score <= 60) return "bg-orange-400";
  if (score <= 80) return "bg-lime-300";
  if (score <= 90) return "bg-green-400";
  return "bg-green-700";
}

function MiniDonutTooltip({ competitors }: { competitors: { domain: string; pct: string; visits: string }[] }) {
  const nums = competitors.map((c) => parseFloat(c.pct));
  const total = nums.reduce((a, b) => a + b, 0) || 100;
  let acc = 0;
  const colors = ["#6366F1", "#F43F5E", "#F59E0B", "#0EA5E9", "#10B981"];

  return (
    <svg viewBox="0 0 36 36" className="w-full h-full">
      {nums.map((n, i) => {
        const dash = (n / total) * 100;
        const circleProps = {
          strokeWidth: 8,
          strokeDasharray: `${dash} ${100 - dash}`,
          strokeDashoffset: `${25 - (acc / total) * 100}`,
          strokeLinecap: "butt",
        } as any;
        acc += n;
        return <circle key={i} r={15.915} cx={18} cy={18} fill="transparent" strokeWidth={8} stroke={colors[i % colors.length]} strokeDasharray={circleProps.strokeDasharray} strokeDashoffset={circleProps.strokeDashoffset} />;
      })}
      <circle r={8} cx={18} cy={18} fill="#fff" />
    </svg>
  );
}

function donutColor(i: number) {
  const colors = ["bg-indigo-500", "bg-rose-500", "bg-amber-400", "bg-sky-500", "bg-emerald-400"];
  return colors[i % colors.length];
}
